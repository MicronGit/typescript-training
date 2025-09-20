import mysql from 'mysql2/promise';

export const getDatabase = async () =>
  await mysql.createConnection('mysql://root:rootpassword@localhost:3306/localdb');
