DROP SCHEMA stat_tracker;
CREATE DATABASE stat_tracker;
USE stat_tracker;
CREATE TABLE team_list (id int AUTO_INCREMENT, teamName varchar(255) NOT NULL UNIQUE, teamState varchar(2) NOT NULL,  PRIMARY KEY (id));
INSERT INTO team_list (teamName, teamState) VALUES ('Robins', 'CA');
INSERT INTO team_list (teamName, teamState) VALUES ('Bears', 'MI');
INSERT INTO team_list (teamName, teamState) VALUES ('Wolves', 'NJ');
CREATE TABLE player_list (id int AUTO_INCREMENT, playerNum int(2) NOT NULL,
  lastName varchar(255) NOT NULL, firstName varchar(255),
  teamName varchar(255) NOT NULL, pointsScored int(5),  PRIMARY KEY (id));
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (2,"McFly", "Marty", "Robins", 10);
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (5,"Garcia", "Juan", "Wolves", 15);
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (20,"Miller", "Mac", "Bears", 60);
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (20,"Red", "Ralph", "Robins", 67);
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (99,"Blue", "Bill", "Bears", 6);
INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored)
  VALUES (1,"White", "Will", "Wolves", 101);
