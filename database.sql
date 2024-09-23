CREATE DATABASE LSMS;

USE LSMS;

CREATE TABLE usuario (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    datadenasc DATE NOT NULL,
    fone VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    peso DECIMAL(10,2) NOT NULL,
    validade INT NOT NULL,
    marca INT NOT NULL,
    valor INT NOT NULL,
    foto INT NOT NULL,
    dimensões INT NOT NULL,
    material INT NOT NULL
    
);
CREATE TABLE instalação (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    qtdplaca VARCHAR(255) NOT NULL,
    qdtfornecido VARCHAR(255) NOT NULL,
    formadepagam VARCHAR(255) NOT NULL,
    restricao VARCHAR(255) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    equipamentos VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    tempo VARCHAR(255) NOT NULL
);
CREATE TABLE empresa (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    ramo VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone VARCHAR(255) NOT NULL,
    cnpj VARCHAR(255) NOT NULL,
    fundacao VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL

);

CREATE TABLE funcionario (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    fone VARCHAR(255) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    datadenasc VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    tiposanguineo VARCHAR(255) NOT NULL,
    comorbidade VARCHAR(255) NOT NULL,
    medicacao VARCHAR(255) NOT NULL,
    cttemergencia VARCHAR(255) NOT NULL,
    alergia VARCHAR(255) NOT NULL

);
CREATE TABLE ctrlfinanceiro (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    tppagamento VARCHAR(255) NOT NULL,
    ctrlcaixa VARCHAR(255) NOT NULL,
    ctrlmensal VARCHAR(255) NOT NULL,  
    valor VARCHAR(255) NOT NULL 
);
