IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'platform')
BEGIN
  CREATE DATABASE platform;
END;