import { useEffect, useState } from 'react';
import { YMaps, Map as YMap, Polygon, ZoomControl, GeolocationControl, TypeSelector, Placemark } from 'react-yandex-maps';
import styled from 'styled-components';

const Map = ({ coordinates, type, center: centerData }) => {
  const [ coords, setCoords ] = useState(coordinates);
  const [ center, setCenter ] = useState([55.75, 37.57]);

  useEffect(() => {
    if (coordinates.length) {
      setCoords(coordinates);
      setCenter(centerData);
    }
  }, [coordinates, centerData]);


  return (
    <Wrapper>
      <YMaps>
        <div>
          <YMap state={{ center: center, zoom: 18 }} style={{ widht: '100%', height: '100vh'}}>
            {type === 'MultiPolygon' ? (
              <Polygon
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
};

export default Map;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;