import React from "react";
import * as actions from "../../redux/actions/actions"
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import InputForm from "./inputForm";
const WithRouterForm = withRouter(InputForm);
class Create extends React.Component{
  componentDidMount = () => {
    this.props.getAllList();
  }
  render() {
    return (
      <WithRouterForm
        userdata={{_id:"", Avatar: "", Name: "",
          Sex: "", Rank: "", StartDate: "",
          Phone: "", Email: "", 
          Superior: "",SuperiorName:""}}
        nameIdList={this.props.allList.data}
        use="create"
        createOne={this.props.createOne}
      />
      );
  }
}
const mapStateToProps = state => {
  return {
    allList: state.nameIdReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllList: () => {
      dispatch(actions.getAllList());
    },
    getList: (search,sortArea,sortFunc,page) => {
      dispatch(actions.getList(search,sortArea,sortFunc,page));
    },
    getListOne: (Id) => {
      dispatch(actions.getListOne(Id));
    },
    getDS: (OfficerId) => {
      dispatch(actions.getDS(OfficerId));
    },
    createOne: (user,history) => {
      dispatch(actions.createOne(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);