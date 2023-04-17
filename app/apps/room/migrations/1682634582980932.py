# Created by jija-orm at 2023-04-27 22:29:42
from jija_orm.migrator import templates


class Migration(templates.Migration):
    id = 1682634582980932
    commands = (
        templates.ModelMigration(
            name="room",
            action=templates.Action.ALTER,
            childes=[
                templates.FieldMigration(
                    name="active",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=False),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="bool"),
                        templates.AttributeMigration(name="default", value=True),
                    ]
                ),
            ]
        ),
    )
