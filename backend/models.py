users='''
create table users (
userId varchar(255) primary key,
userName varchar(255),
email varchar(255),
password varchar(255),
gender varchar(10),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
'''


parameters='''
create table parameters(
parameterId varchar(255) primary key,
weight DECIMAL(5,3),
height DECIMAL(5,2),
date date,
userId varchar(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key (userId) references users(userId) ON DELETE CASCADE
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
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
  achievement BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
'''


diet='''
CREATE TABLE diet (
  dietId varchar(255) PRIMARY KEY,
  userid varchar(255) NOT NULL,
  mealType VARCHAR(255) ,
  protein DECIMAL(10,2),
  calories DECIMAL(10,2),
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
'''


profile='''
CREATE TABLE profile (
    userId VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    latest_height DECIMAL(5,2),
    latest_weight DECIMAL(5,3),
    total_achievements INT,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
'''



