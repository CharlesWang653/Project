const initState = {data:[], isLoading:false, err:""};
const nameIdReducer = (state = initState, action) => {
  switch(action.type){
    case "GET_ALL_LIST_START":
      return {
        ...state,
        isLoading: true
      }
    case "GET_ALL_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data
      }
    case "GET_ALL_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        err: action.err
      }
    default:
      return state;
  }
}
export default nameIdReducer;