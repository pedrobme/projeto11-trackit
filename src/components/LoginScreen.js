import logo from "../assets/images/trackit_logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

export default function LoginScreen() {
  const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });
  console.log(loginInfo);
  const [ErrorMessage, setErrorMessage] = React.useState({});

  const tryLogin = () => {
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      loginInfo
    );

    promise.then((ans) => console.log(ans));

    promise.catch((err) => setErrorMessage(err.response.data));
  };

  function ShowErrorMessage() {
    if (Object.keys(ErrorMessage).includes("details")) {
      return ErrorMessage.details.map((message, index) => <p key={index}>{message}</p>);
    } else {
      return <p>{ErrorMessage.message}</p>
    }
  }

  const loginScreenLayout = (
    <MainContent>
      <img src={logo} alt="" />

      <LoginInputs>
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

        <button onClick={tryLogin}>Entrar</button>
      </LoginInputs>

      <Link to={"/cadastro"}>Não tem nenhuma conta? Cadastre-se!</Link>
      <ShowErrorMessage />
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

const LoginInputs = styled.div`
  display: flex;
  flex-direction: column;

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
