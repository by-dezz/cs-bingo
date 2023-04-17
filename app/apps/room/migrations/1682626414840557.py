# Created by jija-orm at 2023-04-27 20:13:34
from jija_orm.migrator import templates


class Migration(templates.Migration):
    id = 1682626414840557
    commands = (
        templates.ModelMigration(
            name="room",
            action=templates.Action.CREATE,
            childes=[
                templates.FieldMigration(
                    name="id",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=True),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="int4"),
                    ]
                ),
                templates.FieldMigration(
                    name="uuid",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=False),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="text"),
                    ]
                ),
            ]
        ),
    )
