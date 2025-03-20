-- Création de la base de données
DROP DATABASE IF EXISTS Movizz;
CREATE DATABASE Movizz;

-- Table : Roles utilisateurs
CREATE TABLE Movizz.roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Table : Genres
CREATE TABLE Movizz.gender (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table : Utilisateurs
CREATE TABLE Movizz.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET DEFAULT
);

-- Table : Films
CREATE TABLE Movizz.movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_id INT,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    release_date DATE,
    duration INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    director VARCHAR(255),
    FOREIGN KEY(gender_id) REFERENCES gender(gender_id)
);

-- Table : Association Films <-> Genres
CREATE TABLE Movizz.movie_gender (
    movie_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (movie_id, gender_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE
);

-- Table : Commentaires
CREATE TABLE Movizz.comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    movie_id INT, -- Null si c'est pour une série
    created_at DATETIME DEFAULT(NOW()),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE    
);

-- Table : Favoris
CREATE TABLE Movizz.favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Insertion des données
-- Insertion des rôles
INSERT INTO Movizz.roles (role_id, role_name, description) VALUES
(1, 'user', 'Utilisateur standard avec des droits limités'),
(2, 'admin', 'Administrateur avec tous les droits');

-- Insertion des utilisateurs
INSERT INTO Movizz.users (username, email, password_hash, role_id) VALUES
('admin', 'admin@example.com', '$argon2i$v=19$m=16,t=2,p=1$emFkbXBHQVJzN3U1aWU1Vg$6WMsugKFXLRuacf0AL2zHg', 2), -- Admin --mdp=admin
('user1', 'user1@example.com', '$argon2i$v=19$m=16,t=2,p=1$aHg4V3BrUFV1VklhVEoyVg$MzFRU/mvrilQQkT3dofg9Q', 1); -- Utilisateur standard --mdp=user1

INSERT INTO Movizz.movies (title, summary, release_date, duration, poster_url, trailer_url) VALUES
('Inception', 'Un voleur qui pénètre les rêves pour voler des secrets.', '2010-07-16', 148, 'https://example.com/inception.jpg', 'https://example.com/inception-trailer.mp4'),
('The Matrix', 'Un programmeur découvre la vérité sur sa réalité.', '1999-03-31', 136, 'https://example.com/matrix.jpg', 'https://example.com/matrix-trailer.mp4'),
('Interstellar', 'Un voyage spatial pour sauver l’humanité.', '2014-11-07', 169, 'https://example.com/interstellar.jpg', 'https://example.com/interstellar-trailer.mp4'),
('Avatar', 'Un soldat sur une planète extraterrestre.', '2009-12-18', 162, 'https://example.com/avatar.jpg', 'https://example.com/avatar-trailer.mp4'),
('Titanic', 'Une histoire d’amour sur un bateau légendaire.', '1997-12-19', 195, 'https://example.com/titanic.jpg', 'https://example.com/titanic-trailer.mp4'),
('Joker', 'Origines du célèbre vilain.', '2019-10-04', 122, 'https://example.com/joker.jpg', 'https://example.com/joker-trailer.mp4'),
('The Dark Knight', 'Le chevalier noir affronte le Joker.', '2008-07-18', 152, 'https://example.com/dark-knight.jpg', 'https://example.com/dark-knight-trailer.mp4'),
('Pulp Fiction', 'Histoires entrecroisées de personnages atypiques.', '1994-10-14', 154, 'https://example.com/pulp-fiction.jpg', 'https://example.com/pulp-fiction-trailer.mp4'),
('The Godfather', 'La saga d’une famille mafieuse.', '1972-03-24', 175, 'https://example.com/godfather.jpg', 'https://example.com/godfather-trailer.mp4'),
('Shawshank Redemption', 'L’évasion d’un innocent emprisonné.', '1994-09-23', 142, 'https://example.com/shawshank.jpg', 'https://example.com/shawshank-trailer.mp4'),
('Forrest Gump', 'La vie extraordinaire de Forrest.', '1994-07-06', 142, 'https://example.com/forrest-gump.jpg', 'https://example.com/forrest-gump-trailer.mp4'),
('Fight Club', 'Un groupe secret de combat.', '1999-10-15', 139, 'https://example.com/fight-club.jpg', 'https://example.com/fight-club-trailer.mp4'),
('The Lion King', 'Le parcours d’un lion nommé Simba.', '1994-06-24', 88, 'https://example.com/lion-king.jpg', 'https://example.com/lion-king-trailer.mp4'),
('The Avengers', 'Des super-héros unissent leurs forces.', '2012-05-04', 143, 'https://example.com/avengers.jpg', 'https://example.com/avengers-trailer.mp4'),
('Frozen', 'Deux sœurs et des pouvoirs de glace.', '2013-11-27', 102, 'https://example.com/frozen.jpg', 'https://example.com/frozen-trailer.mp4'),
('Harry Potter', 'Un jeune sorcier découvre ses pouvoirs.', '2001-11-16', 152, 'https://example.com/harry-potter.jpg', 'https://example.com/harry-potter-trailer.mp4'),
('Star Wars', 'Une saga intergalactique.', '1977-05-25', 121, 'https://example.com/star-wars.jpg', 'https://example.com/star-wars-trailer.mp4'),
('The Hobbit', 'Un voyage inattendu.', '2012-12-14', 169, 'https://example.com/hobbit.jpg', 'https://example.com/hobbit-trailer.mp4'),
('Black Panther', 'Un roi africain et ses responsabilités.', '2018-02-16', 134, 'https://example.com/black-panther.jpg', 'https://example.com/black-panther-trailer.mp4'),
('Wonder Woman', 'Une guerrière amazone découvre le monde.', '2017-06-02', 141, 'https://example.com/wonder-woman.jpg', 'https://example.com/wonder-woman-trailer.mp4');

INSERT INTO Movizz.gender (gender_name) VALUES
('Action'),
('Aventure'),
('Science-Fiction'),
('Drame'),
('Fantastique'),
('Thriller'),
('Comédie'),
('Animation'),
('Romance'),
('Horreur'),
('Mystère'),
('Crime'),
('Documentaire'),
('Famille'),
('Historique'),
('Musical'),
('Guerre'),
('Biographie'),
('Sport'),
('Western');

INSERT INTO Movizz.movie_gender (movie_id, gender_id) VALUES
(1, 3), (1, 6), -- Inception - Science-Fiction, Thriller
(2, 3), (2, 1), -- The Matrix - Science-Fiction, Action
(3, 3), (3, 4), -- Interstellar - Science-Fiction, Drame
(4, 3), (4, 2), -- Avatar - Science-Fiction, Aventure
(5, 4), (5, 9), -- Titanic - Drame, Romance
(6, 4), (6, 6), -- Joker - Drame, Thriller
(7, 1), (7, 6), -- The Dark Knight - Action, Thriller
(8, 4), (8, 6), -- Pulp Fiction - Drame, Thriller
(9, 4), (9, 12), -- The Godfather - Drame, Crime
(10, 4), -- Shawshank Redemption - Drame
(11, 4), (11, 9), -- Forrest Gump - Drame, Romance
(12, 4), (12, 6), -- Fight Club - Drame, Thriller
(13, 8), (13, 14), -- The Lion King - Animation, Famille
(14, 1), (14, 3), -- The Avengers - Action, Science-Fiction
(15, 8), (15, 14), -- Frozen - Animation, Famille
(16, 3), (16, 5), -- Harry Potter - Science-Fiction, Fantastique
(17, 3), (17, 2), -- Star Wars - Science-Fiction, Aventure
(18, 3), (18, 2), -- The Hobbit - Science-Fiction, Aventure
(19, 1), (19, 4), -- Black Panther - Action, Drame
(20, 1), (20, 2); -- Wonder Woman - Action, Aventure
