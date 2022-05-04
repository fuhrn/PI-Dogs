import React, { useState } from "react";
import styled from "styled-components";


const DropDownContainer = styled("div")`
  /* width: 30.5em; */
  /* margin: auto auto; */
  /* padding: 10px 8px;  */
`;

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
  /* width: 100%; */
  min-width: 168px;
  box-sizing: border-box;
  /* margin-top: 0.5em; */
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

const options = ["Mangoes", "Apples", "Oranges"];

export function Select(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  // traigo via props el label que quiero mostrar
  const concept = props.concept

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <>
      <DropDownContainer>
        <Label>{ concept }</Label>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Mangoes"}
        </DropDownHeader>
        {/* <Label></Label> */}
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
}
