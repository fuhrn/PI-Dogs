import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredDogs, orderByName, filterByOrigin } from "../../redux/actions";
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
  // sortByName: asc || des
  const [sortByName, setSortByName] = useState("asc");
  const handleSortByNameChange = (e) => {
    setSortByName(e.target.value);
    handleSortByName(sortByName);
  };

  // filteredByOrigin: all || API || created
  const [filteredByOrigin, setFilterByOrigin] = useState("api");
  const handleFilterByOriginChange = (e) => {
    setFilterByOrigin(e.target.value);
    handleFilterByOrigin(filteredByOrigin);
  };

  //
  // preparing DEEP cloning dogs for searching
  const dogs1 = useSelector((state) => state.copyDogs);
  let dogs = [];

  //
  // preparing DEEP cloning orderedDogs
  const orderedDogs1 = useSelector((state) => state.copyDogs);
  let orderedDogs = [];

  //
  // preparing DEEP cloning filteredDogs
  const filtDogs1 = useSelector((state) => state.copyDogs);
  let filtDogs = [];

  const dispatch = useDispatch();

  // para borrar input search luego de apretado enter
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.value = "";
    }
  }

  // search dogs
  function handleSearchChange(e) {
    // DEEP CLONING
    dogs = JSON.parse(JSON.stringify(dogs1));

    e.preventDefault();
    let search = e.target.value.toLowerCase();
    let searchDogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(search)
    );
    dispatch(filteredDogs(searchDogs));
  }

  // sortByName: asc || des
  function handleSortByName(sortByName) {
    // DEEP CLONING
    orderedDogs = JSON.parse(JSON.stringify(orderedDogs1));

    const sortedDogsName =
      sortByName === "des"
        ? orderedDogs.sort(function (a, b) {
            console.log("order: ", sortByName);
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        : orderedDogs.sort(function (a, b) {
            console.log("order: ", sortByName);
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });

    dispatch(orderByName(sortedDogsName));
  }

  // filteredByOrigin: all || api || created
  function handleFilterByOrigin(filteredByOrigin) {
    // DEEP CLONING
    filtDogs = JSON.parse(JSON.stringify(filtDogs1));
    let filtDogsApi;
    let filtDogsCreated;
    // console.log("inicio filtDogs: ", filtDogs);

    switch (filteredByOrigin) {
      // case "all":
      //   console.log("all");
      //   // console.log(filteredByOrigin);
      //   // dispatch(filterByOrigin(filtDogs));
      //   console.log("filtDogsAll: ", filtDogs);
      //   break;
      case "api":
        // console.log("created");
        filtDogsApi = filtDogs.filter(
          (dog) => dog.id.split("-").length > 1
        );
        // console.log("filtDogsCreated: ", filtDogsCreated);
        dispatch(filterByOrigin(filtDogsApi));
        break;
      case "created":
        // console.log("api");
        filtDogsCreated = filtDogs.filter((dog) => dog.id.length < 8);
        // console.log("filtDogsApi: ", filtDogsApi);
        dispatch(filterByOrigin(filtDogsCreated));
    }
  }

  return (
    <HeaderWrapper>
      <Select concept="Temperamento" />
      <Form action="">
        <Fieldset>
          <Legend>Sort by Name</Legend>
          <Div>
            <InputR
              id="sortAsc"
              type="radio"
              name="sort"
              checked={sortByName === "asc" ? true : false}
              value="asc"
              onChange={handleSortByNameChange}
            />
            <Label>Asc</Label>
          </Div>
          <Div>
            <InputR
              id="sortDes"
              type="radio"
              name="sort"
              checked={sortByName === "des" ? true : false}
              value="des"
              onChange={handleSortByNameChange}
            />
            <Label>Des</Label>
          </Div>
        </Fieldset>
        <Fieldset>
          <Legend>Sort by Breed</Legend>
          {/* <Div>
            <InputR
              id="sortAll"
              type="radio"
              name="origin"
              checked={filteredByOrigin === "all" ? true : false}
              value="all"
              onChange={handleFilterByOriginChange}
            />
            <Label>All</Label>
          </Div> */}
          <Div>
            <InputR
              id="sortApi"
              type="radio"
              name="origin"
              checked={filteredByOrigin === "api" ? true : false}
              value="api"
              onChange={handleFilterByOriginChange}
            />
            <Label>API</Label>
          </Div>
          <Div>
            <InputR
              id="sortCreated"
              type="radio"
              name="origin"
              checked={filteredByOrigin === "created" ? true : false}
              value="created"
              onChange={handleFilterByOriginChange}
            />
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
        onKeyDown={handleKeyDown}
      />
    </HeaderWrapper>
  );
}
