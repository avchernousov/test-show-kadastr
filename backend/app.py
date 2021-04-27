import json
import os

from aiohttp import web, ClientResponseError
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


async def get_ids(request) -> web.Response:
    with open(f"{os.path.dirname(__file__)}/cadastr_ids.txt", 'r') as file:
        file = file.read()
    ids = file.split(', ')
    return web.json_response({"ids": ids})


async def init_app() -> web.Application:
    app = web.Application()
    app.router.add_route('GET', '/get_poly', get_poly)
    app.router.add_route('GET', '/get_ids', get_ids)
    return app


web.run_app(init_app())
