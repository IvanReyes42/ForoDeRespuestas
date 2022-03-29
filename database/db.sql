create database Respuestas;
use Respuestas;

create table Users(
IdUser int primary key auto_increment,
UserName varchar(50) not null,
FullName varchar(50) not null,
Password varchar(100) not null,
Email varchar(50) not null
);


create table Problemas(
IdProblema int primary key auto_increment,
Titulo varchar(50) not null,
Descripcion varchar(250) not null,
Imagen varchar(50),
Categorias varchar(100),
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

create table Calificaciones(
FkIdUser int not null,
FkIdComentario int not null,
Calificacion int not null,
primary key(FkIdUser,FkIdComentario),
Foreign key(FkIdUser) REFERENCES Users(IdUser),
Foreign key(FkIdComentario) REFERENCES Comentarios(IdComentario)
);