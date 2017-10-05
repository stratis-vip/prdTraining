-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 04, 2017 at 08:30 PM
-- Server version: 5.7.17
-- PHP Version: 7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `y60896stra_basetrain`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `athleteId` int(11) NOT NULL,
  `distance` float NOT NULL,
  `totalTime` float NOT NULL,
  `type` enum('Generic','Running','Biking','Transition','FitnessEquipment','Swimming','Walking','Sedentary','All') NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `athleteId`, `distance`, `totalTime`, `type`, `name`) VALUES
(1, 1, 5988.45, 2343.34, 'Running', '2017-10-01T06:45:11.000Z'),
(2, 1, 6003.67, 2620.78, 'Running', '2017-09-27T15:09:53.000Z'),
(3, 1, 30038.5, 4164.1, 'Biking', '2017-09-26T15:55:38.000Z'),
(4, 2, 31017.6, 4345.53, 'Biking', '2017-09-27T17:32:18.000Z'),
(5, 2, 16013.5, 4496.77, 'Running', '2017-09-23T09:14:22.000Z');

-- --------------------------------------------------------

--
-- Table structure for table `athletes`
--

CREATE TABLE `athletes` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `sname` varchar(100) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `weight` float NOT NULL,
  `height` float NOT NULL,
  `sex` enum('SEX_UNDEFINED','SEX_MALE','SEX_FEMALE','') NOT NULL DEFAULT 'SEX_UNDEFINED',
  `bday` date NOT NULL,
  `vo2max` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `athletes`
--

INSERT INTO `athletes` (`id`, `email`, `fname`, `sname`, `pass`, `weight`, `height`, `sex`, `bday`, `vo2max`) VALUES
(1, 'stratis.vip@gmail.com', 'Στρατής', 'Χριστοδούλου', '$2a$04$Dt0L2iOMb9iev4rD0Cw2pOb63HmYBkd45OitGJyI5BeLRZGsa4sRu', 88.3, 1.73, 'SEX_MALE', '1971-10-21', '{\"_swimming\":20,\"_bicycling\":20,\"_running\":20}'),
(2, 'testeme@email.com', 'Αντώνης', 'Μπαλτατζίδης', '$2a$10$R8GxZWTdwLKOZmsb/TJnIOjeX.shNUr4dvodOgi/hdjNc6BeXFUMy', 78.3, 1.87, 'SEX_MALE', '1978-04-30', '{\"_swimming\":20,\"_bicycling\":20,\"_running\":20}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `athletes`
--
ALTER TABLE `athletes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `athletes`
--
ALTER TABLE `athletes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;