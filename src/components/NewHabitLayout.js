import axios from "axios";
import React from "react";
import styled from "styled-components";
import { WEEKDAYS } from "../assets/utils/constants";
import { UserContext } from "./contexts/auth";

export default function NewHabitLayout(props) {
  const [newHabitObject, setNewHabitObject] = React.useState({
    name: "",
    days: [],
  });
  console.log(newHabitObject);

  const { userStats } = React.useContext(UserContext);
  console.log(userStats.token)

  function selectDayHandler(event) {
    if (!newHabitObject.days.includes(event.target.id)) {
      const newHabitsDaysArr = [...newHabitObject.days, event.target.id];
      const newHabitsDaysArrUnique = [...new Set(newHabitsDaysArr)];
      setNewHabitObject({ ...newHabitObject, days: newHabitsDaysArrUnique });
    } else {
      const newHabitsDaysArr = [...newHabitObject.days];
      const indexToRemove = newHabitsDaysArr.indexOf(event.target.id);
      newHabitsDaysArr.splice(indexToRemove, 1);
      setNewHabitObject({ ...newHabitObject, days: newHabitsDaysArr });
    }
  }

  function submitNewHabit(event) {

    event.preventDefault()

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      newHabitObject,
      {
        headers: { Authorization: `Bearer ${userStats.token}` },
      }
    );

    promise.then((ans) => props.setAddingAHabit(false))

    promise.catch((err) => console.log(err))
  }

  return (
    <AddHabitForm onSubmit={(event) => submitNewHabit(event)}>
      <input
        placeholder="nome do hábito"
        onChange={(e) =>
          setNewHabitObject({ ...newHabitObject, name: e.target.value })
        }
      ></input>
      <WeekdaysContainer>
        {WEEKDAYS.map((day, index) => (
          <WeekdayDiv
            key={index}
            onClick={(event) => selectDayHandler(event)}
            id={index}
            selectedDays={newHabitObject.days}
          >
            {day}
          </WeekdayDiv>
        ))}
      </WeekdaysContainer>
      <AddHabitButtons>
        <button type="button" onClick={() => props.setAddingAHabit(false)}>
          Cancelar
        </button>
        <button type="submit">Salvar</button>
      </AddHabitButtons>
    </AddHabitForm>
  );
}

// Styled Components

const AddHabitForm = styled.form`
  background-color: white;
  padding: 20px;

  width: 340px;

  margin-bottom: 15px;

  * {
    margin-block: 5px;
  }

  input {
    width: 300px;
    height: 45px;
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
    props.selectedDays.includes(props.id.toString()) ? "#FFFFFF" : "#DBDBDB"};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5d5d5;
  border-radius: 5px;

  background-color: ${(props) =>
    props.selectedDays.includes(props.id.toString()) ? "#CFCFCF" : "#FFFFFF"};
`;

const AddHabitButtons = styled.div`
  display: flex;

  justify-content: end;

  *{
    margin-inline: 8px;
  }

  button{
    width: 85px;
    height: 35px;

    font-size: 16px;

    border-radius: 5px;

    border: none;

    cursor: pointer;
  }

  button:first-child{
    background-color: #FFFFFF;
    color: #52b6ff;
  }

  button:last-child{
    background-color: #52b6ff;
    color: #FFFFFF;
  }
`;
