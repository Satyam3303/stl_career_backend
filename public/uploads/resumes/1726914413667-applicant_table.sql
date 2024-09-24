-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 08:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicant_table`
--

CREATE TABLE `applicant_table` (
  `id` int(11) NOT NULL,
  `applicant_code` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `middle_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `mobile_no` bigint(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email_id` varchar(30) DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `father_name` varchar(30) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `plot_no` varchar(20) DEFAULT NULL,
  `locality` varchar(50) DEFAULT NULL,
  `post` varchar(50) DEFAULT NULL,
  `state_district` varchar(50) DEFAULT NULL,
  `pin` varchar(10) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `skill_set` varchar(100) DEFAULT NULL,
  `declaration` text DEFAULT NULL,
  `resume_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicant_table`
--
ALTER TABLE `applicant_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `applicant_code` (`applicant_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicant_table`
--
ALTER TABLE `applicant_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
