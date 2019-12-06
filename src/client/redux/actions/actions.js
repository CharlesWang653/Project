const axios = require('axios');
export const userListRequestStart = () => {
  return {
    type: "GET_LIST_START"
  }
}
export const userListGetSuccess = (res) => {
  return {
    type: "GET_LIST_SUCCESS",
    data: res
  }
}
export const userListGetFail = (err) => {
  return {
    type: "GET_LIST_FAIL",
    err: err
  }
}
export const clear = () => {
  return {
    type: "CLEAR"
  }
}
export const userClear = () => {
  return {
    type: "USER_CLEAR"
  }
}
//all list
export const getAllStart = () => {
  return {
    type: "GET_ALL_LIST_START"
  }
}
export const getAllSuccess = (res) => {
  return {
    type: "GET_ALL_LIST_SUCCESS",
    data: res
  }
}
export const getAllFail = (err) => {
  return {
    type: "GET_ALL_LIST_FAIL",
    err: err
  }
}
//sigle user
export const userRequestStart = () => {
  return {
    type: "USER_START"
  }
}
export const userGetSuccess = (res) => {
  return {
    type: "GET_USER_SUCCESS",
    data: res
  }
}
export const userRequestFail = (err) => {
  return {
    type: "USER_FAIL",
    err: err
  }
}
export const getAllList = () => {
  return (dispatch, getState) => {
    dispatch(getAllStart());
    const arr = [];
    axios
      .get(`http://localhost:8888/api/users`)
      .then(res => {
        res.data.forEach((user) => {
          arr.push({name:user.Name, id: user._id});
        })
        dispatch(getAllSuccess(arr));
      })
      .catch(error => {
        dispatch(getAllFail(error));
      });
  }
}
export const getList = (search,sortArea,sortFunc,page) => {
  return (dispatch, getState) => {
    let newArr = [];
    dispatch(userListRequestStart());
    if(sortArea !== "" && sortFunc !== ""){
      axios
      .get(`http://localhost:8888/api/users?search=${search}&sortArea=${sortArea}&sortFunc=${sortFunc}&page=${page}`)
      .then(res => {
        dispatch(userListGetSuccess(res.data));
        // for(let user of res.data){
        //   console.log(user);

        //     // axios.get(`http://localhost:8888/api/users/${user.Superior}`)
        //     //   .then(newRes => {
        //     //       user = {...user,SuperiorName: newRes.data.Name};
        //     //       console.log(user+"after");
        //     //       newArr.push(user);
        //     //     if (res.data.length === newArr.length) {
        //     //       console.log(newArr);
        //     //       dispatch(userListGetSuccess(newArr));
        //     //     }
        //     //   })
        // }
      })
      .catch(error => {
        dispatch(userListGetFail(error));
      });
    }else{
      axios
      .get(`http://localhost:8888/api/users?search=${search}&page=${page}`)
      .then(res => {
        dispatch(userListGetSuccess(res.data));
        // for(let user of res.data){
        //     axios.get(`http://localhost:8888/api/users/${user.Superior}`)
        //       .then(newRes => {
        //         if(user.Superior !== ""){
        //           user = {...user,SuperiorName: newRes.data.Name};
        //           // console.log(user);
        //           newArr.push(user);
        //         }else{
        //           // console.log(user);
        //           newArr.push(user);
        //         }
        //         if (res.data.length === newArr.length) {
        //           dispatch(userListGetSuccess(newArr));
        //         }
        //       })
        // }
      })
      .catch(error => {
        dispatch(userListGetFail(error));
      });
    }
  }
}
export const getDS = (officerId) => {
  return (dispatch, getState) => {
    let newArr = [];
    dispatch(userListRequestStart());
    axios
      .get(`http://localhost:8888/api/users/${officerId}/DS`)
      .then(res => {
        for(let user of res.data){
          axios.get(`http://localhost:8888/api/users/${user.Superior}`)
            .then(newRes => {
              if(user.Superior !== ""){
                user = {...user,SuperiorName: newRes.data.Name};
                // console.log(user);
                newArr.push(user);
              }else{
                // console.log(user);
                newArr.push(user);
              }
              if (res.data.length === newArr.length) {
                dispatch(userListGetSuccess(newArr));
              }
            })
      }
      })
      .catch(error => {
        dispatch(userListGetFail(error));
      });
  }
}
export const getListOne = (Id) => {
    return (dispatch, getState) => {
      if(Id !== ""){
      dispatch(userListRequestStart());
      let newArr = [];
      axios
        .get(`http://localhost:8888/api/users/${Id}`)
        .then(res => {
            axios.get(`http://localhost:8888/api/users/${res.data.Superior}`)
              .then(newRes => {
                if(res.data.Superior !== ""){
                  res.data = {...res.data,SuperiorName: newRes.data.Name};
                  // console.log(user);
                  newArr.push(res.data);
                }else{
                  // console.log(user);
                  newArr.push(res.data);
                }
                dispatch(userListGetSuccess(newArr));
              })
        })
        .catch(error => {
          dispatch(userListGetFail(error));
        });
    }
  }
}
export const createOne = (user,history) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .post(`http://localhost:8888/api/users`, user)
      .then(res => {
        if(user.Superior !== ""){
          axios.put(`http://localhost:8888/api/users/${user.Superior}/DS`,{id: res.data})
            .then(history.goBack())
        }else{
          history.goBack();
        }
      })
      .catch(error => {
        dispatch(userListGetFail(error));
      });
  }
}
export const deleteOneUser = (user,search,sortArea,sortFunc,page) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    if(user.DS.length !== 0){
      user.DS.forEach((DSId) => {
        axios.delete(`http://localhost:8888/api/users/${DSId}/superior`);
      });
    }
    axios
      .delete(`http://localhost:8888/api/users/${user._id}`)
      .then(res => {
        if(user.Superior !== ""){
          axios.delete(`http://localhost:8888/api/users/${user.Superior}/DS/${user._id}`)
          .then(res => {
            dispatch(getList(search,sortArea,sortFunc,page));
          })
        }
      })
      .then(res => {
        dispatch(getList(search,sortArea,sortFunc,page));
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}
export const updateOne = (user, oldSuperior, newSuperior, history) => {
  return (dispatch, getState) => {
    if(oldSuperior !== newSuperior){
      if(oldSuperior !== "" && newSuperior !== ""){
        axios.all([
          axios.put(`http://localhost:8888/api/users/${user._id}`,user),
          axios.put(`http://localhost:8888/api/users/${newSuperior}/DS`,{id:user._id}),
          axios.delete(`http://localhost:8888/api/users/${oldSuperior}/DS/${user._id}`)
        ])
        .then(() => history.goBack());
      }else if(oldSuperior !== "" && newSuperior === ""){
        axios.all([
          axios.put(`http://localhost:8888/api/users/${user._id}`,user),
          axios.delete(`http://localhost:8888/api/users/${oldSuperior}/DS/${user._id}`)
        ])
        .then(() => history.goBack());
      }else if(oldSuperior === "" && newSuperior !== ""){
        axios.all([
          axios.put(`http://localhost:8888/api/users/${user._id}`,user),
          axios.put(`http://localhost:8888/api/users/${newSuperior}/DS`,{id:user._id})
        ])
        .then(() => history.goBack());
      }
    }else{
      axios
        .put(`http://localhost:8888/api/users/${user._id}`,user)
        .then(() => history.goBack());
    }
  }
}
export const getOneUser = (id,history) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .get(`http://localhost:8888/api/users/${id}`)
      .then(res => {
        axios.get(`http://localhost:8888/api/users/${res.data.Superior}`)
          .then(newRes => {
              res.data = {...res.data,SuperiorName: newRes.data.Name};
            dispatch(userGetSuccess(res.data));
          })
          .then(() => {
            history.push(`/edit/${id}`);
          })
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}