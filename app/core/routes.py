from jija import router
from .views import *


routes = [
    router.Endpoint('/login/', Login),
    router.Endpoint('/logout/', Logout),
    router.Endpoint('/register/', Register),
]