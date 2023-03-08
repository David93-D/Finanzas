-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2023 a las 19:40:02
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_finanzaspersonales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_fi`
--

CREATE TABLE `registros_fi` (
  `id` int(11) NOT NULL,
  `anyo` int(11) NOT NULL,
  `mes` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `concepto` varchar(250) NOT NULL,
  `detalle` varchar(250) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `tipo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registros_fi`
--

INSERT INTO `registros_fi` (`id`, `anyo`, `mes`, `dia`, `concepto`, `detalle`, `cantidad`, `tipo`) VALUES
(25, 2022, 9, 29, 'Alimentación', 'Monster', '20.00', 'Gasto'),
(26, 2022, 10, 19, 'Alimentación', 'Monster Grande', '2.00', 'Gasto'),
(44, 2023, 2, 28, 'Alimentación', 'Estrellitas Hacendado', '1.40', 'Gasto'),
(48, 2022, 12, 28, 'Sueldos y salarios', 'Nomina', '900.00', 'Ingreso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_fi`
--

CREATE TABLE `users_fi` (
  `id` int(11) NOT NULL,
  `user` varchar(25) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(10) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_fi`
--

INSERT INTO `users_fi` (`id`, `user`, `nombre`, `apellidos`, `email`, `role`, `password`) VALUES
(13, 'rambo', 'Jose', 'Lopez Cuadra', 'rambo@gmail.com', 'current', '$2b$12$PI7XRck2xIFpHRYJbzxEhesTCcLA94PU9V4.vmtMdG45jsGNPXUK.'),
(14, 'Laura_22', 'Laura', 'Torregrosa Martinez', 'laura@gmail.com', 'current', '$2b$12$fNyxUmzIWPNqla5Oqju3Z.K3MWmhGeFjnmLlOYGJoFutIdh0gfrRq');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registros_fi`
--
ALTER TABLE `registros_fi`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users_fi`
--
ALTER TABLE `users_fi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registros_fi`
--
ALTER TABLE `registros_fi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `users_fi`
--
ALTER TABLE `users_fi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
