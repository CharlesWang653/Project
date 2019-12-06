import React from "react"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state = {nameSort:0,sexSort:0, rankSort: 0, dateSort: 0};
  }
  handleNameClick = () => {
    if(this.state.nameSort === 0){
      this.props.getList(this.props.search,"Name",1,this.props.page);
      this.setState({nameSort:1});
    }else if(this.state.nameSort === 1){
      this.props.getList(this.props.search,"Name",-1,this.props.page);
      this.setState({nameSort:-1});
    }else if(this.state.nameSort === -1){
      this.props.getList(this.props.search,"Name","",this.props.page);
      this.setState({nameSort:0});
    }
  }
  handleSexClick = () => {
    if(this.state.sexSort === 0){
      this.props.getList(this.props.search,"Sex",1,this.props.page);
      this.setState({sexSort:1});
    }else if(this.state.sexSort === 1){
      this.props.getList(this.props.search,"Sex",-1,this.props.page);
      this.setState({sexSort:-1});
    }else if(this.state.sexSort === -1){
      this.props.getList(this.props.search,"Sex","",this.props.page);
      this.setState({sexSort:0});
    }
  }
  handleRankClick = () => {
    if(this.state.rankSort === 0){
      this.props.getList(this.props.search,"Rank",1,this.props.page);
      this.setState({rankSort:1});
    }else if(this.state.rankSort === 1){
      this.props.getList(this.props.search,"Rank",-1,this.props.page);
      this.setState({rankSort:-1});
    }else if(this.state.rankSort === -1){
      this.props.getList(this.props.search,"Rank","",this.props.page);
      this.setState({rankSort:0});
    }
  }
  handleDateClick = () => {
    if(this.state.dateSort === 0){
      this.props.getList(this.props.search,"StartDate",1,this.props.page);
      this.setState({dateSort:1});
    }else if(this.state.dateSort === 1){
      this.props.getList(this.props.search,"StartDate",-1,this.props.page);
      this.setState({dateSort:-1});
    }else if(this.state.dateSort === -1){
      this.props.getList(this.props.search,"StartDate","",this.props.page);
      this.setState({dateSort:0});
    }
  }
  getname = (id) => {
    const name = this.props.allList.data.find((userId) => {return userId.id === id})
    if(name){
      return name.name;
    }else{
      return "";
    }
  }
  render() {
    return (
      <Paper className="aboveall">
      <div className="big-div">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>avatar</TableCell>
              <TableCell onClick={this.handleNameClick}>name
                {this.state.nameSort === 1 && <span>&darr;</span>}{this.state.nameSort === -1 && <span>&uarr;</span>}</TableCell>
              <TableCell onClick={this.handleSexClick}>sex
                {this.state.sexSort === 1 && <span>&darr;</span>}{this.state.sexSort === -1 && <span>&uarr;</span>}</TableCell>
              <TableCell onClick={this.handleRankClick}>rank
                {this.state.rankSort === 1 && <span>&darr;</span>}{this.state.rankSort === -1 && <span>&uarr;</span>}</TableCell>
              <TableCell onClick={this.handleDateClick}>StartDate
                {this.state.dateSort === 1 && <span>&darr;</span>}{this.state.dateSort === -1 && <span>&uarr;</span>}</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Superior</TableCell>
              <TableCell>DS</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.userList.data.map(user => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                    <TableCell >
                      {(user.Avatar !== "") && <img src={require(`../../../../src/server/${user.Avatar}`)} style={{height:"50px",width:"50px"}}alt=""/>}
                    </TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell>{user.Sex}</TableCell>
                    <TableCell>{user.Rank}</TableCell>
                    <TableCell>{user.StartDate}</TableCell>
                    <TableCell><a href={`tel:${user.Phone}`}>{user.Phone}</a></TableCell>
                    <TableCell><a href={`mailto:${user.Email}`}>{user.Email}</a></TableCell>
                    <TableCell onClick={() => this.props.getListOne(user.Superior)}>{
                      this.getname(user.Superior)}</TableCell>
                    <TableCell onClick={() => this.props.getDS(user._id)}>{user.DS.length}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => {this.props.getOneUser(user._id, this.props.history);}}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => {this.props.deleteOneUser(user,this.props.search,"","",this.props.page)}}>
                        Delete
                      </Button>
                    </TableCell>
                    {/* <TableCell><button onClick={() => {this.props.getOneUser(user._id, this.props.history);}}>edit</button></TableCell> */}
                    {/* <TableCell><button onClick={() => {this.props.deleteOneUser(user,this.props.search,"","",this.props.page)}}>delete</button></TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Paper>
    //   <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>avatar</th>
    //         <th onClick={this.handleNameClick}>name</th>
    //         <th onClick={this.handleSexClick}>sex</th>
    //         <th onClick={this.handleRankClick}>rank</th>
    //         <th onClick={this.handleDateClick}>StartDate</th>
    //         <th>Phone</th>
    //         <th>Email</th>
    //         <th>Superior</th>
    //         <th>DS</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {this.props.userList.data.map((user) => {
    //         return(
    //           <tr key={user._id}>
    //             <TableCell>{(user.Avatar !== "") && <img src={require(`../../../../src/server/${user.Avatar}`)} style={{height:"50px",width:"50px"}}alt=""/>}</TableCell>
    //             <TableCell>{user.Name}</TableCell>
    //             <TableCell>{user.Sex}</TableCell>
    //             <TableCell>{user.Rank}</TableCell>
    //             <TableCell>{user.StartDate}</TableCell>
    //             <TableCell><a href={`tel:${user.Phone}`}>{user.Phone}</a></TableCell>
    //             <TableCell><a href={`mailto:${user.Email}`}>{user.Email}</a></TableCell>
    //             <TableCell onClick={() => this.props.getListOne(user.Superior)}>{
    //               this.getname(user.Superior)}</TableCell>
    //             <TableCell onClick={() => this.props.getDS(user._id)}>{user.DS.length}</TableCell>
    //             <TableCell><button onClick={() => {this.props.getOneUser(user._id, this.props.history);}}>edit</button></TableCell>
    //             <TableCell><button onClick={() => {this.props.deleteOneUser(user,this.props.search,"","",this.props.page)}}>delete</button></TableCell>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>
    );
  }
}
export default UserList;