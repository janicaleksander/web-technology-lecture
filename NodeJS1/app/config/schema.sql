DROP TABLE IF EXISTS users CASCADE ;
DROP TABLE IF EXISTS CASCADE ;
CREATE TABLE IF NOT EXISTS users (
    id uuid,
    name VARCHAR(63) NOT NULL,
    last_name VARCHAR(63) ,
    email VARCHAR(63)  NOT NULL,
    birthdate DATE NOT NULL,
    PRIMARY KEY(id)
    );

CREATE TABLE IF NOT EXISTS animals (
    id uuid,
    nickname VARCHAR(63) NOT NULL,
    canTricks bool NOT NULL,
    owner uuid,
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE

    )