users='''
create table users (
userId varchar(255) primary key,
userName varchar(255),
email varchar(255),
password varchar(255),
gender varchar(10)
);
'''

parameters='''
create table parameters(
parameterId varchar(255) primary key,
weight DECIMAL(5,3),
height DECIMAL(5,2),
date date,
userId varchar(255),
foreign key (userId) references users(userId)
);
'''

exercises='''
CREATE TABLE exercises (
    exerciseId varchar(255) PRIMARY KEY,
    userId varchar(255) NOT NULL,
    exerciseName varchar(255) NOT NULL,
    duration varchar(255),
    distance varchar(255),
    calories DECIMAL(10,2),
    achievement BOOLEAN DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(userId)
);
'''

workouts='''
CREATE TABLE workouts (
  workoutId varchar(255) PRIMARY KEY,
  userid varchar(255) NOT NULL,
  workoutName VARCHAR(255) ,
  reps INT,
  weight INT,
  date DATE,
  achievement BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
'''

