import _ from 'lodash'
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    //mapKeys is an odd as a function that' going to take an array and turn to an object
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
