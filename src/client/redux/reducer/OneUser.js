const initState = {data:{}, isLoading:false, err:""};
const userReducer = (state = initState, action) => {
  switch(action.type){
    case "USER_START":
      return {
        ...state,
        isLoading: true
      }
    case "GET_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data
      }
    case "USER_FAIL":
      return {
        ...state,
        isLoading: false,
        err: action.err
      }
    case "USER_CLEAR":
      return initState;
    default:
      return state;
  }
}
export default userReducer;