import logo from "../assets/images/trackit_logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { UserContext } from "./contexts/auth";

export default function LoginScreen() {
  const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });

  const [ErrorMessage, setErrorMessage] = React.useState({});

  const { setUserStats } = React.useContext(UserContext);

  const navigate = useNavigate();

  const tryLogin = (event) => {
    event.preventDefault();

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      loginInfo
    );

    promise.then((ans) => handleLogin(ans.data));

    promise.catch((err) => setErrorMessage(err.response.data));
  };

  function handleLogin(ansToken) {
    setUserStats(ansToken);
    navigate("/habitos")
  }

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
          data-identifier="input-email"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          placeholder="email"
        ></input>
        <input
          data-identifier="input-password"
          type="password"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          placeholder="senha"
        ></input>

        <button data-identifier="login-btn" type="submit">
          Entrar
        </button>
      </LoginForm>

      <Link data-identifier="sign-up-action" to={"/cadastro"}>
        Não tem nenhuma conta? Cadastre-se!
      </Link>
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
  justify-content: center;

  height: 100vh;
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
    height: 45px;

    background-color: #52B6FF;
    border-radius: 5px;

    color: #FFFFFF;

    font-size: 21px;

    border: none;

    cursor:pointer;
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
