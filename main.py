import logging

from aiohttp import web

from backend.app import app

if __name__ == '__main__':
    try:
        web.run_app(app, port=8080)
    except RuntimeError as e:
        logging.info(f"Error: {e}")
