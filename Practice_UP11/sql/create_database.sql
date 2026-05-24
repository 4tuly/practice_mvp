CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habit_logs (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER NOT NULL,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

INSERT INTO users (username, email) VALUES 
    ('alex', 'alex@example.com'),
    ('maria', 'maria@example.com');

INSERT INTO habits (user_id, name) VALUES 
    (1, 'Привычка 1'),
    (2, 'Привычка 2'),
    (2, 'Привычка 3'),
    (1, 'Привычка 4');

INSERT INTO habit_logs (habit_id, date, completed) VALUES 
    (1, '2025-05-20', true), (1, '2025-05-21', true),
    (1, '2025-05-22', false), (1, '2025-05-23', true), (1, '2025-05-24', true),

    (2, '2025-05-20', true), (2, '2025-05-21', false),
    (2, '2025-05-22', true), (2, '2025-05-23', false), (2, '2025-05-24', true),

    (3, '2025-05-20', true), (3, '2025-05-21', true),
    (3, '2025-05-22', false), (3, '2025-05-23', true), (3, '2025-05-24', false),

    (4, '2025-05-20', true), (4, '2025-05-21', true),
    (4, '2025-05-22', true), (4, '2025-05-23', false), (4, '2025-05-24', true);
