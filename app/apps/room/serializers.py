from jija import serializers
from jija.serializers import fields


class Room(serializers.Serializer):
    uuid = fields.CharField()


class Weapon(serializers.Serializer):
    name = fields.CharField()
    uuid = fields.CharField()
    status = fields.IntegerField()
