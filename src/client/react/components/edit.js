import React from "react";
import {connect} from 'react-redux';
import * as actions from "../../redux/actions/actions"
import InputForm from "./inputForm";
import {withRouter} from "react-router-dom";
const WithRouterForm = withRouter(InputForm);
class Edit extends React.Component{
  componentDidMount = () => {
    this.props.getAllList();
  }

  render() {
    console.log(this.props.memory);
    return (
    <WithRouterForm
      userdata={this.props.user.data}
      nameIdList={this.props.allList.data}
      updateOne={this.props.updateOne}
    />
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer,
    allList: state.nameIdReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllList: () => {
      dispatch(actions.getAllList());
    },
    updateOne: (user, oldSuperior, newSuperior, history) => {
      dispatch(actions.updateOne(user, oldSuperior, newSuperior, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);