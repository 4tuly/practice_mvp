# База данных для Трекера привычек

## Таблицы и поля

### users (пользователи)
- id (PRIMARY KEY) - SERIAL
- username (VARCHAR(50), NOT NULL, UNIQUE)
- email (VARCHAR(100), NOT NULL, UNIQUE)
- created_at (TIMESTAMP)

### habits (привычки)
- id (PRIMARY KEY) - SERIAL
- user_id (INTEGER) - ссылка на users.id
- name (VARCHAR(100), NOT NULL)
- created_at (TIMESTAMP)

### habit_logs (журнал выполнения)
- id (PRIMARY KEY) - SERIAL
- habit_id (INTEGER) - ссылка на habits.id
- date (DATE, NOT NULL)
- completed (BOOLEAN)

## Связи
- users → habits: 1 ко многим (один пользователь - много привычек)
- habits → habit_logs: 1 ко многим (одна привычка - много записей выполнения)

## SQL-запросы
1. SELECT с WHERE - выбор привычек конкретного пользователя
2. INSERT - добавление новой привычки
3. UPDATE - отметка выполнения привычки
4. DELETE - удаление записей
5. SELECT с JOIN - статистика выполнения привычек
