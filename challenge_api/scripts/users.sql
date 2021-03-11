CREATE TABLE users (
    username varchar(50) NOT NULL,
    credential varchar(250) NOT NULL,
    CONSTRAINT users_pk primary key (username)
);