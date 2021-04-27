from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop

from app import init_app


class ResAPITestCase(AioHTTPTestCase):
    async def get_application(self):
        return await init_app()

    @unittest_run_loop
    async def test_get_geojson(self):
        resp = await self.client.request('GET', '/get_poly?cadastr_id=47:25:0102030:34')
        assert resp.status == 200

