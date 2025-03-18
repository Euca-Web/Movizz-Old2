-- Création de la base de données
DROP DATABASE IF EXISTS Movizz;
CREATE DATABASE Movizz;

-- -- Table : Genres
CREATE TABLE Movizz.gender (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_name VARCHAR(50) NOT NULL UNIQUE
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

-- Table : Historique des vues
CREATE TABLE Movizz.views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT,
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

INSERT INTO Movizz.comments (user_id, content, movie_id, created_at) VALUES
(1, 'Un chef-d’œuvre visuel.', 1, NOW()),
(2, 'Intrigue exceptionnelle, mais un peu longue.', 3, NOW()),
(3, 'Ce film m’a bouleversé.', 5, NOW()),
(4, 'Un peu surestimé selon moi.', 6, NOW()),
(5, 'Une expérience immersive et captivante.', 9, NOW()),
(6, 'La série est incroyable du début à la fin.', NULL, NOW()),
(7, 'Personnages bien développés, mais une saison de trop.', NULL, NOW()),
(8, 'C’est la meilleure série que j’ai vue.', NULL, NOW()),
(9, 'L’univers est fascinant.', NULL, NOW()),
(10, 'Les musiques et les décors sont époustouflants.', NULL, NOW()),
(11, 'Un film divertissant, mais classique.', 11, NOW()),
(12, 'L’humour est excellent.', NULL, NOW()),
(13, 'La tension est incroyable.', 20, NOW()),
(14, 'J’ai adoré les twists dans l’histoire.', 13, NOW()),
(15, 'Une série addictive.', NULL, NOW()),
(16, 'Très bien réalisé, mais pas assez original.', NULL, NOW()),
(17, 'Personnages trop clichés.', NULL, NOW()),
(18, 'Un film d’animation magnifique.', 15, NOW()),
(19, 'La série devient meilleure avec chaque saison.', NULL, NOW()),
(20, 'Un final qui laisse à désirer.', 18, NOW());

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

INSERT INTO Movizz.favorites (user_id, movie_id) VALUES
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
