import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../assets/utils/constants";
import { UserContext } from "./contexts/auth";
import Habits from "./Habits";
import NewHabitLayout from "./NewHabitLayout";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function HabitsScreen() {
  const [habitsList, setHabitsList] = React.useState([]);
  const [addingAHabit, setAddingAHabit] = React.useState(false);
  const [renderTrigger, setRenderTrigger] = React.useState(false);

  const { userStats } = React.useContext(UserContext);

  React.useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        headers: { Authorization: `Bearer ${userStats.token}` },
      }
    );

    promise.then((ans) => setHabitsList(ans.data));

    promise.catch((err) => console.log(err));
  }, [addingAHabit, renderTrigger]);

  const habitsScreenLayout = (
    <MainContent>
      <HabitsHeader>
        <h1>TrackIt</h1>
        <img src={userStats.image} alt="User profile" />
      </HabitsHeader>

      <AddHabitContainer>
        <p>Meus Hábitos</p>
        <button onClick={() => setAddingAHabit(true)}>+</button>
      </AddHabitContainer>

      {addingAHabit && <NewHabitLayout setAddingAHabit={setAddingAHabit} />}

      <Habits renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger} addingAHabit={addingAHabit} habitsList={habitsList} />

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

  return habitsScreenLayout;
}

//Styled Components

const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: 100vh;
  
  background-color: #f2f2f2;
`;

const HabitsHeader = styled.div`
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

const AddHabitContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  margin-block: 20px;

  p {
    color: #126ba5;
    font-size: 23px;
  }

  button {
    background-color: #52b6ff;
    width: 40px;
    height: 35px;

    font-size: 27px;
    color: white;

    border: none;
    border-radius: 4px;
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
