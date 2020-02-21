/**Creator: Martin Hernandez
*  File: playertable.js
*  Function: Lists all players on the specified volleyball team
**/

import React, { Component } from 'react';
import './style.css';


/*
 * Creates the list of all players on a specified team in the league
 * @return{<div>} Outputs the tags needed to output the players of the specified
 * team in a table.
 */
class PlayerTable extends Component {
  /*
   *  Sets up all values in state that will be needed for Player Table
   * @parameter(props) Name of specified team that the user has selected to display
   * @constructor
   *
   */
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      curTeamName: this.props.teamName,
    }
  }
  /*
   *  Sets up all values in state that will be needed for Player Table
   * @parameter(props) Name of Team that the user has selected to display
   *
   */
  componentWillReceiveProps(props) {
    this.setState({curTeamName: props.teamName});
    console.log(props);
    if (props.teamName === "") {
      return;
    }
    fetch(`/api/selectPlayers/${props.teamName}`)
    .then(res => res.json())
    .then(players => this.setState({players:players},
        () => console.log('SelectPlayers fetched...', players)));
  }

  /*
   *  Adds a player to the selected team with a intital score of 0
   *
   */
  addPlayer = () => {
    let firstName = prompt("Enter Player First Name", "");
    if (firstName === "" || firstName === null) {
      return;
    }
    let lastName = prompt("Enter Player Last Name", "");
    if (lastName === "" || lastName == null) {
      return;
    }
    let jerseyNumber = prompt("Enter Player Jersey Number(1-99)", "");
    if (jerseyNumber === "" || jerseyNumber === null) {
      return;
    }
    if (jerseyNumber.length > 2) {
      return;
    }
    for (let i = 0; i < jerseyNumber.length; i++) {
      if (isNaN(jerseyNumber[i])) {
        return;
      }
    }
    if (jerseyNumber < 1 || jerseyNumber > 99) {
      return;
    }
    for (let i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].playerNum === jerseyNumber) {
        return;
      }
    }
    fetch(`/api/addPlayer/${jerseyNumber}/${lastName}/${firstName}/${this.state.curTeamName}`)
    .then(res => res.json())

    fetch(`/api/selectPlayers/${this.state.curTeamName}`)
    .then(res => res.json())
    .then(players => this.setState({players:players},
        () => console.log('SelectPlayers fetched...', players)));
  }

  /*
   *  Removes a specific player by thier Jersey Number from the selected team
   *
   */
  removePlayer = () => {
    let jerseyNumber = prompt("Enter Jersey Number of Player to Remove", "");
    if (jerseyNumber === null || jerseyNumber === "") {
      return;
    }
    fetch(`/api/removePlayer/${jerseyNumber}/${this.props.teamName}`)
    .then(res => res.json());
    fetch(`/api/selectPlayers/${this.props.teamName}`)
    .then(res => res.json())
    .then(players => this.setState({players:players},
        () => console.log('SelectPlayers fetched...', players)));
  }

  /*
   *  Updates the score of the specific player on the selected team
   *
   */
  updatePlayer = () => {
    let jerseyNumber = prompt("Enter Jersey Number of Player To Update", "");
    if (jerseyNumber === null || jerseyNumber === "") {
      return;
    }
    let newScore = prompt("Enter New Score Value", "");
    if (newScore === null || newScore === "") {
      return;
    }

    for (let i = 0; i < newScore.length; i++) {
      if (isNaN(newScore[i])) {
        return;
      }
    }
    if (newScore < 0) {
      return;
    }
    fetch(`/api/updateScore/${jerseyNumber}/${this.props.teamName}/${newScore}`)
    .then(res => res.json());

    fetch(`/api/selectPlayers/${this.props.teamName}`)
    .then(res => res.json())
    .then(players => this.setState({players:players},
        () => console.log('SelectPlayers fetched...', players)));
  }

  render() {
    return (
      <div>
      <table>
        <tbody>
          <tr>
            <th colSpan = '4'> Players </th>
          </tr>
          <tr>
            <th>Number</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>FG</th>
          </tr>
          {this.state.players.map(players =>
            <tr key = {players.id} className = "notCurTeam">
            <td>{players.playerNum}</td>
            <td>{players.lastName}</td>
            <td>{players.firstName}</td>
            <td>{players.pointsScored}</td>
            </tr>
          )}
        </tbody>
      </table>
        <button type = "button" onClick = {this.updatePlayer}>
          Update Player Score
        </button>
        <button type = "button" onClick = {this.addPlayer}>
          Add Player
        </button>
        <button type = "button" onClick = {this.removePlayer}>
          Remove Player
        </button>
      </div>
    )
  }
}

export default PlayerTable;
