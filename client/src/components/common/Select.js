import React, { useState, useEffect } from "react";
import { filteredDogs } from "../../redux/actions";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "redux/actions";

const DropDownContainer = styled("div")``;

const Label = styled.label`
  font-size: 12px;
  display: inline-flex;
  min-width: 168px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const DropDownHeader = styled("header")`
  padding: 8px 8px 16px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: "Open Sans";
  margin-right: 8px;
  min-width: 168px;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 0.5em;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 10;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  min-width: 168px;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 1em;
  font-family: "Open Sans";
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

export function Select(props) {
  const dogs = useSelector((state) => state.copyDogs);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // lleno el store con los temperamentos
    dispatch(getTemperaments());

    // llenar el array para las options del select de temperamento
    async function fetchTemperaments() {
      const temps = await axios
        .get("/api/temperaments")
        // .get("http://localhost:3000/api/temperaments") no funciona deployado asi
        .then((result) => result.data)
        .then((result) => console.log('result', result) )
        .then((result) =>
          result.map((temp) => {
            return { ID: temp.ID, name: temp.name };
          })
        );
      setOptions((options) => temps);
    }
    // ejectuto la funcion arriba creada
    fetchTemperaments();
  }, [dispatch]);

  // en la primera renderizada, options todavia no esta llenado, pero en la segunda si lo completa
  let initialHeader = options[0] === undefined ? "" : options[0].name;

  const toggling = () => setIsOpen(!isOpen);

  // traigo via props el label que quiero mostrar
  const concept = props.concept;

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);

    let search = value;
    let filtDogs = dogs.filter((dog) => dog.temperaments.includes(search));
    dispatch(filteredDogs(filtDogs));
  };

  return (
    <>
      <DropDownContainer>
        <Label>{concept}</Label>
        <DropDownHeader onClick={toggling}>
          {selectedOption || initialHeader}
        </DropDownHeader>
        <Label></Label>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.name)}
                  key={option.ID}
                >
                  {option.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
}
