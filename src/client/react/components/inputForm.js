import React from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { Fragment } from "react";
import { DatePicker } from "@material-ui/pickers";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import "./form.css"
const Ranks = ["General", "Colonel", "Major", "Captain", "Lieutenant", "Warrant Officer", "Sergeant", "Corporal", "Specialist", "Private"];
class InputForm extends React.Component {
  constructor(props){
    super(props);
    this.state={user:{_id:this.props.userdata._id, Avatar: this.props.userdata.Avatar, Name: this.props.userdata.Name,
      Sex: this.props.userdata.Sex, Rank: this.props.userdata.Rank, StartDate: this.props.userdata.StartDate,
      Phone: this.props.userdata.Phone, Email: this.props.userdata.Email, 
      Superior: this.props.userdata.Superior,SuperiorName:this.props.userdata.SuperiorName},oldSuperior:this.props.userdata.Superior};
  }
  componentDidMount() {
    this.setState({user:{...this.state.user, SuperiorName: this.props.userdata.SuperiorName}});
  }
  handleAvatar = (e) => {
    const file = e.target.files[0].name;
    this.setState({user:{...this.state.user, Avatar: file}});
  }
  handleName = (e) => {
    this.setState({user:{...this.state.user, Name: e.target.value}});
  }
  handleSex = (e) => {
    this.setState({user:{...this.state.user, Sex: e.target.value}});
  }
  handleRank = (e) => {
    this.setState({user:{...this.state.user, Rank: e.target.value}});
  }
  handleStartDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setState({user:{...this.state.user, StartDate: `${year}/${month}/${day}`}});
  }
  handlePhone = (e) => {
    this.setState({user:{...this.state.user, Phone: e.target.value}});
  }
  handleEmail = (e) => {
    this.setState({user:{...this.state.user, Email: e.target.value}});
  }
  handleSuperior = (e) => {
    const user = this.props.nameIdList.find((pair) => {
      return pair.id === e.target.value;
    });
    if(user){
      this.setState({user:{...this.state.user, Superior: e.target.value, SuperiorName: user.name}});
      console.log(this.state.user.SuperiorName);
    }else{
      this.setState({user:{...this.state.user, Superior: "", SuperiorName: ""}});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.use === "create"){
      const createUser={Avatar: this.state.user.Avatar, Name: this.state.user.Name,
        Sex: this.state.user.Sex, Rank: this.state.user.Rank, StartDate: this.state.user.StartDate,
        Phone: this.state.user.Phone, Email: this.state.user.Email, 
        Superior: this.state.user.Superior}
      this.props.createOne(createUser, this.props.history);
    }else{
      this.props.updateOne(this.state.user, this.state.oldSuperior, this.state.user.Superior, this.props.history);
    }
  }
  render() {
    // console.log(this.state.user);
    return (
    <div className="whole-container">
      <form className="form-container" onSubmit={this.handleSubmit}>
        <div className="avatar_div">
          <label>avatar</label>
          {(this.state.user.Avatar !== ""&& this.state.user.Avatar !== undefined) && <img src={require(`../../../../src/server/${this.state.user.Avatar}`)} alt=""/>}
          {/* <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="base-upload-input"
            onChange={this.handleAvatar}
          /> */}
          <input
            accept="image/jpeg,image/jpg,image/png"
            onChange={this.handleAvatar}
            style={{display: 'none'}}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </div>
        <div>
          <FormControl>
              <InputLabel htmlFor="component-helper">Name</InputLabel>
              <Input
                id="name-input"
                value={this.state.user.Name}
                onChange={this.handleName}
                aria-describedby="component-helper-text"
              />
          </FormControl>
          <br/>
          <FormControl>
              <InputLabel id="rank-select">Sex</InputLabel>
              <Select
                value={this.state.user.Sex}
                onChange={this.handleSex}
                hidden={false}
              >
                <MenuItem value={"Male"} >Male</MenuItem>
                <MenuItem value={"Female"} >Female</MenuItem>
              </Select>
          </FormControl>
          <br/>
          <FormControl>
              <InputLabel id="rank-select">Rank</InputLabel>
              <Select
                value={this.state.user.Rank}
                onChange={this.handleRank}
                hidden={false}
              >
                {Ranks.map((rank,index) => {
              return (<MenuItem key={index} value={rank} >{rank}</MenuItem>);
            })}
              </Select>
          </FormControl>
          <br/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Fragment>
            <DatePicker
              label="Start Date"
              value={this.state.user.StartDate}
              onChange={this.handleStartDate}
              animateYearScrolling
            />
          </Fragment>
          </MuiPickersUtilsProvider>
          
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.user.StartDate}
                onChange={this.handleStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}
          <br/>
          <FormControl>
              <InputLabel htmlFor="component-helper">Phone</InputLabel>
              <Input
                id="phone-input"
                value={this.state.user.Phone}
                onChange={this.handlePhone}
                aria-describedby="component-helper-text"
              />
          </FormControl>
          <br/>
          <FormControl>
              <InputLabel htmlFor="component-helper">Email</InputLabel>
              <Input
                id="Email-input"
                value={this.state.user.Email}
                onChange={this.handleEmail}
                aria-describedby="component-helper-text"
              />
          </FormControl>
          <br/>
          <FormControl>
              <InputLabel id="demo-simple-select-label">Superior</InputLabel>
              <Select
                value={this.state.user.Superior}
                onChange={this.handleSuperior}
                hidden={false}
              >
                <MenuItem value="" >None</MenuItem>
                {this.props.nameIdList.map((pair,index) => {
              return (<MenuItem key={index} value={pair.id} >{pair.name}</MenuItem>);
            })}
              </Select>
          </FormControl>
          <br/>
          {/* <input type="submit" value="submit" className="submit-button"/> */}
          <input
            style={{display: 'none'}}
            id="submit-button"
            multiple
            type="submit"
          />
          <label htmlFor="submit-button">
            <Button variant="contained" component="span">
              Submit
            </Button>
          </label>
        </div>
      </form>
    </div>
    );
  }
}
export default InputForm;