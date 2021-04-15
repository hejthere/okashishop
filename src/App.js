import './App.css';
import Home from './component/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { CartContextProvider } from './CartContext'

function App() {
  return (
    <CartContextProvider>
      <Container className="App" fluid='true'>
        <Home />
      </Container>
    </CartContextProvider>
  );
}

export default App;
