from jija import views, response
from . import serializers


class Login(views.SerializedView, views.DocMixin):
    async def get(self):
        return response.JsonResponse({
            'id': self.request.user.id,
            'name': self.request.user.username,
        })

    async def post(self, data: serializers.Login):
        from . import models
        user = await models.User.select().where(username=data.data['username'], password=data.data['password'])

        if user:
            user = user[0]
            self.request.session['user_id'] = user.id
            return response.JsonResponse({
                'id': user.id,
                'name': user.username
            })

        return response.Response(status=400)


class Logout(views.View, views.DocMixin):
    async def post(self):
        self.request.session.pop('user_id', None)
        return response.Response()


class Register(views.SerializedView, views.DocMixin):
    async def post(self, data: serializers.Register):
        from . import models
        user = await models.User.insert(username=data.data['username'], password=data.data['password'])
        self.request.session['user_id'] = user.id

        return response.JsonResponse({
            'id': user.id,
            'name': user.username
        })
