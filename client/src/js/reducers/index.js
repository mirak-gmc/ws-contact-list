import { GET_USERS, ADD_USER } from "../actionTypes";

const initState = {
  users: [],
  loading: true,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: false, users: action.payload }; // payload : array of users
    case ADD_USER:
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
};
