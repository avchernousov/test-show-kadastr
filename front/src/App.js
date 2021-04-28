import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Map } from './components';

const App = () => {
  const [ options, setOptions ] = useState([]);
  const [ type, setType ] = useState('');
  const [ coords, setCoords ] = useState([]);

  useEffect(() => {
    fetch('http://0351ea900f46.ngrok.io/get_ids')
      .then((response) => response.json())
      .then((data) => setOptions(data.ids))
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    fetch(`http://0351ea900f46.ngrok.io/get_poly?cadastr_id=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setType(data.features.geometry.type);
        setCoords(data.features.geometry.coordinates);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Form onSearch={(value) => onSearch(value)} options={options} />
      <Map type={coords} coords={type} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
`;