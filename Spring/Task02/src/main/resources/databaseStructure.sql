CREATE TABLE IF NOT EXISTS kategoria(
                                        ID SERIAL,
                                        nazwa VARCHAR(255) UNIQUE NOT NULL,
                                        kod VARCHAR(255) UNIQUE NOT NULL,
                                        CONSTRAINT kategoria_pk PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS produkt(
                                      ID SERIAL,
                                      nazwa varchar(255) NOT NULL,
                                      waga FLOAT NOT NULL CHECK ( waga > 0),
                                      cena FLOAT NOT NULL CHECK ( cena > 0),
                                      indeks_produktu  INT UNIQUE NOT NULL,
                                      kategoria INT NOT NULL ,
                                      CONSTRAINT produkt_pk PRIMARY KEY (ID),
                                      CONSTRAINT kategoria_fk FOREIGN KEY (kategoria) REFERENCES kategoria(id) ON DELETE CASCADE
);
