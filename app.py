import json

from aiohttp import web
from rosreestr2coord import Area


async def get_poly(request) -> web.Response:
    cadastr_id = request.query['cadastr_id']
    area = Area(cadastr_id)

    data = area.to_geojson_poly()
    geo_json = {
        "type": "FeatureCollection",
        "features": [json.loads(data)]
    }

    return web.json_response(geo_json)


async def init_app() -> web.Application:
    app = web.Application()
    app.router.add_route('GET', '/get_poly', get_poly)
    return app


web.run_app(init_app())
