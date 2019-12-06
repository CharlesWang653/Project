const initState = {data:[], isLoading:false, err:""};
const userListReducer = (state = initState, action) => {
  switch(action.type){
    case "GET_LIST_START":
      return {
        ...state,
        isLoading: true
      }
    case "GET_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data
      }
    case "GET_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        err: action.err
      }
    case "CLEAR":
          return initState;
    default:
      return state;
  }
}

export default userListReducer;