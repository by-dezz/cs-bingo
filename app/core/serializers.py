from jija import serializers
from jija.serializers import fields
from jija import exceptions, response


class Login(serializers.Serializer):
    username = fields.CharField(min_length=3, max_length=20)
    password = fields.CharField(min_length=3, max_length=20)


class Register(serializers.Serializer):
    username = fields.CharField(min_length=3, max_length=20)
    password = fields.CharField(min_length=3, max_length=20)
    confirm_password = fields.CharField(min_length=3, max_length=20)

    async def clean(self):
        if self.data['password'] != self.data['confirm_password']:
            raise serializers.ValidationError('confirm_password', 'Passwords do not match')

        from . import models
        if await models.User.select('id').where(username=self.data['username']):
            raise serializers.ValidationError('username', 'Username already exists')
