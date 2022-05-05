const initialState = {
  allDogs: [], // me trae todo
  copyDogs: [], // para hacerle filtros y guardar el state
  temperaments: [], // me traigo los temperamentos
  detail: [], // me trago el detalle de cada Breed por nombre
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        copyDogs: action.payload,
        detail: [],
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTERED_BY_TEMPERAMENTS":
      const dogs = state.copyDogs;
      // console.log(Dogs);
      const temperamentFiltered =
        action.payload === ""
          ? dogs
          : dogs.filter((breed) => {
              return breed.temperaments
                .map((d) => d.name)
                .includes(action.payload.toLowerCase());
            });
      // console.log(Dogs);
      return {
        ...state,
        allDogs: temperamentFiltered,
      };
    case "ORDER_BY_NAME":
      const sortedDogsName =
        action.payload === "Asc"
          ? state.allDogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortedDogsName,
      };
    case "SEARCH_BREED":
      return {
        ...state,
        allDogs: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
