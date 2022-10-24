import axios from "axios";
import React from "react";
import styled from "styled-components";
import { WEEKDAYS } from "../assets/utils/constants";
import { UserContext } from "./contexts/auth";

export default function Habits(props) {
  const { userStats } = React.useContext(UserContext);

  function deleteHabit(idToDelete) {
    const promise = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idToDelete}`,
      {
        headers: { Authorization: `Bearer ${userStats.token}` },
      }
    );

    promise.then((ans) => {props.setRenderTrigger(!props.renderTrigger)});
    promise.catch((err) => console.log(err));
  }

  function HabitsListItem(props) {
    return (
      <HabitContainer>
        <p>{props.name}</p>
        <WeekdaysContainer>
          {WEEKDAYS.map((day, index) => (
            <WeekdayDiv key={index} id={index} selectedDays={props.days}>
              {day}
            </WeekdayDiv>
          ))}
        </WeekdaysContainer>
        <ion-icon
          id={props.id}
          onClick={(event) => deleteHabit(event.target.id)}
          name="trash-outline"
        ></ion-icon>
      </HabitContainer>
    );
  }

  if (props.habitsList.length === 0) {
    return (
      <NoneHabitsRegistered>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </NoneHabitsRegistered>
    );
  } else {
    return (
      <HabitsUl>
        {props.habitsList.map((habitObj) => (
          <HabitsListItem
            id={habitObj.id}
            name={habitObj.name}
            days={habitObj.days}
          />
        ))}
      </HabitsUl>
    );
  }
}

//Styled Components
const HabitContainer = styled.li`
  position: relative;

  width: 340px;
  height: 91px;

  padding: 20px;

  background-color: #ffffff;

  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const WeekdaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WeekdayDiv = styled.div`
  padding: 5px;

  font-size: 15px;
  color: ${(props) =>
    props.selectedDays.includes(props.id) ? "#FFFFFF" : "#DBDBDB"};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5d5d5;
  border-radius: 5px;

  background-color: ${(props) =>
    props.selectedDays.includes(props.id) ? "#CFCFCF" : "#FFFFFF"};
`;

const HabitsUl = styled.ul`
  * {
    margin-bottom: 10px;
  }
`;

const NoneHabitsRegistered = styled.p`
width: 340px;
text-align: center;

color: #666666;

font-size: 18px;
`