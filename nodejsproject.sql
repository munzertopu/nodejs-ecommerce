-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2019 at 06:55 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejsproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(70) NOT NULL,
  `short_desc` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `short_desc`) VALUES
(16, 'Phone & Tablets', 'Latest Phones and Tablets will be available here.'),
(17, 'Mens Fashion', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '),
(18, 'Womens Fashion', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '),
(19, 'Computer & Gaming', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `order_details_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`order_details_id`, `order_id`, `product_id`, `price`, `quantity`) VALUES
(1, 1, 91, 200, 1),
(2, 1, 92, 700, 1),
(3, 2, 91, 200, 1),
(4, 2, 92, 700, 1),
(5, 3, 91, 200, 1),
(6, 3, 91, 200, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderinfo`
--

CREATE TABLE `orderinfo` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_address` varchar(300) NOT NULL,
  `order_date` date NOT NULL,
  `shipping_date` date NOT NULL,
  `order_amount` int(11) NOT NULL,
  `delivery_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderinfo`
--

INSERT INTO `orderinfo` (`id`, `customer_id`, `customer_address`, `order_date`, `shipping_date`, `order_amount`, `delivery_status`) VALUES
(1, 26, 'nikunja 2', '2018-03-18', '0000-00-00', 900, 'pending'),
(2, 26, 'mirpur', '2018-03-18', '2018-03-19', 900, 'pending'),
(3, 26, 'aiub', '2018-03-18', '2018-03-19', 400, 'delivered');

-- --------------------------------------------------------

--
-- Table structure for table `productinfo`
--

CREATE TABLE `productinfo` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `short_desc` varchar(300) NOT NULL,
  `img_path` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productinfo`
--

INSERT INTO `productinfo` (`id`, `category_id`, `title`, `short_desc`, `img_path`, `price`, `stock`) VALUES
(90, 16, 'Asus Zenfone 5', 'Asus Zenfone 5 ZE620KL Android smartphone. Announced Feb 2018. Features 6.2? IPS LCD display, Snapdragon 636 chipset, Dual: 12 MP (f/1.8, 24 mm, 1/2.55?, 1.4 µm, PDAF) + 8 MP primary camera, 8 MP front camera, 3300 mAh battery, 64 GB storage, 6 GB RAM, Corning Gorilla Glass (unspecified version).', '183184106Design-8.jpg', 30000, 10),
(91, 17, 'Mens T-Shirt', 'Good quality mens t shirt', '1831843591 (1).jpg', 200, 50),
(92, 17, 'Mens Pant', 'KEY FEATURES\r\nProduct Type: Jeans\r\nColor: Blue\r\nMain Material: Denim\r\nGender: Men', '1831845921.jpg', 700, 50),
(93, 19, 'Call of Duty - WWII', 'Call of Duty - WWII DVD Disk.', '1831841001 (7).jpg', 500, 100),
(94, 19, 'Laptop', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', '1831845531 (6).jpg', 50000, 50),
(95, 19, 'Apple Monitor', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', '1831843841 (5).jpg', 30000, 50),
(96, 18, 'Blue Saari', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', '1831842781 (2).jpg', 10000, 20),
(97, 18, 'Printed Dress', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', '1831845371 (3).jpg', 1200, 30),
(98, 16, 'Samsung Galaxy S9+', 'Samsung Galaxy S9+ Android smartphone. Announced Feb 2018. Features 6.2? Super AMOLED display, Exynos 9810 Octa chipset, Dual: 12 MP (f/1.5-2.4, 26mm, 1/2.55?, 1.4 µm, Dual Pixel PDAF) + 12MP primary camera, 8 MP front camera, 3500 mAh battery, 648 GB storage, 6 GB RAM, IP68 certified', '1831844521 (8).jpg', 99000, 10);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `user_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `name`, `email`, `password`, `gender`, `user_type_id`) VALUES
(25, 'admin', 'admin', 'admin', 'male', 1),
(26, 'Redoy', 'hmnredoy@gmail.com', '12345', 'male', 2);

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `id` int(11) NOT NULL,
  `type_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`id`, `type_name`) VALUES
(1, 'admin'),
(2, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_unique` (`category_name`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `product_id_fk` (`product_id`),
  ADD KEY `order_datils_fk` (`order_id`);

--
-- Indexes for table `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_fk` (`customer_id`);

--
-- Indexes for table `productinfo`
--
ALTER TABLE `productinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_cat_relation` (`category_id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `em_uniqe` (`email`),
  ADD KEY `user_type_id` (`user_type_id`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orderinfo`
--
ALTER TABLE `orderinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productinfo`
--
ALTER TABLE `productinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `order_datils_fk` FOREIGN KEY (`order_id`) REFERENCES `orderinfo` (`id`),
  ADD CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `productinfo` (`id`);

--
-- Constraints for table `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD CONSTRAINT `order_fk` FOREIGN KEY (`customer_id`) REFERENCES `userinfo` (`id`);

--
-- Constraints for table `productinfo`
--
ALTER TABLE `productinfo`
  ADD CONSTRAINT `product_cat_relation` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `usertypeFK` FOREIGN KEY (`user_type_id`) REFERENCES `usertype` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
