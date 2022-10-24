import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./contexts/auth";
import { COLORS } from "../assets/utils/constants";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function HistorySreen() {
  const { userStats } = React.useContext(UserContext);

  return (
    <MainContent>
      <TodayHeader>
        <h1>TrackIt</h1>
        <img src={userStats.image} alt="User profile" />
      </TodayHeader>

      <p>Em breve o histórico estará disponível</p>

      <Link to={"/hoje"}>Voltar para a tela de Hoje.</Link>

      <Footer>
        <Link to="/habitos">Hábitos</Link>
        <Link to="/hoje">
          <ProgressCircle>
            <CircularProgressbar
              value={0}
              text={`Hoje`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                rotation: 0.25,

                strokeLinecap: "butt",

                textSize: "16px",

                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
            />
          </ProgressCircle>
        </Link>
        <Link to="/historico">Histórico</Link>
      </Footer>

      <FooterPhantom />
    </MainContent>
  );
}

const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  background-color: #f2f2f2;

  min-height: 100vh;

  p{
    margin-block: 30px;
  }
`;

const TodayHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  width: 100%;
  height: 70px;

  background-color: ${COLORS.habitsColor};
  color: white;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    margin-right: 20px;
  }

  h1 {
    margin-left: 20px;
    font-size: 40px;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 70px;

  padding-inline: 36px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterPhantom = styled.div`
  width: 100%;
  height: 70px;
`;

const ProgressCircle = styled.div`
  width: 90px;
  height: 90px;

  margin-bottom: 50px;
`;
