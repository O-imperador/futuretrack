-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 03:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futuretrack_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `career` varchar(255) DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roadmaps`
--

CREATE TABLE `roadmaps` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `career` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roadmaps`
--

INSERT INTO `roadmaps` (`id`, `user_id`, `career`, `description`, `date`, `data`) VALUES
(4, 11, 'Biotechnologist', 'Design, develop and test new technologies for biopharmaceuticals using living organisms.', '2025-05-03 23:24:11', '{\"career\":\"Biotechnologist\",\"description\":\"Design, develop and test new technologies for biopharmaceuticals using living organisms.\",\"skills\":[\"Research\",\"Analytical thinking\",\"Scientific writing\"],\"education\":[{\"level\":\"Bachelor\'s degree in Biology or related field\",\"focus\":\"Life sciences\"},{\"level\":\"Master’s degree in Biochemistry, Biotechnology, Genetics, etc.\",\"focus\":\"Biotechnology specialization\"}],\"alternativePaths\":[\"Microbiologist\",\"Geneticist\"],\"careerEntry\":[\"Complete undergraduate program\",\"Gain laboratory experience through internships\"],\"careerAdvancement\":[\"Pursue Ph.D. in a relevant field for research opportunities\",\"Obtain certification as an expert biotechnologist (e.g., Certified Industrial Biotechnologist)\"],\"timelineYears\":12}'),
(5, 11, 'Doctor', 'Doctors diagnose and treat illnesses, injuries, and medical conditions to improve patient health. They use medical knowledge, clinical skills, and empathy to provide care in various settings.', '2025-05-04 01:07:23', '{\"career\":\"Doctor\",\"description\":\"Doctors diagnose and treat illnesses, injuries, and medical conditions to improve patient health. They use medical knowledge, clinical skills, and empathy to provide care in various settings.\",\"skills\":[\"Medical Knowledge\",\"Communication\",\"Problem Solving\",\"Empathy\",\"Attention to Detail\"],\"education\":[{\"level\":\"High School\",\"focus\":\"Biology, Chemistry, Physics, Mathematics\"},{\"level\":\"Bachelor\'s Degree\",\"focus\":\"Pre-Medical Studies, Biology, or related field\"},{\"level\":\"Medical School\",\"focus\":\"Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)\"},{\"level\":\"Residency\",\"focus\":\"Specialized training in chosen medical field\"}],\"alternativePaths\":[\"Physician Assistant training for a shorter path\",\"Nursing degree with specialization\",\"Medical research with a PhD\"],\"careerEntry\":[\"Complete clinical rotations during medical school\",\"Pass licensing exams (e.g., USMLE or COMLEX)\",\"Apply for residency programs in your specialty\",\"Network with healthcare professionals\",\"Volunteer in medical settings to gain experience\"],\"careerAdvancement\":[\"Complete residency and pursue fellowship for specialization\",\"Obtain board certification in your specialty\",\"Stay updated with continuing medical education (CME)\",\"Explore leadership roles like chief resident or medical director\",\"Contribute to medical research or teaching\"],\"timelineYears\":8}'),
(6, 11, 'Financial Analyst', 'Analyzes financial data to help organizations make informed business decisions.', '2025-05-04 01:17:33', '{\"career\":\"Financial Analyst\",\"description\":\"Analyzes financial data to help organizations make informed business decisions.\",\"skills\":[\"Analytical thinking\",\"Attention to detail\",\"Communication\"],\"education\":[{\"level\":\"Bachelor\'s Degree\",\"focus\":\"Finance or Economics\"},{\"level\":\"Master’s in Finance\",\"focus\":\"Advanced Financial Analysis\"}],\"alternativePaths\":[\"Financial Planner\",\"Investment Banker\"],\"careerEntry\":[\"Gain experience through internships\",\"Complete a bachelor\'s degree in finance or economics\"],\"careerAdvancement\":[\"Earn additional certifications like CFA\",\"Pursue advanced degrees such as Ph.D. in Finance\"],\"timelineYears\":10}'),
(7, 11, 'Environmental Consultant', 'Assists organizations with environmental compliance, sustainability efforts and resource management.', '2025-05-04 01:20:02', '{\"career\":\"Environmental Consultant\",\"description\":\"Assists organizations with environmental compliance, sustainability efforts and resource management.\",\"skills\":[\"Regulatory knowledge\",\"Risk assessment\",\"Project planning\"],\"education\":[{\"level\":\"Bachelor’s Degree\",\"focus\":\"Sustainability or Environmental Science\"}],\"alternativePaths\":[\"Environmental Technician\",\"Geologist\"],\"careerEntry\":[\"Earn a Bachelor’s in Sustainability/Environmental Science\",\"Obtain relevant certifications (e.g., LEED AP, Certified Professional Energy Auditor)\"],\"careerAdvancement\":[\"Gain industry experience through internships or entry-level positions\",\"Pursue advanced degrees like Master’s/MBA with sustainability focus\",\"Specialize further by obtaining additional qualifications such as Green Building Advisor credentials\"],\"timelineYears\":5}'),
(8, 13, 'Cloud Engineer', 'Responsible for designing, deploying and managing cloud computing systems.', '2025-05-04 01:36:16', '{\"career\":\"Cloud Engineer\",\"description\":\"Responsible for designing, deploying and managing cloud computing systems.\",\"skills\":[\"Infrastructure Management\",\"Networking\",\"Programming (e.g., Python, Java)\",\"Security\"],\"education\":[{\"level\":\"Bachelor\'s Degree\",\"focus\":\"Computer Science or related field\"}],\"alternativePaths\":[\"Cybersecurity Analyst\",\"IT Support Specialist\"],\"careerEntry\":[\"Obtain relevant bachelor\'s degree\",\"Gain experience in IT and cloud platforms like AWS or Azure\",\"Get certified as a Cloud Professional\"],\"careerAdvancement\":[\"Become an experienced systems engineer with specialization in cloud services\",\"Achieve certifications such as Microsoft Certified: Azure Solutions Architect Expert\",\"Advance to senior roles, leading teams on large-scale projects\"],\"timelineYears\":10}');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('J8Qb7xFRTzF0qd2nOya3OCN545Rau3IB', 1746326322, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-05-04T02:24:51.007Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":13}'),
('nmaHI_pYIguuk3v1Z9-zqkYXmhsb_Mu2', 1746324674, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-05-04T01:13:12.169Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":11}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`, `created_at`) VALUES
(11, '1209iyed@gmail.com', 'kasto', '$2b$10$LBE5mj9tVlRrKL4fjXVVy.TzCNYlwOmx.dTx7/2vwvEix1Vup/8CG', 'user', '2025-05-02 12:59:00'),
(12, 'admin@gmail.com', 'admin', '$2b$10$QDn58PNCurVPPZy5vQB8CerGeCxOvYGAv3/XUgZ5BOeSS/ngxk8qm', 'admin', '2025-05-03 21:09:20'),
(13, 'aloulou@gmail.com', 'ELMoudir', '$2b$10$41VvdePdSNbus8Q1bbCyM.JbuhCFipolVi.8TnTEpXNJOWaSn.iyO', 'user', '2025-05-04 01:24:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roadmaps`
--
ALTER TABLE `roadmaps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roadmaps`
--
ALTER TABLE `roadmaps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roadmaps`
--
ALTER TABLE `roadmaps`
  ADD CONSTRAINT `roadmaps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
