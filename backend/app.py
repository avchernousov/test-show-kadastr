import json
import logging
import os

import aiohttp_cors as aiohttp_cors
from aiohttp import web
from rosreestr2coord import Area


async def get_poly(request) -> web.Response:
    print(10 * '!')
    try:
        cadastr_id = request.query['cadastr_id']
    except KeyError as e:
        return web.json_response({"error": "Incorrect parameter"})
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
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(),
    })

    ids_resource = cors.add(app.router.add_resource("/get_ids"))
    cors.add(ids_resource.add_route("GET", get_ids), {
        "*": aiohttp_cors.ResourceOptions(expose_headers="*",
                                          allow_headers="*",
                                          allow_credentials=True, ),
    })
    cadastr_info = cors.add(app.router.add_resource("/get_poly"))
    cors.add(cadastr_info.add_route("GET", get_poly), {
        "*": aiohttp_cors.ResourceOptions(expose_headers="*",
                                          allow_headers="*",
                                          allow_credentials=True, ),
    })

    logging.basicConfig()
    return app


web.run_app(init_app())
