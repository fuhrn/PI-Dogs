import axios from "axios";

export function getDogs() {
  return function (dispatch) {
    try {
      axios.get("http://localhost:3001/api/dogs").then((response) => {
        return dispatch({
          type: "GET_DOGS",
          payload: response.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var dogf;
      var json = await axios
        .get(`http://localhost:3001/api/dogs`)
        .then((dogs) => dogs.data)
        .then((dogs) => {
          let dogFiltered = dogs.filter((dog) => dog.id === id);
          let dog = dogFiltered[0];
          return dispatch({
            type: "GET_DETAIL",
            payload: dog,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export const filteredDogs = (payload) => {
  return {
    type: "FILTERED_DOGS",
    payload,
  };
};

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
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
