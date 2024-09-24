-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 05:30 PM
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
  `email` varchar(30) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `resume_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `authentication_table`
--

CREATE TABLE `authentication_table` (
  `id` int(11) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_code` varchar(20) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_by` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `record_status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_code` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_by` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
-- Indexes for table `authentication_table`
--
ALTER TABLE `authentication_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applicant` (`user_code`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicant_table`
--
ALTER TABLE `applicant_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `authentication_table`
--
ALTER TABLE `authentication_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authentication_table`
--
ALTER TABLE `authentication_table`
  ADD CONSTRAINT `fk_applicant` FOREIGN KEY (`user_code`) REFERENCES `applicant_table` (`applicant_code`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_code`) REFERENCES `user_table` (`user_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
