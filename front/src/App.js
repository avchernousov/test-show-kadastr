import styled from 'styled-components';
import { Form, Map } from './components';

const App = () => {
  return (
    <Container>
      <Form onSearch={(value) => console.log(value)} />
      <Map />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;