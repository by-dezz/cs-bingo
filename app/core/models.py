from jija_orm import models, fields


class User(models.Model):
    username = fields.CharField(max_length=64)
    password = fields.TextField()
