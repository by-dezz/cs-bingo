# Created by jija-orm at 2023-04-27 20:23:44
from jija_orm.migrator import templates


class Migration(templates.Migration):
    id = 1682627024044706
    commands = (
        templates.ModelMigration(
            name="stats",
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
                    name="stat",
                    action=templates.Action.CREATE,
                    childes=[
                        templates.AttributeMigration(name="pk", value=False),
                        templates.AttributeMigration(name="null", value=False),
                        templates.AttributeMigration(name="type", value="int4"),
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
            ]
        ),
    )
