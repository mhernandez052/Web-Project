
/**Creator: Martin Hernandez
*  File: teamtable.js
*  Function: Lists current volleyball teams in league
**/

import React, { Component } from 'react';
import './style.css';
import PlayerTable from './playertable';

/*
 * Creates the list of all teams in the league
 * @return{<div>} Outputs the tags needed to output the teams in a table as well
 * as the specified playerlist.
 */

class TeamTable extends Component {
  /*
   *  Sets up all values in state that will be needed for function
   * @constructor
   *
   */
  constructor() {
    super();
    this.state = {
      teams: [],
      curTeamID: -1,
      curTeamName: null,
    };
  }

  /*
   *  Initial stats render so that the user can see which Teams exist.
   *
   */
  componentDidMount() {
    fetch('/api/teams')
    .then(res => res.json())
    .then(teams => this.setState({teams:teams},
        () => console.log('Teams fetched...', teams)));
  }
  /*
   *  Prompts the user for which team they want displayed
   *
   */

  selectTeam = () => {
    let searchTeam = prompt("Enter Teamname", "");
    if (searchTeam === null || searchTeam === "") {
      return;
    }
    if (searchTeam.length > 0) {
      searchTeam = searchTeam.charAt(0).toUpperCase() + searchTeam.slice(1);
    }
    let searchID = -1;
    for (let i = 0; i < this.state.teams.length; i++) {
      if (searchTeam === this.state.teams[i].teamName) {
        searchID = this.state.teams[i].id;
        break;
      }
    }
    if (searchID === -1) {
      console.log("Team not Found");
      this.setState({
        curTeamID: searchID,
      });
    }
    else if (searchID !== -1) {
      console.log("Team Found");
      this.setState({
        curTeamID: searchID,
        curTeamName: searchTeam,
      });
    }
  }

  /*
   *  Prompts the user for information about a team they would like to add to
   *  the league.
   */
  addTeam = () => {
    let searchTeam = prompt("Enter New Teamname", "");
    if (searchTeam === null || searchTeam === "") {
      return;
    }
    if (searchTeam.length > 0) {
      searchTeam = searchTeam.charAt(0).toUpperCase() + searchTeam.slice(1);
    }
    let searchID = -1;
    for (let i = 0; i < this.state.teams.length; i++) {
      if (searchTeam === this.state.teams[i].teamName) {
        searchID = this.state.teams[i].id;
        break;
      }
    }

    if (searchID !== -1) {
      console.log("Team Already Exists");
      this.setState({
        curTeamID: searchID,
        curTeamName: searchTeam,
      });
      return;
    }

    else if (searchID === -1) {
      let newTeamState = prompt("Enter Team's State", "");

      if (newTeamState === null || newTeamState.length !== 2) {
        return;
      }
      if (!(/^[a-zA-Z]+$/.test(newTeamState))) {
        return;
      }
      newTeamState = newTeamState.toUpperCase();
      fetch(`/api/addTeam/${searchTeam}/${newTeamState}`)
      .then(res => res.json());
    }
    fetch('/api/teams')
    .then(res => res.json())
    .then(teams => this.setState({teams:teams, curTeamName: searchTeam,},
        () => console.log('Teams refetched...', teams)));
  }

  /*
   *  Removes the specified team and it's players from the list
   *
   */

  removeTeam = () => {
    let searchTeam = prompt("Enter Team Name to Remove", "");
    if (searchTeam === null || searchTeam === "") {
      return;
    }
    if (searchTeam.length > 0) {
      searchTeam = searchTeam.charAt(0).toUpperCase() + searchTeam.slice(1);
    }
    let searchID = -1;
    for (let i = 0; i < this.state.teams.length; i++) {
      if (searchTeam === this.state.teams[i].teamName) {
        searchID = this.state.teams[i].id;
        break;
      }
    }
    if (searchID === -1) {
      console.log("Team not found/Removed");
    }
    else if (searchID !== -1) {
      console.log("Removing Team");
      if (searchID === this.state.curTeamID) {
        this.setState({
          curTeamID: -1,
          curTeamName: "",
        });
      }
      fetch(`/api/removeTeam/${searchID}`)
      .then(res => res.json());
      fetch(`/api/removeTeamPlayers/${searchTeam}`)
      .then(res => res.json());
    }

    fetch('/api/teams')
    .then(res => res.json())
    .then(teams => this.setState({teams:teams},
        () => console.log('Teams refetched...', teams)));
  }

  render() {
    return (
      <div>
      <h2>
      Volleyball Stat Tracker
      </h2>
      <table>
      <tbody>
      <tr>
      <th colSpan = '2'> Team List </th>
      </tr>
      <tr>
      <th>Team Name</th>
      <th>State</th>
      </tr>
      {this.state.teams.map(teams =>
        <tr key = {teams.id} className =
          {this.state.curTeamID === teams.id ? "curTeam" : "notCurTeam"} >
        <td>{teams.teamName}</td>
        <td>{teams.teamState}</td>
        </tr>
      )}
      </tbody>
      </table>
      <button type = "button" onClick = {this.selectTeam}>Select Team</button>
      <button type = "button" onClick = {this.addTeam}>Add Team</button>
      <button type = "button" onClick = {this.removeTeam}>Remove Team</button>
      <div className =
        {this.state.curTeamID === -1 ? "playerListHidden" : "playerListVisible"}>
      <PlayerTable teamName = {this.state.curTeamName}/>
      </div>
      </div>
    )
  }
}



export default TeamTable;
