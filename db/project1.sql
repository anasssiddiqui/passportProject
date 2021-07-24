-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2021 at 01:31 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project1`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(200) NOT NULL DEFAULT '',
  `%discount` int(11) NOT NULL,
  `commision` varchar(50) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0=>ofline,1=>active,2=>dnd,3=>away',
  `password` varchar(70) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `phone`, `%discount`, `commision`, `banner`, `image`, `status`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Anas siddiqui', 'admin@admin.com', '8816954863', 10, '56', 'image_2021_04_14T10_05_19_736Z.png', '233255ee0b1c9e0407420adfe6ed66d7.jpg', 1, '7c4a8d09ca3762af61e59520943dc26494f8941b', '2021-04-14 13:57:37', '2021-04-14 13:57:37');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `message` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `userid`, `name`, `email`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'rahul', 'rahulwalia@cqlsys.com', 'testing Contentfwefewwwwwwwwwwww', 0, '2020-04-16 10:22:24', '2021-02-01 09:32:04'),
(2, 4, 'rahul', 'rahulwalia@cqlsys.com', 'testing Content', 0, '2020-04-16 10:22:28', '2020-04-16 10:22:28'),
(3, 57, 'anas', 'anas@email.com', 'testing', 0, '2020-08-17 07:21:41', '2020-08-17 07:21:41'),
(4, 57, 'anas', 'anas@email.com', 'testing', 0, '2020-08-17 07:21:49', '2020-08-17 07:21:49'),
(5, 57, 'anas', 'anas@email.com', 'testing', 0, '2020-09-10 11:42:13', '2020-09-10 11:42:13'),
(6, 93, 'Gagan', 'sukh@yopmail.com', 'gsdg', 0, '2020-09-10 12:00:40', '2020-09-10 12:00:40'),
(7, 116, 'pro', 'pro@yopmail.com', 'ngjhg', 0, '2020-09-17 04:39:14', '2020-09-17 04:39:14'),
(8, 127, 'akash', 'akash@yipmail.com', 'test', 0, '2020-09-24 09:05:50', '2020-09-24 09:05:50'),
(9, 134, 'provider', 'provider1@yopmail.com', 'bb', 0, '2020-09-24 10:07:03', '2020-09-24 10:07:03'),
(10, 133, 'Anas siddiqui', 'anassiddiqui544@gmail.com', 'hello', 0, '2020-09-24 12:21:31', '2020-09-24 12:21:31'),
(11, 152, 'ashima', 'ashi@yopmail.com', 'hi', 0, '2020-09-25 06:18:23', '2020-09-25 06:18:23'),
(12, 93, 'teest', 'sukh@yopmail.com', 'dydyfh', 0, '2020-09-25 12:35:19', '2020-09-25 12:35:19'),
(13, 199, 'part', 'part@gmail.com', 'rurufu', 0, '2020-09-25 12:42:56', '2020-09-25 12:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `imagesSection`
--

CREATE TABLE `imagesSection` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `isActive` int(11) NOT NULL,
  `isUsed` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `imagesSection`
--

INSERT INTO `imagesSection` (`id`, `image`, `isActive`, `isUsed`, `created_at`, `updated_at`) VALUES
(4, 'f6eb5d4f-0854-4c1f-a524-0c8d3df96e04.png', 0, 1, '2021-04-27 11:35:07', '2021-06-01 17:08:00'),
(5, 'a7c7bc87-29c6-4d65-920b-f93f3ee7b88b.png', 1, 0, '2021-04-27 11:35:12', '2021-06-01 17:08:00'),
(9, 'a7c7bc87-29c6-4d65-920b-f93f3ee7b88b.png', 0, 0, '2021-04-27 11:35:12', '2021-06-01 17:07:00'),
(10, 'a7c7bc87-29c6-4d65-920b-f93f3ee7b88b.png', 0, 0, '2021-04-27 11:35:12', '2021-06-01 17:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userBy` int(11) NOT NULL,
  `userTo` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `followingId` int(11) DEFAULT NULL,
  `pushType` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userBy`, `userTo`, `message`, `followingId`, `pushType`, `created_at`, `updated_at`) VALUES
(17, 127, 128, 'siddiqui Commented on your post', NULL, 3, '2021-06-01 12:52:59', '2021-06-01 12:52:59'),
(18, 127, 128, 'siddiqui Commented on your post', NULL, 3, '2021-06-01 12:57:20', '2021-06-01 12:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `occupations`
--

CREATE TABLE `occupations` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `occupations`
--

INSERT INTO `occupations` (`id`, `category`, `status`, `created_at`, `updated_at`) VALUES
(12, 'Business Man', 1, '2021-02-01 12:01:36', '2021-04-16 07:35:36'),
(16, 'Normal User', 1, '2021-02-05 15:21:31', '2021-04-16 07:35:24'),
(17, 'singer', 1, '2021-04-14 12:48:31', '2021-04-16 07:35:12'),
(20, 'Actor', 1, '2021-04-14 13:55:33', '2021-05-27 11:07:33');

-- --------------------------------------------------------

--
-- Table structure for table `postComments`
--

CREATE TABLE `postComments` (
  `id` int(11) NOT NULL,
  `parentCommentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postComments`
--

INSERT INTO `postComments` (`id`, `parentCommentId`, `userId`, `postId`, `comment`, `created_at`, `updated_at`) VALUES
(1, 0, 127, 4, 'nice', '2021-04-27 13:23:35', '2021-06-29 14:05:44'),
(6, 0, 127, 3, 'nice post', '2021-05-25 15:06:04', '2021-05-25 15:06:04'),
(28, 0, 127, 3, 'nice post', '2021-05-25 15:06:04', '2021-05-25 15:06:04'),
(29, 1, 127, 4, 'nice post', '2021-05-25 15:06:04', '2021-06-25 10:56:31'),
(31, 28, 127, 3, 'nice post', '2021-05-25 15:06:04', '2021-05-25 15:06:04'),
(34, 1, 131, 4, 'nice newpost', '2021-05-25 15:06:04', '2021-06-29 14:04:08');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `image`, `title`, `description`, `created_at`, `updated_at`) VALUES
(3, 128, '2cf7db9c-c5bf-4a22-b84e-4003067d2bab.png', 'string', 'string', '2021-04-27 12:29:14', '2021-05-25 15:05:38'),
(4, 127, '1620723157409.png', 'tite', 'description', '2021-05-11 08:52:37', '2021-05-11 08:52:37'),
(5, 133, 'http://localhost/', 'string', 'string', '2021-06-29 07:20:50', '2021-06-29 07:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `postsReport`
--

CREATE TABLE `postsReport` (
  `id` int(11) NOT NULL,
  `reportBy` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postsReport`
--

INSERT INTO `postsReport` (`id`, `reportBy`, `postId`, `reason`, `description`, `created_at`, `updated_at`) VALUES
(1, 127, 3, 'bad post', 'nooscascascasc need', '2021-04-29 11:18:01', '2021-04-29 11:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `reportReasons`
--

CREATE TABLE `reportReasons` (
  `id` int(11) NOT NULL,
  `reasons` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reportReasons`
--

INSERT INTO `reportReasons` (`id`, `reasons`, `status`, `created_at`, `updated_at`) VALUES
(12, 'unattractive design', 1, '2021-02-01 12:01:36', '2021-05-27 11:57:00'),
(17, 'bad ui', 1, '2021-04-14 12:48:31', '2021-05-27 11:56:45'),
(20, 'Find another app', 1, '2021-04-14 13:55:33', '2021-06-01 10:59:21');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag`, `image`, `status`, `created_at`, `updated_at`) VALUES
(7, 'xaxaxa', '36859a0d-6338-427c-9f90-f8dd1fb3b6d6.png', 1, '2021-04-16 14:13:56', '2021-04-16 14:13:56'),
(8, 'xaxax', 'f69a2076-603b-4303-84de-b651804be3c1.png', 1, '2021-04-16 14:22:28', '2021-04-16 14:22:28');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(11) NOT NULL,
  `terms_content` text NOT NULL,
  `privacy_policy` text NOT NULL,
  `about_us` text NOT NULL,
  `termsofuse` text NOT NULL,
  `cookiespolicys` text NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `terms_content`, `privacy_policy`, `about_us`, `termsofuse`, `cookiespolicys`, `status`, `created_at`, `updatedAt`) VALUES
(1, '<h2>Terms &amp; Conditions</h2>\r\n\r\n<p><strong>Lorem ip</strong>sum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n\r\n<p>Maecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellentesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.nnnaa</p>\r\n', '<h2>Privacy Policy</h2>\r\n\r\n<p><strong>Lorem ip</strong>sum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n\r\n<p>Maecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellentesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.nnnaa</p>\r\n', '<h2>About us</h2>\r\n\r\n<p><strong>Lorem ip</strong>sum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n\r\n<p>Maecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellentesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.nnnaa</p>\r\n', '<h2>Terms of Use</h2>\r\n\r\n<p><strong>Lorem ip</strong>sum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n\r\n<p>Maecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellentesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.nnnaa</p>\r\n', '<h2>About us</h2>\r\n\r\n<p><strong>Lorem ip</strong>sum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n\r\n<p>Maecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellentesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.nnnaa</p>\r\n', '1', '2019-11-14 11:30:54', '2021-05-27 12:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1 COMMENT '1=>user ,2=>provider',
  `username` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `thumbnail` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `wallet` int(11) NOT NULL,
  `gender` int(11) NOT NULL COMMENT '1=>men,2=>women',
  `forgotPassword` varchar(255) NOT NULL DEFAULT '',
  `countryCode` int(11) NOT NULL DEFAULT 91,
  `socialId` varchar(255) NOT NULL,
  `loginType` int(11) NOT NULL COMMENT 'simplelogin=> 1, facebook=> 2, google=>3,linkedin=>4',
  `notificationStatus` int(11) NOT NULL DEFAULT 1 COMMENT '1=>yes 0=>no',
  `address` varchar(100) NOT NULL,
  `lat` varchar(100) NOT NULL DEFAULT '',
  `lng` varchar(100) NOT NULL DEFAULT '',
  `deviceType` int(11) NOT NULL COMMENT '1:ios,2:android',
  `deviceTokken` varchar(255) NOT NULL,
  `loginPhase` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `username`, `image`, `thumbnail`, `phone`, `email`, `description`, `password`, `wallet`, `gender`, `forgotPassword`, `countryCode`, `socialId`, `loginType`, `notificationStatus`, `address`, `lat`, `lng`, `deviceType`, `deviceTokken`, `loginPhase`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Anas siddiqui', '', '', '', 'anassiddiqui@yopmail.com', '', '$2y$10$nmoaRzAOKxZKcE/AScFp8u4xyWQvkCscIzJ/LWWvIn6EosYncA.gS', 0, 0, '', 91, '', 0, 1, '', '', '', 0, '', 0, 1, '2021-07-24 10:30:01', '2021-07-24 10:30:01'),
(2, 1, 'Anas siddiqui', '', '', '', 'anassiddiqui1@yopmail.com', '', '$2y$10$uIYbParxygOrNtf5i6b4IuN/nVABJWO6zuou2peYeVWHSGVSPcvv.', 0, 0, '', 91, '', 0, 1, '', '', '', 0, '', 0, 1, '2021-07-24 11:04:23', '2021-07-24 11:04:23'),
(3, 1, 'Anas siddiqui', '', '', '', 'anassiddiqui2@yopmail.com', '', '$2y$10$YdO5bPaji6KzrXnYuM.0S.2axiOv.N7nNYsKBetQBFoQ/9HAtk4E.', 0, 0, '', 91, '', 0, 1, '', '', '', 0, '', 0, 1, '2021-07-24 11:19:49', '2021-07-24 11:19:49'),
(4, 1, 'Anas siddiqui', '', '', '', 'anassiddiqui3@yopmail.com', '', '$2y$10$6Y8kPPba6L8fErjQ66Qfwek3V2iJku9XnJslznbHEiETqIlhLvDQa', 0, 0, '', 91, '', 0, 1, '', '', '', 0, '', 0, 1, '2021-07-24 11:20:06', '2021-07-24 11:20:06'),
(5, 1, 'Anas siddiqui', '', '', '', 'anassiddiqui3x@yopmail.com', '', '$2y$10$uKOi2APWguZ23ixCAY7ltOtk0KADDijELfy4FdoYriv/37P9vidOm', 0, 0, '', 91, '', 0, 1, '', '', '', 0, '', 0, 1, '2021-07-24 11:20:59', '2021-07-24 11:20:59');

-- --------------------------------------------------------

--
-- Table structure for table `usersFollowing`
--

CREATE TABLE `usersFollowing` (
  `id` int(11) NOT NULL,
  `userBy` int(11) NOT NULL,
  `userTo` int(11) NOT NULL,
  `isConfirm` int(11) NOT NULL COMMENT '2=>confirm 1=>pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usersFollowing`
--

INSERT INTO `usersFollowing` (`id`, `userBy`, `userTo`, `isConfirm`, `created_at`, `updated_at`) VALUES
(11, 127, 129, 2, '2021-04-28 13:15:44', '2021-04-29 11:50:30'),
(21, 126, 128, 2, '2021-04-28 13:15:44', '2021-04-29 11:50:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagesSection`
--
ALTER TABLE `imagesSection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `occupations`
--
ALTER TABLE `occupations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postComments`
--
ALTER TABLE `postComments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postsReport`
--
ALTER TABLE `postsReport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reportReasons`
--
ALTER TABLE `reportReasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersFollowing`
--
ALTER TABLE `usersFollowing`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `imagesSection`
--
ALTER TABLE `imagesSection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `occupations`
--
ALTER TABLE `occupations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `postComments`
--
ALTER TABLE `postComments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `postsReport`
--
ALTER TABLE `postsReport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reportReasons`
--
ALTER TABLE `reportReasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usersFollowing`
--
ALTER TABLE `usersFollowing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
