# Created by jija-orm at 2023-04-27 20:23:44
from jija_orm.migrator import templates


class Migration(templates.Migration):
    id = 1682627024048693
    commands = (
        templates.ModelMigration(
            name="userroomdata",
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
                    name="checked",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=False),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="text"),
                    ]
                ),
                templates.FieldMigration(
                    name="user_id",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="int4"),
                    ]
                ),
                templates.ConstraintMigration(
                    name="user",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.ConstraintAttributeMigration(name="field", value="user_id"),
                        templates.ConstraintAttributeMigration(name="relation_to", value="user"),
                        templates.ConstraintAttributeMigration(name="on_delete", value="cascade"),
                    ]
                ),
                templates.FieldMigration(
                    name="room_id",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="int4"),
                    ]
                ),
                templates.ConstraintMigration(
                    name="room",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.ConstraintAttributeMigration(name="field", value="room_id"),
                        templates.ConstraintAttributeMigration(name="relation_to", value="room"),
                        templates.ConstraintAttributeMigration(name="on_delete", value="cascade"),
                    ]
                ),
            ]
        ),
    )
