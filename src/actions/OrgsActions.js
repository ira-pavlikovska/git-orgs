import * as api from "../api/api";

export const GET_ORGS_REQUEST = "GET_ORGS_REQUEST";
export const GET_ORGS_REQUEST_SUCCESS = "GET_ORGS_REQUEST_SUCCESS";
export const GET_ORGS_REQUEST_FAILURE = "GET_ORGS_REQUEST_FAILURE";

export const ORGS_NEXT_RESULTS_SUCCESS = "ORGS_NEXT_RESULTS_SUCCESS";
export const ORGS_NEXT_RESULTS_FAILURE = "ORGS_NEXT_RESULTS_FAILURE";
export const ORGS_LESS_RESULTS = "ORGS_LESS_RESULTS";

export const getOrgs = () => (dispatch) => {

  api
    .getOrganization()
    .then((response) => {
      dispatch({
        type: GET_ORGS_REQUEST_SUCCESS,
        list: response.data,
        links: response.headers.link,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ORGS_REQUEST_FAILURE,
        error,
      });
    });
};

export const getMoreResults = () => (dispatch, getState) => {
  const {nextResults} = getState().orgs;

  api
    .getMoreResults(nextResults)
    .then((response) => {
      dispatch({
        type: ORGS_NEXT_RESULTS_SUCCESS,
        list: response.data,
        links: response.headers.link,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORGS_NEXT_RESULTS_FAILURE,
        error,
      });
    });
};

export const getLessResults = () => (dispatch) => {
  dispatch({
    type: ORGS_LESS_RESULTS,
  });
};
