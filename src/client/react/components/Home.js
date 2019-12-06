import React from "react"
import {connect} from 'react-redux';
import * as actions from "../../redux/actions/actions"
import UserList from "./UserList"
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
const WithRouterList = withRouter(UserList);
var page = 1, number = 0;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search:""};
  }
  componentDidMount() {
    this.refs.myscroll.addEventListener("scroll", () => {
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
    this.props.getAllList();
    this.props.clear();
    this.props.getList(this.props.memory.search,this.props.memory.sortArea,this.props.memory.sortFunc,this.props.memory.page);
  }
  loadMore = () => {
    number = this.props.userList.data.length;
    console.log(number, page, this.props.userList.data.length);
    if(number < this.props.userList.data.length){
      number = this.props.userList.data.length;
    }
    else if(page * 5 <= number){
      page = page+1;
      console.log(this.props.memory,this.props.memory.page);
      this.props.setMemory({search:this.props.memory.search,sortArea: this.props.memory.sortArea,sortFunc:this.props.memory.sortFunc,page: page})
      this.props.getList(this.props.memory.search,this.props.memory.sortArea,this.props.memory.sortFunc,page);
    }
  }
  handleSearch = (e) => {
    this.setState({search:e.target.value});
  }
  render() {
    // console.log(this.props.history);
    return (
      <div>
        <input type="text" value={this.state.search} onChange={this.handleSearch}></input>
        <button onClick={() => {
          this.props.getList(this.state.search,this.props.memory.sortArea,this.props.memory.sortFunc,page);
          this.props.setMemory({search:this.state.search,sortArea: this.props.memory.sortArea,sortFunc:this.props.memory.sortFunc,page: page});
          }}>search</button>
        <button onClick={() => {
          this.props.getList("","","",1);
          page=1;
          this.props.setMemory({search:"",sortArea: "",sortFunc:"",page: 1});
          this.setState({search:""});
          }}>reset</button>
        <div
          className="App"
          ref="myscroll"
          style={{ height: "400px", overflow: "auto" }}
        >
          <WithRouterList
            allList={this.props.allList}
            search={this.state.search}
            page={page}
            userList={this.props.userList}
            getListOne={this.props.getListOne}
            getDS={this.props.getDS}
            deleteOneUser={this.props.deleteOneUser}
            getOneUser={this.props.getOneUser}
            getList={this.props.getList}
            setMemory={this.props.setMemory}
          />
        </div>
        <Button variant="contained" onClick={() => this.props.history.push('/create')}>
          Create
        </Button>
        {/* <button onClick={() => this.props.history.push('/create')}>create</button> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userList: state.userListReducer,
    allList: state.nameIdReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getList: (search,sortArea,sortFunc,page) => {
      dispatch(actions.getList(search,sortArea,sortFunc,page));
    },
    getListOne: (Id) => {
      dispatch(actions.getListOne(Id));
    },
    getDS: (OfficerId) => {
      dispatch(actions.getDS(OfficerId));
    },
    deleteOneUser: (user,search,sortArea,sortFunc,page) => {
      dispatch(actions.deleteOneUser(user,search,sortArea,sortFunc,page));
    },
    clear: () => {
      dispatch(actions.clear());
    },
    getOneUser: (id,history) => {
      dispatch(actions.getOneUser(id,history))
    },
    getAllList: () => {
      dispatch(actions.getAllList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);