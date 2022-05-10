import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredDogs, orderByName } from "../../redux/actions";
import styled from "styled-components";
import { Select, Input } from "components/common";

const HeaderWrapper = styled.header`
  font-family: "Open Sans";
  margin: 60px auto 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  height: 90px;
  width: 100%;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.primaryColor},
    ${(p) => p.theme.secondaryColor}
  ); 
  border-bottom: 3px solid ${(p) => p.theme.secondaryColor}; */
`;

const Form = styled.form`
  display: flex;
`;

const Fieldset = styled.fieldset`
  display: flex;
  height: 60px;
  width: 100px;
  margin-left: 32px;
`;

const Legend = styled.legend`
  font-size: small;
`;

const Label = styled.label``;

const InputR = styled.input``;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

export function HeaderSearch() {
  const dogs = useSelector((state) => state.copyDogs);

  const dispatch = useDispatch();

  // search dogs
  function handleSearchChange(e) {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    let filtDogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(search)
    );
    dispatch(filteredDogs(filtDogs));
    // console.log("search: ", filteredDogs);
  }

  // sortByName: asc || des
  function handleSortByName(e) {
    e.preventDefault();
    let search = e.target.name;
    let orderedDogs = dogs;
    const sortedDogsName =
      search === "asc"
        ? orderedDogs.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        : orderedDogs.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });

    dispatch(orderByName(sortedDogsName));
    // console.log("sort: ", filteredDogs);
  }

  return (
    <HeaderWrapper>
      <Select concept="Temperamento" />
      <Form action="">
        <Fieldset>
          <Legend>Sort by Name</Legend>
          <Div>
            <InputR
              type="radio"
              name="asc"
              defaultChecked
              onClick={handleSortByName}
            />
            <Label>Asc</Label>
          </Div>
          <Div>
            <InputR type="radio" name="des" onClick={handleSortByName} />
            <Label>Des</Label>
          </Div>
        </Fieldset>
        <Fieldset>
          <Legend>Sort by Breed</Legend>
          <Div>
            <InputR type="radio" name="breed" defaultChecked />
            <Label>All</Label>
          </Div>
          <Div>
            <InputR type="radio" name="breed" />
            <Label>API</Label>
          </Div>
          <Div>
            <InputR type="radio" name="breed" />
            <Label>Created</Label>
          </Div>
        </Fieldset>
      </Form>
      <Input
        type="text"
        placeholder="Search..."
        width="200px"
        marginTop="16px"
        marginLeft="32px"
        onChange={handleSearchChange}
      />
    </HeaderWrapper>
  );
}
