-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 22, 2017 at 04:14 AM
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
-- Table structure for table `athletes`
--

CREATE TABLE `athletes` (
  `athleteId` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `sname` varchar(100) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `weight` float NOT NULL,
  `height` float NOT NULL,
  `sex` enum('SEX_UNDEFINED','SEX_MALE','SEX_FEMALE','') NOT NULL DEFAULT 'SEX_UNDEFINED',
  `bday` date NOT NULL,
  `vo2max` LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `athletes`
--

INSERT INTO `athletes` (`athleteId`, `email`, `fname`,`sname`, `pass`,  `weight`, `height`, `sex`, `bday`, `vo2max`) VALUES
(1, 'stratis.vip@gmail.com', 'Στρατής','Χριστοδούλου','$2a$04$Dt0L2iOMb9iev4rD0Cw2pOb63HmYBkd45OitGJyI5BeLRZGsa4sRu',  92.3, 1.73, 'SEX_MALE', '1971-10-21', '{\"running\": 43.1, \"swimming\": 45.6, \"bicycling\": 42.4}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `athletes`
--
ALTER TABLE `athletes`
  ADD PRIMARY KEY (`athleteId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `athletes`
--
ALTER TABLE `athletes`
  MODIFY `athleteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
