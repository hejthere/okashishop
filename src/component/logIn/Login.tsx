import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Row,
  Container,
} from "react-bootstrap";
import "./login.css";
import { useAuth } from "../../firebaseAuth/AuthContext";
import { Controller, useForm } from "react-hook-form";

interface LoginFormDate {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function Login() {
  const location = useLocation();
  const history = useHistory();
  //@ts-ignore
  const { signUp, login } = useAuth();
  const [error, setError] = useState<string>();
  const [isLogin, setIsLogin] = useState(true);
  const { handleSubmit, control, watch } = useForm<LoginFormDate>();
  // const onSubmit = (data) => console.log(data);

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
  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setError("");
      await login(email, password);
      history.push("/");
    } catch {
      setError("Fail to log in");
    }
  }

  async function submitSignUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setError("");
      await signUp(email, password);
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
                <div className="pb-4">
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Required" }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => (
                      <>
                        <div>Email</div>
                        <input
                          className="input-box"
                          ref={ref}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                        {error && (
                          <div className="text-danger">{error.message}</div>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Required" }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => (
                      <>
                        <div className="pt-3">Password</div>
                        <input
                          className="input-box"
                          ref={ref}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          type="password"
                        />
                        {error && (
                          <div className="text-danger">{error.message}</div>
                        )}
                      </>
                    )}
                  />
                  {!isLogin && (
                    <Controller
                      control={control}
                      name="confirmPassword"
                      rules={{
                        required: "Required",
                        validate: (value) =>
                          value === watch("password") ||
                          "The passwords do not match",
                      }}
                      render={({
                        field: { onChange, onBlur, value, ref },
                        fieldState: { error },
                      }) => (
                        <>
                          <div className="pt-3">Confirm Password</div>
                          <input
                            className="input-box"
                            ref={ref}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            type="password"
                          />
                          {error && (
                            <div className="text-danger">{error.message}</div>
                          )}
                        </>
                      )}
                    />
                  )}
                </div>
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
