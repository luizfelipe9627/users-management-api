# O CREATE DATABASE cria um novo banco de dados com o nome especificado. O IF NOT EXISTS impede que seja criado o mesmo banco de dados se ele já existir.
CREATE DATABASE IF NOT EXISTS users_management; 

# O use é usado para selecionar um banco de dados existente.
USE users_management;

# DROP TABLE IF EXISTS é usado para eliminar a tabela users se ela já existir.
DROP TABLE IF EXISTS users;

# O CREATE TABLE é usado para criar uma nova tabela no banco de dados. Dentro dos parênteses, você deve especificar os nomes das colunas e os tipos de dados que elas armazenarão.
CREATE TABLE users (
    # Define o id um valor inteiro que como uma chave primária(o id é único para cada linha) e o AUTO_INCREMENT é para que o MySQL gere automaticamente um novo valor para o id sempre que uma nova linha for inserida.
    id INT PRIMARY KEY AUTO_INCREMENT,
    # Define o nome como uma string de até 255 caracteres e não pode ser nulo, ou seja não pode ser vazio.
    name VARCHAR(255) NOT NULL,
    # Define o email como uma string de até 255 caracteres e não pode ser nulo, ou seja não pode ser vazio.
    email VARCHAR(255) NOT NULL,
    # Define o password como uma string de até 255 caracteres e não pode ser nulo, ou seja não pode ser vazio.
    password VARCHAR(255) NOT NULL,
    # Define o token como uma string de até 512 caracteres.
    token VARCHAR(512)
);