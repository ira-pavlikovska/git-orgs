import {
  GET_ORGS_REQUEST,
  GET_ORGS_REQUEST_SUCCESS,
  GET_ORGS_REQUEST_FAILURE,
  ORGS_NEXT_RESULTS_SUCCESS,
  ORGS_LESS_RESULTS,
} from "../actions/OrgsActions";

const initialState = {
  list: [],
  nextResults: null
};

const getNextResultLink = (linksStr) => {
  let nextResults = '';
  const idx = linksStr.indexOf(';');
  if (idx > 0) {
    nextResults = linksStr.substring(0, idx);
    nextResults = nextResults.substring(1, nextResults.length - 1);
  }
  return nextResults;
}

function orgs(state = initialState, action) {
  switch (action.type) {
    case GET_ORGS_REQUEST:
      return {
        ...initialState,
      };
    case GET_ORGS_REQUEST_SUCCESS:
      return {
        ...state,
        list: action.list,
        nextResults: getNextResultLink(action.links),
      };

    case GET_ORGS_REQUEST_FAILURE:
      console.log('GET_ORGS_REQUEST_FAILURE');
      return state;

    case ORGS_NEXT_RESULTS_SUCCESS:
      const allOrgs = state.list.concat(action.list);
      return {
        ...state,
        list: allOrgs,
        nextResults: getNextResultLink(action.links),
      };

    case ORGS_LESS_RESULTS:
      if (state.list.length <= 0) {
        return state;
      }

      const PAGE_SIZE = 10;
      const lessOrgs = state.list.splice(PAGE_SIZE);
      return {
        ...state,
        list: lessOrgs,
      };

    default:
      return state;
  }
}

export default orgs;
