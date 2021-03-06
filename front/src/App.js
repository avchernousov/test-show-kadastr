import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Map } from './components';

const App = () => {
  const [ options, setOptions ] = useState([]);
  const [ type, setType ] = useState('');
  const [ coords, setCoords ] = useState([]);
  const [center, setCenter ] = useState({});

  useEffect(() => {
    fetch('/get_ids')
      .then((response) => response.json())
      .then((data) => setOptions(data.ids))
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    fetch(`/get_poly?cadastr_id=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setType(data.features[0].geometry.type);
        setCoords(data.features[0].geometry.coordinates[0]);
        setCenter(data.features[0].properties.center);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Form onSearch={(value) => onSearch(value)} options={options} />
      <Map 
        type={type}
        coordinates={coords}
        center={center && Object.keys(center).length ? [center.y, center.x] : []} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
`;