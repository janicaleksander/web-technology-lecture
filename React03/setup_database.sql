-- Tworzenie nowego schematu
CREATE SCHEMA IF NOT EXISTS zadanie3;

-- Ustawienie ścieżki wyszukiwania
SET search_path TO zadanie3;

-- Usunięcie istniejących tabel (jeśli istnieją)
DROP TABLE IF EXISTS zadanie3.animals CASCADE;
DROP TABLE IF EXISTS zadanie3.users CASCADE;

-- Tworzenie tabeli users (właściciele)
CREATE TABLE zadanie3.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tworzenie tabeli animals (zwierzęta)
CREATE TABLE zadanie3.animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    age INTEGER,
    description TEXT,
    owner_id INTEGER UNIQUE NOT NULL,  -- UNIQUE zapewnia relację 1:1
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES zadanie3.users(id)
        ON DELETE CASCADE
);

-- Dodanie przykładowych danych
INSERT INTO zadanie3.users (name, email, phone, address) VALUES
    ('Jan Kowalski', 'jan.kowalski@email.com', '123-456-789', 'ul. Kwiatowa 5, Warszawa'),
    ('Anna Nowak', 'anna.nowak@email.com', '987-654-321', 'ul. Słoneczna 12, Kraków'),
    ('Piotr Wiśniewski', 'piotr.wisniewski@email.com', '555-123-456', 'ul. Leśna 8, Gdańsk'),
    ('Maria Kowalczyk', 'maria.kowalczyk@email.com', '444-555-666', 'ul. Parkowa 3, Wrocław');

INSERT INTO zadanie3.animals (name, species, age, description, owner_id) VALUES
    ('Burek', 'Pies', 5, 'Przyjazny golden retriever', 1),
    ('Mruczek', 'Kot', 3, 'Szary kot perski', 2),
    ('Reksio', 'Pies', 7, 'Energiczny border collie', 3),
    ('Puszek', 'Kot', 2, 'Biały kot norweski', 4);

-- Weryfikacja
SELECT 
    a.id as animal_id,
    a.name as animal_name,
    a.species,
    a.age,
    u.name as owner_name,
    u.email as owner_email
FROM zadanie3.animals a
JOIN zadanie3.users u ON a.owner_id = u.id
ORDER BY a.id;
