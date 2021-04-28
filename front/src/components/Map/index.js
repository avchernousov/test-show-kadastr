import { YMaps, Map as YMap, Polygon, ZoomControl, GeolocationControl, TypeSelector, Placemark } from 'react-yandex-maps';
import styled from 'styled-components';

const Map = ({ coords, type }) => (
  <Wrapper>
  <YMaps>
    <div>
      <YMap defaultState={{ center: [55.75, 37.57], zoom: 9 }} style={{ widht: '100%', height: '100vh'}}>
        {type === 'MultiPolygon' ? (<Polygon
          // geometry={[
          //   [
          //     [55.75, 37.8],
          //     [55.8, 37.9],
          //     [55.75, 38.0],
          //     [55.7, 38.0],
          //     [55.7, 37.8],
          //   ],
          //   [
          //     [55.75, 37.82],
          //     [55.75, 37.98],
          //     [55.65, 37.9],
          //   ],
          // ]}
          geometry={coords}
          options={{
            fillColor: '#00FF00',
            strokeColor: '#0000FF',
            fillOpacity: 0.3,
            opacity: 0.5,
            strokeWidth: 2,
            strokeStyle: 'solid',
          }}
        />) : ( 
        <Placemark geometry={coords} />)}
      <ZoomControl options={{ float: 'left' }} />
      <GeolocationControl options={{ float: 'right' }} />
      <TypeSelector options={{ float: 'right' }} />
        </YMap>
    </div>
  </YMaps>
  </Wrapper>
);

export default Map;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;