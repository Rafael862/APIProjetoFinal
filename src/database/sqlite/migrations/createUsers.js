const createUsers= `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR,
email VARCHAR,
password VARCHAR,
avatar VARCHAR NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
isAdmin BOOLEAN
);

INSERT INTO users (name, email, password, avatar, created_at, updated_at, isAdmin)
SELECT 'admin', 'admin', '123', null, '31/10/2023', '31/10/2023', true
WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE name = 'admin'  
)

`;
 
module.exports = createUsers;    