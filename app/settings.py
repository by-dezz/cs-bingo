import os
from pathlib import Path

from jija import config
from jija.contrib.auth import config as auth_config
from jija.contrib.swagger.driver import SwaggerDriver
from jija.contrib.jija_orm.driver import JijaOrmDriver



config.StructureConfig(
    project_path=Path(__file__).parent
)


config.NetworkConfig(
    port=80
)


auth_config.AuthConfig(
    secret_key=os.getenv('SECRET_KEY').encode('UTF-8')
)


config.DriversConfig(
    docs=SwaggerDriver('/api/docs/'),
    database=JijaOrmDriver(
        host='db',
        password=os.getenv('PG_PASS'),
        database='cs_bingo'
    )
)