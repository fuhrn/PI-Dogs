const initialState = {
  allDogs: [], // me trae todo
  copyDogs: [], // para hacerle filtros y guardar el state
  temperaments: [], // me traigo los temperamentos
  detail: [], // me traigo el detalle de cada Breed por nombre
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
    case "FILTERED_DOGS":
      return {
        ...state,
        allDogs: action.payload,
      };
    case "ORDER_BY_NAME":
      return {
        ...state,
        allDogs: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
