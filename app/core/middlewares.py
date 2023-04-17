import aiohttp_session
from aiohttp import web
from jija import middleware
from jija import response

from . import models

class Session(middleware.Middleware):
    async def handler(self, request: web.Request, handler):

        http_session = await aiohttp_session.get_session(request)
        request.session = http_session

        if self.need_check(request):
            user = await self.get_user(request)
            if not user:
                return response.JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)

            request.user = user

        return await handler(request)

    async def get_user(self, request):
        user = await models.User.select().where(id=request.session.get('user_id'))
        if user:
            return user[0]

    def need_check(self, request):
        return not (
                request.url.path.count('/api/docs/') >= 1 or
                request.url.path == '/api/register/' or
                (request.url.path == '/api/login/' and request.method != 'GET')
        )
