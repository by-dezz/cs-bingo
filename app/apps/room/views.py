import asyncio
import json
from typing import Union

from jija import views, response
import uuid

from jija_orm import config
from . import serializers
from . import events


class Room(views.SerializedView, views.DocMixin):
    async def get(self, room_serializer: serializers.Room):
        from . import models

        room = await models.Room.where(uuid=room_serializer.data['uuid'])
        if not room:
            return response.Response(status=404)
        room = room[0]

        room_data = await models.UserRoomData.where(room=room, user=self.request.user)
        if not room_data:
            await models.UserRoomData.insert(room=room, user=self.request.user, checked='')
            for socket in RoomWS.ROOMS_SOCKETS[room_serializer.data['uuid']]:
                await socket.send({
                    'type': 'join',
                    'data': {
                        'id': self.request.user.id,
                        'name': self.request.user.username
                    }
                })

        rooms_data = await (await config.JijaORM.get_connection()).fetch(f'''
            SELECT user_id, username, checked
            FROM room join userroomdata on room.id = userroomdata.room_id join "user" on userroomdata.user_id = "user".id
            where room.uuid = '{room_serializer.data['uuid']}'
        ''')

        weapons_data = {}
        users = []
        stats = {}
        for item in rooms_data:
            users.append({
                'id': item['user_id'],
                'name': item['username'],
            })

            checked = item['checked'].split(',') if item['checked'] else []
            stats[item['user_id']] = len(checked)

            for weapon in checked:
                if not weapons_data.get(weapon):
                    weapons_data[weapon] = []

                weapons_data[weapon].append(item['user_id'])

        return response.JsonResponse({
            'weapons': weapons_data,
            'users': users,
            'stats': stats,
        })

    async def post(self):
        from . import models
        room = await models.Room.insert(uuid=uuid.uuid4().hex)
        await models.UserRoomData.insert(room=room, user=self.request.user, checked='')
        return response.JsonResponse({'room': room.uuid})

    async def patch(self, weapon: serializers.Weapon):
        from . import models
        room = await models.Room.where(uuid=weapon.data['uuid'])

        if not room:
            return response.Response(status=404)
        else:
            room = room[0]

        room_data = await models.UserRoomData.where(room=room, user=self.request.user)

        if not room_data:
            return response.Response(status=404)
        else:
            room_data = room_data[0]

        weapons = set(room_data.checked.split(',')) if room_data.checked else set()
        if weapon.data['status']:
            if weapon.data['name'] in weapons:
                return response.Response(status=400)
            weapons.add(weapon.data['name'])
        else:
            if weapon.data['name'] not in weapons:
                return response.Response(status=400)
            weapons.remove(weapon.data['name'])

        room_data.checked = ','.join(weapons)
        await room_data.save()

        return response.Response()


class RoomsList(views.View, views.DocMixin):
    async def get(self):
        rooms = await (await config.JijaORM.get_connection()).fetch(f'''
            SELECT uuid
            FROM room join userroomdata on room.id = userroomdata.room_id
            where userroomdata.user_id = {self.request.user.id}
                and room.active = true
        ''')

        return response.JsonResponse({'rooms': list(item['uuid'] for item in rooms)})


class RoomWS(views.WSView):
    ROOMS_SOCKETS = {}

    async def process(self):
        room_socket = self.get_room_socket()
        if not room_socket:
            self.ROOMS_SOCKETS[self.request.match_info['uuid']] = []
            room_socket = self.get_room_socket()

        room_socket.append(self)
        await super().process()

        room_socket.remove(self)
        if not room_socket:
            self.ROOMS_SOCKETS.pop(self.request.match_info['uuid'])

    async def on_message(self, message):
        message = json.loads(message)
        if message['type'] == 'check':
            await self.handle_check(message['data'])
        elif message['type'] == 'ping':
            await self.send({'type': 'pong'})

    def get_room_socket(self):
        return self.ROOMS_SOCKETS.get(self.request.match_info['uuid'])

    async def handle_check(self, weapon):
        from . import models

        room = (await models.Room.where(uuid=self.request.match_info['uuid']))[0]
        room_data = (
            await models.UserRoomData.where(room=room, user=self.request.user))[0]

        checked = room_data.checked.split(',') if room_data.checked else []
        if weapon in checked:
            status = False
            checked.remove(weapon)
        else:
            status = True
            checked.append(weapon)

        room_data.checked = ','.join(checked)
        await room_data.save()

        room_socket = self.get_room_socket()
        for socket in room_socket:
            try:
                await socket.send({
                    'type': 'check',
                    'data': {
                        'weapon': weapon,
                        'status': status,
                        'user': self.request.user.id,
                    }
                })
            except ConnectionResetError:
                room_socket.remove(socket)


class Close(views.SerializedView, views.DocMixin):
    async def post(self, room_serializer: serializers.Room):
        from . import models
        from apps.stats import models as stats_models
        room = await models.Room.where(uuid=room_serializer.data['uuid'], active=True)
        if not room:
            return response.Response(status=404)

        room = room[0]
        room.active = False
        await room.save()

        room_data = await models.UserRoomData.where(room=room)
        to_create = []
        for data in room_data:
            checked = data.checked.split(',') if data.checked else []
            to_create.append({'user': data.user, 'stat': len(checked)})

        await stats_models.Stats.multiple_create(to_create)
        return response.Response()
