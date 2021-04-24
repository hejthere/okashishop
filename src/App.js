import './App.css';
import Home from './component/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { CartContextProvider } from './CartContext'
import { AuthProvider } from './firebaseAuth/AuthContext'
import { Route, Switch } from 'react-router-dom'
import Login from './component/logIn/Login'
import CheckOut from './component/logIn/CheckOut'
import PrivateRoute from './firebaseAuth/PrivateRoute'



function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <Container className="App" fluid='true'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Login} />
            <PrivateRoute path='/checkout' component={CheckOut} />

          </Switch>
        </Container>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
