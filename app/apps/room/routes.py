from jija import router
from .views import *


routes = [
    router.Endpoint('/', Room),
    router.Endpoint('/list/', RoomsList),
    router.Endpoint('/ws/{uuid}/', RoomWS),
    router.Endpoint('/close/', Close),
]