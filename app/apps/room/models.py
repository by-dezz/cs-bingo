from jija_orm import models, fields

class Room(models.Model):
    uuid = fields.TextField()
    active = fields.BooleanField(default=True)


class UserRoomData(models.Model):
    user = fields.ForeignKey(relation_to='core.User', on_delete=fields.OnDelete.CASCADE)
    room = fields.ForeignKey(relation_to=Room, on_delete=fields.OnDelete.CASCADE)

    checked = fields.TextField()
