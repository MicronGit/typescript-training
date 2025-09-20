-- Databaseと文字コードの指定
USE localdb;
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- データ削除クエリ
DELETE FROM users;

-- ユーザ
INSERT INTO users(id, name, email, password, created_at, updated_at) VALUES
("a85a159d-1931-4d74-8a8d-13bb6c41f6b9", "デフォルトユーザ1", "test01@example.com", "User1!Password", "2025-04-01 00:00:00", "2025-04-01 00:00:00");