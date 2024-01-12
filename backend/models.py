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
