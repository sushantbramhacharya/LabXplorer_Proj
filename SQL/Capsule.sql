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
