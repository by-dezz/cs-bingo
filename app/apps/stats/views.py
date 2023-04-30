from jija import views, response
from jija_orm import config


class Stats(views.View, views.DocMixin):
    async def get(self):
        best = await (await config.JijaORM.get_connection()).fetch(f'''
            select max(stat)
            from stats
            where user_id = {self.request.user.id}
            group by user_id
        ''')

        return response.JsonResponse({
            'stats': best[0]['max'] if best else 0
        })
