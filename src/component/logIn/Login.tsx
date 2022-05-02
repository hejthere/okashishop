import React, { useRef, useState, useEffect, FormEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Alert,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import "./login.css";
import { useAuth } from "../../firebaseAuth/AuthContext";
import background from "../../pictures/watercolor.jpeg";

export default function Login() {
  const location = useLocation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  //@ts-ignore
  const { signUp, login } = useAuth();
  const [error, setError] = useState<string>();
  const [isLogin, setIsLogin] = useState(true);

  //Login & Sign in Form
  const formContent = [
    {
      id: "email",
      label: "Email",
      type: "email",
      ref: emailRef,
      placeholder: "Enter email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      ref: passwordRef,
      placeholder: "Enter password",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      ref: confirmPasswordRef,
      placeholder: "Re-enter password",
    },
  ];

  const loginContent = formContent.filter((el) => el.id !== "confirmPassword");

  let displayForm = [];
  displayForm = (isLogin ? loginContent : formContent).map((el) => {
    return (
      <Form.Group key={el.id}>
        <Form.Label>{el.label}</Form.Label>
        <Form.Control
          required
          type={el.type}
          ref={el.ref}
          placeholder={el.placeholder}
        />
      </Form.Group>
    );
  });

  //Switch Page

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    }
  }, [location]);

  const switchPageHandler = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  //Submit Form

  async function handleLogin(e: FormEvent<Element>) {
    e.preventDefault();
    try {
      await login(emailRef?.current?.value, passwordRef?.current?.value);
      history.push("/");
    } catch {
      setError("Fail to log in");
    }
  }

  async function submitSignUp(e: FormEvent<Element>) {
    e.preventDefault();
    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value)
      return setError("Password does not match!");
    try {
      setError("");
      await signUp(emailRef?.current?.value, passwordRef?.current?.value);
      history.push("/");
    } catch {
      setError("Failed to create account!");
    }
  }

  return (
    <Container className="login-container" fluid={true}>
      <Image
        src={background}
        className="background-image"
        alt="background"
        fluid={true}
      />
      <Row>
        <Col>
          <div className="w-100" style={{ maxWidth: "700px" }}>
            <h1>{isLogin ? "Log In" : "Sign In"}</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={isLogin ? handleLogin : submitSignUp}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {displayForm}
                  <Button type="submit">
                    {isLogin ? "Log In" : "Sign In"}
                  </Button>
                  <Button className="mx-3" href="/">
                    Back
                  </Button>
                  <div className="my-3">
                    {isLogin
                      ? "Haven't sign up yet ? "
                      : "Already have an account ? "}
                    <Link
                      onClick={switchPageHandler}
                      to={isLogin ? "/signup" : "/login"}
                    >
                      {isLogin ? "Sign up here" : "Log in here"}
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
