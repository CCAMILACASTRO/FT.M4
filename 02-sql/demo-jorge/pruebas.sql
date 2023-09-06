CREATE TABLE personajes
(
    id serial PRIMARY KEY,
    name varchar(30) NOT NULL,
    status varchar(10),
    location integer REFERENCES locations(id)
);

CREATE TABLE locations
(
    id serial PRIMARY KEY,
    name varchar(30) NOT NULL UNIQUE
);



 