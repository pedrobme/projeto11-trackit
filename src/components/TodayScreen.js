import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./contexts/auth";
import { COLORS } from "../assets/utils/constants";
import axios from "axios";
import DayHandler from "./DayHandler";

export default function TodayScreen() {
  const { userStats } = React.useContext(UserContext);

  const [habitsList, setHabitsList] = React.useState([]);

  const [finishedPercent, setFinishedPercent] = React.useState(0);

  const [renderTrigger, setRenderTrigger] = React.useState(false);

  React.useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: { Authorization: `Bearer ${userStats.token}` },
      }
    );

    promise.then((ans) => setHabitsList(ans.data));
    promise.catch((err) => console.log(err));
  }, [renderTrigger]);

  function clickHandler(event) {
    if (event.target.getAttribute("isDone") === "true") {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${event.target.id}/uncheck`,
        {},
        {
          headers: { Authorization: `Bearer ${userStats.token}` },
        }
      );

      promise.then(() => setRenderTrigger(!renderTrigger));

      promise.catch((err) => console.log(err));
    } else {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${event.target.id}/check`,
        {},
        {
          headers: { Authorization: `Bearer ${userStats.token}` },
        }
      );

      promise.then(() => setRenderTrigger(!renderTrigger));

      promise.catch((err) => console.log(err));
    }
  }

  function TodayProgress() {
    const finishedHabits = habitsList.filter(
      (habitObj) => habitObj.done === true
    );

    let newFinishedPercent;

    if (habitsList.length === 0) {
      newFinishedPercent = 0;
    } else {
      newFinishedPercent =
        (finishedHabits.length / habitsList.length) * 100;
      setFinishedPercent(newFinishedPercent);
    }

    if (newFinishedPercent === 0) {
      return <p>Nenhum hábito concluído ainda</p>;
    }
    return <p> {newFinishedPercent}% dos hábitos concluídos</p>;
  }

  const todayScreenLayout = (
    <MainContent>
      <TodayHeader>
        <h1>TrackIt</h1>
        <img src={userStats.image} alt="User profile" />
      </TodayHeader>

      <TodayStatsContainer finishedPercent={finishedPercent}>
        <DayHandler />
        <TodayProgress />
      </TodayStatsContainer>

      <TodayHabitsUl>
        {habitsList.map((habit, index) => (
          <TodayHabitItem key={index}>
            <TextElements>
              <MainText>
                <p>{habit.name}</p>
              </MainText>
              <SubTexts>
                <p>Sequencia atual: {habit.currentSequence}</p>
                <p>Seu recorde: {habit.highestSequence}</p>
              </SubTexts>
            </TextElements>

            <CheckMark
              id={habit.id}
              isDone={habit.done}
              onClick={(event) => clickHandler(event)}
            >
              <ion-icon
                id={habit.id}
                isDone={habit.done}
                name="checkmark"
              ></ion-icon>
            </CheckMark>
          </TodayHabitItem>
        ))}
      </TodayHabitsUl>

      <Footer>
        <Link to="/habitos">Hábitos</Link>
        <Link to="/hoje">Hoje</Link>
        <Link to="/historico">Histórico</Link>
      </Footer>

      <FooterPhantom />
    </MainContent>
  );

  return todayScreenLayout;
}

//StyledComponents

const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  background-color: #f2f2f2;

  min-height: 100vh;
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

const TodayStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-block: 20px;

  width: 340px;

  *{
    margin-block: 10px;
  }

  p:first-child {
    color: #126ba5;
    font-size: 23px;
  }

  p:last-child {
    font-size: 18px;
    color: ${(props) => (props.finishedPercent < 1 ? "#BABABA" : "#8FC549")};
  }
`;

const TodayHabitsUl = styled.ul`
  * {
    margin-bottom: 10px;
  }
`;

const TodayHabitItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  width: 340px;

  padding: 15px;
`;

const TextElements = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  margin-bottom: 7px;

  p {
    font-size: 20px;
  }
`;

const SubTexts = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 13px;
  }
`;

const CheckMark = styled.div`
  width: 70px;
  height: 70px;

  background-color: ${(props) => (props.isDone ? "#8FC549" : "#EBEBEB")};

  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  ion-icon {
    color: white;
    font-size: 45px;

    width: 100%;
    height: 100%;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;

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
