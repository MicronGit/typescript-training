import mysql from 'mysql2/promise';

export const getDatabase = async () =>
  // 'mysql://root:rootpassword@localhost:3306/localdb'
  await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'localdb',
    charset: 'utf8mb4',
  });
