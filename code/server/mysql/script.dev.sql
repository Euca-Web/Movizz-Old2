-- Création de la base de données
DROP DATABASE IF EXISTS Movizz;
CREATE DATABASE Movizz;

-- -- Table : Genres
CREATE TABLE Movizz.gender (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);


-- Table : Utilisateurs
CREATE TABLE Movizz.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT(NOW())
);


-- Table : Films
CREATE TABLE Movizz.movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    duration INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    director VARCHAR(255),
    FOREIGN KEY(gender_id) REFERENCES gender(gender_id)
);

-- Table : Séries
CREATE TABLE Movizz.series (
    series_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    poster_url VARCHAR(255)
);


-- Table : Association Films <-> Genres
CREATE TABLE Movizz.movie_gender (
    movie_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (movie_id, gender_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE
);

-- Table : Association Séries <-> Genres
CREATE TABLE Movizz.series_gender (
    series_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (series_id, gender_id),
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE
);

 -- Table : Commentaires
CREATE TABLE Movizz.comments (
     comment_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     content TEXT NOT NULL,
     movie_id INT, -- Null si c'est pour une série
     series_id INT, -- Null si c'est pour un film
     created_at DATETIME DEFAULT(NOW()),
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
     FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
     FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
);

-- Table : Historique des vues
CREATE TABLE Movizz.views (
     view_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     -- Null si c'est une série
     movie_id INT,
     -- Null si c'est un film
     series_id INT,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
     FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE,
     FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

 -- Table : Favoris
CREATE TABLE Movizz.favorites (
     favorite_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     movie_id INT,
     series_id INT,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
     FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
     FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
);

-- -- Table : Épisodes des séries
-- -- CREATE TABLE Movizz.episodes (
-- --     episode_id INT AUTO_INCREMENT PRIMARY KEY,
-- --     series_id INT NOT NULL,
-- --     season_number INT NOT NULL,
-- --     episode_number INT NOT NULL,
-- --     title VARCHAR(255),
-- --     duration INT, -- Durée en minutes
-- --     release_date DATE,
-- --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
-- --     FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
-- -- );

INSERT INTO Movizz.users (username, email, password_hash, created_at) VALUES
('admin', 'admin@example.com', 'hashed_admin_password', NOW()), -- Admin
('user1', 'user1@example.com', 'hashed_password1', NOW()),
('user2', 'user2@example.com', 'hashed_password2', NOW()),
('user3', 'user3@example.com', 'hashed_password3', NOW()),
('user4', 'user4@example.com', 'hashed_password4', NOW()),
('user5', 'user5@example.com', 'hashed_password5', NOW()),
('user6', 'user6@example.com', 'hashed_password6', NOW()),
('user7', 'user7@example.com', 'hashed_password7', NOW()),
('user8', 'user8@example.com', 'hashed_password8', NOW()),
('user9', 'user9@example.com', 'hashed_password9', NOW()),
('user10', 'user10@example.com', 'hashed_password10', NOW()),
('user11', 'user11@example.com', 'hashed_password11', NOW()),
('user12', 'user12@example.com', 'hashed_password12', NOW()),
('user13', 'user13@example.com', 'hashed_password13', NOW()),
('user14', 'user14@example.com', 'hashed_password14', NOW()),
('user15', 'user15@example.com', 'hashed_password15', NOW()),
('user16', 'user16@example.com', 'hashed_password16', NOW()),
('user17', 'user17@example.com', 'hashed_password17', NOW()),
('user18', 'user18@example.com', 'hashed_password18', NOW()),
('user19', 'user19@example.com', 'hashed_password19', NOW()),
('user20', 'user20@example.com', 'hashed_password20', NOW());

INSERT INTO Movizz.movies (title, description, release_date, duration, poster_url, trailer_url) VALUES
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

INSERT INTO Movizz.series (title, description, release_date, poster_url) VALUES
('Breaking Bad', 'Un professeur de chimie devient fabricant de drogue.', '2008-01-20', 'https://example.com/breaking-bad.jpg'),
('Stranger Things', 'Un groupe d’amis découvre un monde parallèle.', '2016-07-15', 'https://example.com/stranger-things.jpg'),
('The Witcher', 'Un sorceleur chasse les monstres pour gagner sa vie.', '2019-12-20', 'https://example.com/the-witcher.jpg'),
('Game of Thrones', 'Des familles se disputent le trône de fer.', '2011-04-17', 'https://example.com/game-of-thrones.jpg'),
('The Mandalorian', 'Un chasseur de primes dans l’univers Star Wars.', '2019-11-12', 'https://example.com/mandalorian.jpg'),
('The Office', 'La vie d’employés dans un bureau.', '2005-03-24', 'https://example.com/office.jpg'),
('Friends', 'Les aventures de six amis.', '1994-09-22', 'https://example.com/friends.jpg'),
('Sherlock', 'Les enquêtes du détective Sherlock Holmes.', '2010-07-25', 'https://example.com/sherlock.jpg'),
('Narcos', 'La montée et la chute de Pablo Escobar.', '2015-08-28', 'https://example.com/narcos.jpg'),
('Vikings', 'La vie et les conquêtes des vikings.', '2013-03-03', 'https://example.com/vikings.jpg'),
('Westworld', 'Un parc d’attractions futuriste pour adultes.', '2016-10-02', 'https://example.com/westworld.jpg'),
('The Boys', 'Des anti-héros affrontent les super-héros corrompus.', '2019-07-26', 'https://example.com/the-boys.jpg'),
('Lucifer', 'Le diable ouvre un club à Los Angeles.', '2016-01-25', 'https://example.com/lucifer.jpg'),
('Arrow', 'Un justicier masqué avec un arc.', '2012-10-10', 'https://example.com/arrow.jpg'),
('The Flash', 'Un scientifique acquiert une super vitesse.', '2014-10-07', 'https://example.com/flash.jpg'),
('Peaky Blinders', 'Les aventures d’un gang en Angleterre.', '2013-09-12', 'https://example.com/peaky-blinders.jpg'),
('House of the Dragon', 'La maison Targaryen avant Game of Thrones.', '2022-08-21', 'https://example.com/house-dragon.jpg'),
('The Crown', 'La vie de la reine Elizabeth II.', '2016-11-04', 'https://example.com/the-crown.jpg'),
('The Umbrella Academy', 'Une famille de super-héros dysfonctionnelle.', '2019-02-15', 'https://example.com/umbrella-academy.jpg'),
('Euphoria', 'La vie compliquée d’adolescents.', '2019-06-16', 'https://example.com/euphoria.jpg');

INSERT INTO Movizz.gender (name) VALUES
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

INSERT INTO Movizz.series_gender (series_id, gender_id) VALUES
(1, 4), (1, 12), -- Breaking Bad - Drame, Crime
(2, 3), (2, 5), -- Stranger Things - Science-Fiction, Fantastique
(3, 5), (3, 1), -- The Witcher - Fantastique, Action
(4, 4), (4, 5), -- Game of Thrones - Drame, Fantastique
(5, 3), (5, 2), -- The Mandalorian - Science-Fiction, Aventure
(6, 7), (6, 4), -- The Office - Comédie, Drame
(7, 7), (7, 4), -- Friends - Comédie, Drame
(8, 6), (8, 11), -- Sherlock - Mystère, Thriller
(9, 4), (9, 12), -- Narcos - Drame, Crime
(10, 2), (10, 5), -- Vikings - Aventure, Fantastique
(11, 3), (11, 4), -- Westworld - Science-Fiction, Drame
(12, 1), (12, 6), -- The Boys - Action, Thriller
(13, 4), (13, 6), -- Lucifer - Drame, Thriller
(14, 1), (14, 2), -- Arrow - Action, Aventure
(15, 3), (15, 1), -- The Flash - Science-Fiction, Action
(16, 4), (16, 12), -- Peaky Blinders - Drame, Crime
(17, 15), (17, 4), -- House of the Dragon - Historique, Drame
(18, 4), (18, 15), -- The Crown - Drame, Historique
(19, 5), (19, 3), -- The Umbrella Academy - Fantastique, Science-Fiction
(20, 4), (20, 11); -- Euphoria - Drame, Mystère

INSERT INTO Movizz.comments (user_id, content, movie_id, series_id, created_at) VALUES
(1, 'Un chef-d’œuvre visuel.', 1, NULL, NOW()),
(2, 'Intrigue exceptionnelle, mais un peu longue.', 3, NULL, NOW()),
(3, 'Ce film m’a bouleversé.', 5, NULL, NOW()),
(4, 'Un peu surestimé selon moi.', 6, NULL, NOW()),
(5, 'Une expérience immersive et captivante.', 9, NULL, NOW()),
(6, 'La série est incroyable du début à la fin.', NULL, 1, NOW()),
(7, 'Personnages bien développés, mais une saison de trop.', NULL, 4, NOW()),
(8, 'C’est la meilleure série que j’ai vue.', NULL, 7, NOW()),
(9, 'L’univers est fascinant.', NULL, 2, NOW()),
(10, 'Les musiques et les décors sont époustouflants.', NULL, 10, NOW()),
(11, 'Un film divertissant, mais classique.', 11, NULL, NOW()),
(12, 'L’humour est excellent.', NULL, 6, NOW()),
(13, 'La tension est incroyable.', 20, NULL, NOW()),
(14, 'J’ai adoré les twists dans l’histoire.', 13, NULL, NOW()),
(15, 'Une série addictive.', NULL, 3, NOW()),
(16, 'Très bien réalisé, mais pas assez original.', NULL, 12, NOW()),
(17, 'Personnages trop clichés.', NULL, 8, NOW()),
(18, 'Un film d’animation magnifique.', 15, NULL, NOW()),
(19, 'La série devient meilleure avec chaque saison.', NULL, 9, NOW()),
(20, 'Un final qui laisse à désirer.', 18, NULL, NOW());

INSERT INTO Movizz.views (user_id, movie_id) VALUES
(1, 1),
(2, 3),
(3, 5),
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, 9),
(9, NULL),
(10, 11),
(11, NULL),
(12, 20),
(13, 13),
(14, NULL),
(15, NULL),
(16, NULL),
(17, 15),
(18, NULL),
(19, 18),
(20, NULL);

INSERT INTO Movizz.favorites (user_id, movie_id, series_id) VALUES
(1, 1, NULL),
(2, 3, NULL),
(3, 5, NULL),
(4, NULL, 1),
(5, NULL, 4),
(6, NULL, 7),
(7, NULL, 2),
(8, 9, NULL),
(9, NULL, 10),
(10, 11, NULL),
(11, NULL, 6),
(12, 20, NULL),
(13, 13, NULL),
(14, NULL, 3),
(15, NULL, 12),
(16, NULL, 8),
(17, 15, NULL),
(18, NULL, 9),
(19, 18, NULL),
(20, NULL, 5);
