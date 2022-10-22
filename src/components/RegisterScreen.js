import logo from "../assets/images/trackit_logo.png";
import styled from "styled-components";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterScreen() {
  const [registerInfo, setRegisterInfo] = React.useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [ErrorMessage, setErrorMessage] = React.useState({});

  const navigate = useNavigate();

  function ShowErrorMessage() {
    if (Object.keys(ErrorMessage).includes("details")) {
      return ErrorMessage.details.map((message, index) => (
        <p key={index}>Error: {message}</p>
      ));
    } else {
      return <p>{ErrorMessage.message}</p>;
    }
  }

  const tryRegister = (event) => {
    event.preventDefault();

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      registerInfo
    );

    promise.then((ans) => navigate(-1));

    promise.catch((err) => setErrorMessage(err.response.data));
  };

  const registerScreenLayout = (
    <MainContent>
      <img src={logo} alt="" />

      <RegisterForm onSubmit={(event) => tryRegister(event)}>
        <input
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, email: e.target.value })
          }
          placeholder="email"
        ></input>

        <input
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, password: e.target.value })
          }
          placeholder="senha"
        ></input>

        <input
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, name: e.target.value })
          }
          placeholder="nome"
        ></input>

        <input
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, image: e.target.value })
          }
          placeholder="Url da foto"
        ></input>

        <button type="submit">Cadastrar</button>
      </RegisterForm>

      <ErrorLog>
        <ShowErrorMessage />
      </ErrorLog>
    </MainContent>
  );

  return registerScreenLayout;
}

// Styled Components

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterForm = styled.form`
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
