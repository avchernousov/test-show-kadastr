import json
import logging
import os

import aiohttp_cors as aiohttp_cors
from aiohttp import web
from rosreestr2coord import Area


def get_poly(request) -> web.Response:
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


def get_ids(request) -> web.Response:
    with open(f"{os.path.dirname(__file__)}/cadastr_ids.txt", 'r') as file:
        file = file.read()
    ids = file.split(', ')
    return web.json_response({"ids": ids})


def index(request):
    return web.FileResponse(
        f'{os.path.dirname(os.path.realpath(__file__))}/build/index.html')


def favicon(request):
    return web.FileResponse(
        f'{os.path.dirname(os.path.realpath(__file__))}/build/favicon.ico')


def init_app():
    app = web.Application()

    cors = aiohttp_cors.setup(app, defaults={
        "http://0.0.0.0:8080/": aiohttp_cors.ResourceOptions(),
    })
    app.router.add_static('/static/',
                          f'{os.path.dirname(os.path.realpath(__file__))}/build/static/',
                          name='static')

    index_url = cors.add(app.router.add_resource("/"))
    cors.add(index_url.add_route("GET", index), {
        "http://0.0.0.0:8080/": aiohttp_cors.ResourceOptions(expose_headers="*",
                                          allow_headers="*",
                                          allow_credentials=True, ),
    })
    ids_resource = cors.add(app.router.add_resource("/get_ids"))
    cors.add(ids_resource.add_route("GET", get_ids), {
        "http://0.0.0.0:8080/": aiohttp_cors.ResourceOptions(expose_headers="*",
                                          allow_headers="*",
                                          allow_credentials=True, ),
    })
    cadastr_info = cors.add(app.router.add_resource("/get_poly"))
    cors.add(cadastr_info.add_route("GET", get_poly), {
        "http://0.0.0.0:8080/": aiohttp_cors.ResourceOptions(expose_headers="*",
                                          allow_headers="*",
                                          allow_credentials=True, ),
    })

    logging.basicConfig()
    return app


app = init_app()
