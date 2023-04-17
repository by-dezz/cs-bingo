# Created by jija-orm at 2023-04-23 14:41:39
from jija_orm.migrator import templates


class Migration(templates.Migration):
    id = 1682260899328511
    commands = (
        templates.ModelMigration(
            name="user",
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
                    name="username",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=False),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="varchar(64)"),
                    ]
                ),
                templates.FieldMigration(
                    name="password",
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
