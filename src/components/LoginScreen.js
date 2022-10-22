import logo from "../assets/images/trackit_logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

export default function LoginScreen() {
  const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });
  console.log(loginInfo);
  const [ErrorMessage, setErrorMessage] = React.useState({});

  const navigate = useNavigate();

  const tryLogin = (event) => {
    event.preventDefault()

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      loginInfo
    );

    promise.then(() => navigate("/hoje"));

    promise.catch((err) => setErrorMessage(err.response.data));
  };

  function ShowErrorMessage() {
    if (Object.keys(ErrorMessage).includes("details")) {
      return ErrorMessage.details.map((message, index) => (
        <p key={index}>Error: {message}</p>
      ));
    } else {
      return <p>{ErrorMessage.message}</p>;
    }
  }

  const loginScreenLayout = (
    <MainContent>
      <img src={logo} alt="" />

      <LoginForm onSubmit={(event) => tryLogin(event)}>
          <input
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            placeholder="email"
          ></input>
          <input
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            placeholder="senha"
          ></input>

          <button type="submit">Entrar</button>
      </LoginForm>

      <Link to={"/cadastro"}>Não tem nenhuma conta? Cadastre-se!</Link>
      <ErrorLog>
        <ShowErrorMessage />
      </ErrorLog>
    </MainContent>
  );

  return loginScreenLayout;
}

// Styled Components

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-bottom: 15px;

  input {
    width: 303px;
    height: 34px;

    margin-bottom: 6px;
  }

  button {
    width: 303px;
    height: 34px;
  }
`;

const ErrorLog = styled.div`
  margin-block: 20px;
  display: flex;
  flex-direction: column;
  * {
    align-items: center;
    color: red;
    margin-block: 6px;
  }
`;
