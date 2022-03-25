create database Respuestas;
use Respuestas;

create table Users(
IdUser int primary key auto_increment,
UserName varchar(50) not null,
FullName varchar(50) not null,
Password varchar(100) not null,
Email varchar(50) not null
);

create table Categorias(
IdCategoria int primary key auto_increment,
Nombre varchar(50) not null
);

create table Problemas(
IdProblema int primary key auto_increment,
Titulo varchar(50) not null,
Descripcion varchar(250) not null,
Imagen varchar(50),
FkIdUser int not null,
Foreign Key (FkIdUser) REFERENCES Users(IdUser)
);

create table Comentarios(
IdComentario int primary key auto_increment,
Comentario varchar(200) not null,
FkIdProblema int not null,
FkIdUser int not null,
Foreign Key (FkIdUser) REFERENCES Users(IdUser),
Foreign Key (FkIdProblema) REFERENCES Problemas(IdProblema)
);

create table ProblemasCategorias(
FkIdProblema int not null,
FkIdCategoria int not null,
primary key(FkIdProblema,FkIdCategoria),
Foreign Key (FkIdProblema) REFERENCES Problemas(IdProblema),
Foreign Key (FkIdCategoria) REFERENCES Categorias(IdCategoria)
);