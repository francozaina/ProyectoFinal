USE [master]
GO
/****** Object:  Database [SistemaInternoOrt]    Script Date: 23/10/2023 11:59:31 ******/
CREATE DATABASE [SistemaInternoOrt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SistemaInternoOrt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SistemaInternoOrt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SistemaInternoOrt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SistemaInternoOrt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SistemaInternoOrt] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SistemaInternoOrt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ARITHABORT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SistemaInternoOrt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SistemaInternoOrt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SistemaInternoOrt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET RECOVERY FULL 
GO
ALTER DATABASE [SistemaInternoOrt] SET  MULTI_USER 
GO
ALTER DATABASE [SistemaInternoOrt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SistemaInternoOrt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SistemaInternoOrt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SistemaInternoOrt] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SistemaInternoOrt', N'ON'
GO
ALTER DATABASE [SistemaInternoOrt] SET QUERY_STORE = OFF
GO
USE [SistemaInternoOrt]
GO
/****** Object:  User [PF]    Script Date: 23/10/2023 11:59:32 ******/
CREATE USER [PF] FOR LOGIN [PF] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 23/10/2023 11:59:32 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [PF]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Computadora]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Computadora](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Fila] [int] NOT NULL,
	[Columna] [int] NOT NULL,
	[Lado] [bit] NOT NULL,
	[Funciona] [bit] NOT NULL,
 CONSTRAINT [PK_Computadora] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Laboratorio]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Laboratorio](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Laboratorio] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Objeto]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Objeto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[EnPrestamo] [bit] NOT NULL,
	[Fk_Categoria] [int] NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_Objeto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prestamo]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestamo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[FK_Objeto] [int] NOT NULL,
	[FK_Usuario] [int] NOT NULL,
	[FechaSolicitud] [date] NOT NULL,
	[FechaAceptado] [date] NULL,
	[FechaEntregado] [date] NULL,
	[FechaDevuelto] [date] NULL,
	[FK_Admin] [int] NOT NULL,
 CONSTRAINT [PK_Prestamo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reporte]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reporte](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FK_Computadora] [int] NOT NULL,
	[FK_Usuario] [int] NOT NULL,
	[ObjetoFallo] [varchar](50) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[FechaReportado] [date] NOT NULL,
	[FechaAbierto] [date] NULL,
	[FechaTerminado] [date] NULL,
 CONSTRAINT [PK_Reporte] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 23/10/2023 11:59:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [bit] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Dni] [int] NOT NULL,
	[Clave] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (1, N'Categoria 1')
INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (2, N'Categoria 2')
INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (3, N'Categoria 3')
SET IDENTITY_INSERT [dbo].[Categoria] OFF
GO
SET IDENTITY_INSERT [dbo].[Computadora] ON 

INSERT [dbo].[Computadora] ([Id], [Fila], [Columna], [Lado], [Funciona]) VALUES (1, 2, 3, 1, 0)
INSERT [dbo].[Computadora] ([Id], [Fila], [Columna], [Lado], [Funciona]) VALUES (2, 4, 3, 1, 0)
SET IDENTITY_INSERT [dbo].[Computadora] OFF
GO
SET IDENTITY_INSERT [dbo].[Laboratorio] ON 

INSERT [dbo].[Laboratorio] ([Id], [Nombre]) VALUES (1, N'AMI')
INSERT [dbo].[Laboratorio] ([Id], [Nombre]) VALUES (2, N'CIDI')
INSERT [dbo].[Laboratorio] ([Id], [Nombre]) VALUES (3, N'OTI')
SET IDENTITY_INSERT [dbo].[Laboratorio] OFF
GO
SET IDENTITY_INSERT [dbo].[Objeto] ON 

INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (1, N'Objeto 1', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (2, N'Objeto 2', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (3, N'Objeto 3', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (4, N'Objeto 4', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (5, N'Objeto 5', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (6, N'Objeto 6', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (7, N'Objeto 7', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (8, N'Objeto 8', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (9, N'Objeto 9', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (10, N'Objeto 10', N'Disponible', 0, 1, NULL)
SET IDENTITY_INSERT [dbo].[Objeto] OFF
GO
SET IDENTITY_INSERT [dbo].[Prestamo] ON 

INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (1, N'Pendiente', 1, 1, CAST(N'2023-06-01' AS Date), NULL, NULL, NULL, 1)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (2, N'Aceptado', 2, 2, CAST(N'2023-06-02' AS Date), CAST(N'2023-06-02' AS Date), CAST(N'2023-06-03' AS Date), NULL, 2)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (3, N'Entregado', 3, 3, CAST(N'2023-06-03' AS Date), CAST(N'2023-06-03' AS Date), CAST(N'2023-06-04' AS Date), NULL, 3)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (4, N'Devuelto', 4, 4, CAST(N'2023-06-04' AS Date), CAST(N'2023-06-04' AS Date), CAST(N'2023-06-05' AS Date), CAST(N'2023-06-06' AS Date), 4)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (5, N'Pendiente', 5, 5, CAST(N'2023-06-05' AS Date), NULL, NULL, NULL, 5)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (6, N'Aceptado', 6, 1, CAST(N'2023-06-06' AS Date), CAST(N'2023-06-06' AS Date), CAST(N'2023-06-07' AS Date), NULL, 1)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (7, N'Entregado', 7, 2, CAST(N'2023-06-07' AS Date), CAST(N'2023-06-07' AS Date), CAST(N'2023-06-08' AS Date), NULL, 2)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (8, N'Devuelto', 8, 3, CAST(N'2023-06-08' AS Date), CAST(N'2023-06-08' AS Date), CAST(N'2023-06-09' AS Date), CAST(N'2023-06-10' AS Date), 3)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (9, N'Pendiente', 9, 4, CAST(N'2023-06-09' AS Date), NULL, NULL, NULL, 4)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (10, N'Aceptado', 10, 5, CAST(N'2023-06-10' AS Date), CAST(N'2023-06-10' AS Date), CAST(N'2023-06-11' AS Date), NULL, 5)
SET IDENTITY_INSERT [dbo].[Prestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[Reporte] ON 

INSERT [dbo].[Reporte] ([Id], [FK_Computadora], [FK_Usuario], [ObjetoFallo], [Descripcion], [Estado], [FechaReportado], [FechaAbierto], [FechaTerminado]) VALUES (1, 2, 1, N'mouse', N'No anda el click', N'Resuelto', CAST(N'2023-10-23' AS Date), CAST(N'2023-10-24' AS Date), CAST(N'2023-10-25' AS Date))
INSERT [dbo].[Reporte] ([Id], [FK_Computadora], [FK_Usuario], [ObjetoFallo], [Descripcion], [Estado], [FechaReportado], [FechaAbierto], [FechaTerminado]) VALUES (2, 2, 1, N'teclado', N'No anda la tecla w', N'Resuelto', CAST(N'2023-10-23' AS Date), CAST(N'2023-10-24' AS Date), CAST(N'2023-10-24' AS Date))
INSERT [dbo].[Reporte] ([Id], [FK_Computadora], [FK_Usuario], [ObjetoFallo], [Descripcion], [Estado], [FechaReportado], [FechaAbierto], [FechaTerminado]) VALUES (3, 1, 3, N'monitor', N'No prende', N'Pendiente', CAST(N'2023-10-23' AS Date), NULL, NULL)
INSERT [dbo].[Reporte] ([Id], [FK_Computadora], [FK_Usuario], [ObjetoFallo], [Descripcion], [Estado], [FechaReportado], [FechaAbierto], [FechaTerminado]) VALUES (4, 1, 3, N'mouse', N'No prende', N'Pendiente', CAST(N'2023-10-23' AS Date), NULL, NULL)
INSERT [dbo].[Reporte] ([Id], [FK_Computadora], [FK_Usuario], [ObjetoFallo], [Descripcion], [Estado], [FechaReportado], [FechaAbierto], [FechaTerminado]) VALUES (5, 2, 3, N'mouse', N'No prende', N'Resuelto', CAST(N'2023-10-23' AS Date), CAST(N'2023-10-24' AS Date), CAST(N'2023-10-24' AS Date))
SET IDENTITY_INSERT [dbo].[Reporte] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (1, 1, N'Usuario 1', N'Apellido 1', 4654654, N'hola')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (2, 0, N'Usuario 2', N'Apellido 2', 5465465, N'1234')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (3, 0, N'Usuario 3', N'Apellido 3', 476875, N'5678')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (4, 1, N'Usuario 4', N'Apellido 4', 4643435, N'fede')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (5, 0, N'Usuario 5', N'Apellido 5', 6787686, N'fede')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Objeto]  WITH CHECK ADD  CONSTRAINT [FK_Objeto_Categoria] FOREIGN KEY([Fk_Categoria])
REFERENCES [dbo].[Categoria] ([Id])
GO
ALTER TABLE [dbo].[Objeto] CHECK CONSTRAINT [FK_Objeto_Categoria]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Objeto] FOREIGN KEY([FK_Objeto])
REFERENCES [dbo].[Objeto] ([Id])
GO
ALTER TABLE [dbo].[Prestamo] CHECK CONSTRAINT [FK_Prestamo_Objeto]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Usuario] FOREIGN KEY([FK_Usuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Prestamo] CHECK CONSTRAINT [FK_Prestamo_Usuario]
GO
USE [master]
GO
ALTER DATABASE [SistemaInternoOrt] SET  READ_WRITE 
GO
