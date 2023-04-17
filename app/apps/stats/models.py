from jija_orm import models, fields


class Stats(models.Model):
    user = fields.ForeignKey(relation_to='core.User', on_delete=fields.OnDelete.CASCADE)
    stat = fields.IntegerField()
