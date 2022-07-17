import React, { useRef, useState, useEffect, FormEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Alert,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import "./login.css";
import { useAuth } from "../../firebaseAuth/AuthContext";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => console.log(data);

  //Login & Sign in Form
  const signInFormContent = [
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

  const loginContent = signInFormContent.filter(
    (el) => el.id !== "confirmPassword"
  );

  let displayForm = [];
  displayForm = (isLogin ? loginContent : signInFormContent).map((el) => {
    return (
      <div className="pb-4" key={el.id}>
        <div>{el.label}</div>
        <input {...register(el.id, { required: true })} />
        {errors[el.id] && (
          <div className="text-danger position-absolute">
            This field is required
          </div>
        )}
      </div>
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
  async function handleLogin() {
    try {
      await login(emailRef?.current?.value, passwordRef?.current?.value);
      history.push("/");
    } catch {
      setError("Fail to log in");
    }
  }

  async function submitSignUp() {
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
    <Container className="login-container background-image" fluid={true}>
      <Row>
        <div>
          <h1 className="text-white black-text-shadow">
            {isLogin ? "Log In" : "Sign In"}
          </h1>
          <Card className="p-2">
            <Card.Body>
              <Form
                onSubmit={
                  isLogin
                    ? handleSubmit(handleLogin)
                    : handleSubmit(submitSignUp)
                }
              >
                {displayForm}
                <Button type="submit">{isLogin ? "Log In" : "Sign In"}</Button>
                <Button className="mx-3 my-1" href="/">
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
      </Row>
    </Container>
  );
}
