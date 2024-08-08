CREATE TABLE capsules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    thumbnail VARCHAR(255),
    images TEXT[],
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Sample insert to verify table structure
INSERT INTO capsules (title, description, content, thumbnail, images, category)
VALUES (
    'Basic Chemistry',
    'Learn the fundamentals of chemistry with interactive experiments.',
    '<p>This is the Quill editor content.</p>',
    'https://via.placeholder.com/150',
    ARRAY['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    'Chemistry'
);


-- Quiz
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    capsule_id INT REFERENCES capsules(id) ON DELETE CASCADE -- Foreign key to the capsules table
);
-- Option
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE, -- Foreign key to the quizzes table
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE -- Indicates if the option is the correct answer
);

-- Quizes
-- Capsule 8
-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('Basic Quiz on Ohm\'s Law', 8);

-- Insert data into the options table
-- Assume the ID of the quiz we just inserted is 1 (you can get this from your database if using auto-incrementing IDs)
-- Replace 1 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(3, 'Ohms Law states that V = IR', TRUE),
(3, 'Ohms Law states that P = VI', FALSE),
(3, 'Ohms Law states that V = P/I', FALSE),
(3, 'Ohms Law states that R = V/P', FALSE);

-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('Effects of Resistance on Current in Ohm\'s Law', 8);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 2 (you can get this from your database if using auto-incrementing IDs)
-- Replace 2 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(2, 'As resistance increases, current decreases if voltage is constant', TRUE),
(2, 'As resistance increases, current increases if voltage is constant', FALSE),
(2, 'As resistance decreases, current decreases if voltage is constant', FALSE),
(2, 'As resistance decreases, current remains the same if voltage is constant', FALSE);

-- Gravity cap 9
-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('Gravity and Time to Fall', 9);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 3 (you can get this from your database if using auto-incrementing IDs)
-- Replace 3 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(3, 'Objects in free fall near the surface of the Earth accelerate at 9.8 m/s²', TRUE),
(3, 'Objects in free fall near the surface of the Earth accelerate at 10 m/s²', FALSE),
(3, 'The time an object takes to fall is not affected by its mass', TRUE),
(3, 'Objects with more mass fall faster than objects with less mass', FALSE);

-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('Basic Concepts of Gravity', 9);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 4 (you can get this from your database if using auto-incrementing IDs)
-- Replace 4 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(4, 'Gravity is a force that attracts two bodies toward each other', TRUE),
(4, 'Gravity causes objects to move away from each other', FALSE),
(4, 'The strength of gravity depends on the mass of the objects and the distance between them', TRUE),
(4, 'Gravity only affects objects on Earth', FALSE);

-- Atoms
-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('What is the atomic number of Hydrogen and how many protons does it have?', 6);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 5 (you can get this from your database if using auto-incrementing IDs)
-- Replace 5 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(5, 'The atomic number of Hydrogen is 1, and it has 1 proton', TRUE),
(5, 'The atomic number of Helium is 2, and it has 1 proton', FALSE),
(5, 'The atomic number of Carbon is 6, and it has 6 protons', TRUE),
(5, 'The atomic number of Neon is 10, and it has 8 protons', FALSE);

-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('What are the correct ways to declare a variable in JavaScript?', 7);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 7 (you can get this from your database if using auto-incrementing IDs)
-- Replace 7 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(7, 'var myVar = 10;', TRUE),
(7, 'let myVar = 10;', TRUE),
(7, 'const myVar = 10;', TRUE),
(7, 'int myVar = 10;', FALSE);

-- Insert data into the quizzes table
INSERT INTO quizzes (title, capsule_id) 
VALUES ('Which planet in the solar system revolves the fastest?', 7);

-- Insert data into the options table
-- Assuming the ID of the quiz we just inserted is 8 (you can get this from your database if using auto-incrementing IDs)
-- Replace 8 with the actual ID if it's different

INSERT INTO options (quiz_id, option_text, is_correct) 
VALUES 
(8, 'Mercury', TRUE),
(8, 'Earth', FALSE),
(8, 'Mars', FALSE),
(8, 'Saturn', FALSE);

