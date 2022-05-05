import axios from "axios";

export function getDogs() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/dogs").then((response) => {
      return dispatch({
        type: "GET_DOGS",
        payload: response.data,
      });
    });
  };
}

export function getTemperaments() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/temperaments").then((response) => {
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: response.data,
      });
    });
  };
}

export function filteredByTemperament(payload) {
  // el payload en este caso significa el value="..." que yo le mande desde el componente, osea el nombre del temperamento
  return {
    type: "FILTERED_BY_TEMPERAMENTS",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

// hay que buscar por nombre completo via query params el detalle de la razo. 
// si tiras nombre exacto te trae un solo breed
export function getDetail(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/api/dogs?search=${name}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// igual al anterior, podemos simplificar?
export function searchBreed(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/api/dogs?name=${name}`
      );
      return dispatch({
        type: "SEARCH_RECIPE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postBreed(payload) {
  return async function () {
    try {
      var json = await axios.post(`http://localhost:3001/api/dogs`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}
