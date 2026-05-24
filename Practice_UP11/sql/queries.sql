SELECT * FROM habits 
WHERE user_id = (SELECT id FROM users WHERE username = 'alex');

INSERT INTO habits (user_id, name) 
VALUES ((SELECT id FROM users WHERE username = 'maria'), 'Привычка');

UPDATE habit_logs 
SET completed = true 
WHERE habit_id = (SELECT id FROM habits WHERE name = 'Привычка 1') 
  AND date = '2026-05-24';

DELETE FROM habit_logs 
WHERE habit_id = (SELECT id FROM habits WHERE name = 'Привычка 3') 
  AND date = '2026-05-25';

SELECT 
    u.username,
    COUNT(DISTINCT h.id) AS total_habits,
    COUNT(hl.id) AS completed_today,
    ROUND(100.0 * COUNT(hl.id) / COUNT(DISTINCT h.id), 2) AS percent_today
FROM users u
JOIN habits h ON u.id = h.user_id
LEFT JOIN habit_logs hl ON h.id = hl.habit_id 
    AND hl.date = CURRENT_DATE 
    AND hl.completed = true
GROUP BY u.id;
