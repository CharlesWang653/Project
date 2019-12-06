import React from "react";
import {withRouter, Router, Route, Switch} from "react-router-dom";
import Create from "./create";
import Home from "./Home";
import Edit from "./edit";
import { createBrowserHistory } from "history";
const WithRouterCreate = withRouter(Create);
const WithRouterEdit = withRouter(Edit);
const WithRouterHome = withRouter(Home);
const history = createBrowserHistory();
var memory={search:"",sortArea:"",sortFunc:"",page:1}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {mem:false};
  }
  setMemory = (newmemory) => {
    memory = newmemory;
    this.setState({mem:true});
    console.log(memory);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
              exact={true}
              path="/"
              render={() => <WithRouterHome 
                memory={memory} 
                setMemory={this.setMemory}
                />}
          />
          <Route
              path="/create"
              render={() => <WithRouterCreate
                memory={memory} 
                setMemory={this.setMemory}
                />}
          />
          <Route
              exact={true}
              path="/edit/:id"
              render={() => <WithRouterEdit 
                memory={memory} 
                setMemory={this.setMemory}
                />}
          />
          {/* <Route exact={true} path="/" component={Home} /> */}
          {/* <Route path="/create" component={WithRouterCreate} />
          <Route path="/edit/:id" component={WithRouterEdit} /> */}
        </Switch>
      </Router>
    );
  }
}
export default App;