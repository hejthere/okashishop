import "./App.css";
import Home from "./component/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CartContextProvider } from "./CartContext";
import { AuthProvider } from "./firebaseAuth/AuthContext";
import { Route, Switch } from "react-router-dom";
import Login from "./component/logIn/Login";
import CheckOut from "./component/logIn/CheckOut";
import BuyHistory from "./component/logIn/BuyHistory";
import PrivateRoute from "./firebaseAuth/PrivateRoute";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { firebaseConfig } from "./firebaseAuth/firebase";
import firebase from "firebase/app";
import "firebase/database";
import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        {/* <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig} /> */}
        <ParallaxProvider>
          <Container className="App p-0" fluid={true}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Login} />
              <PrivateRoute exact path="/checkout" component={CheckOut} />
              <PrivateRoute exact path="/history" component={BuyHistory} />
            </Switch>
          </Container>
        </ParallaxProvider>
        {/* </FirebaseDatabaseProvider> */}
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
