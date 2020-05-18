CREATE DATABASE  IF NOT EXISTS `playitup` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `playitup`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: playitup
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `lane_name` varchar(255) NOT NULL,
  `locality_id` int(11) NOT NULL,
  `pin` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state_name` varchar(255) NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `locality_id` (`locality_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`locality_id`) REFERENCES `locality` (`locality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Niladri Bihar',1,751005,'Bhubaneswar','Odisha'),(2,'Samantarapur',2,751002,'Bhubaneswar','Odisha'),(3,'Badagada',2,751002,'Bhubaneswar','Odisha');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_status`
--

DROP TABLE IF EXISTS `booking_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `booking_status` (
  `booking_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`booking_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_status`
--

LOCK TABLES `booking_status` WRITE;
/*!40000 ALTER TABLE `booking_status` DISABLE KEYS */;
INSERT INTO `booking_status` VALUES (1,'pending'),(2,'active'),(3,'complete'),(4,'cancelled');
/*!40000 ALTER TABLE `booking_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(255) NOT NULL,
  `discount_percentage` float NOT NULL,
  `expiry_data` datetime NOT NULL,
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `court_details`
--

DROP TABLE IF EXISTS `court_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `court_details` (
  `court_id` int(11) NOT NULL AUTO_INCREMENT,
  `field_sports_id` int(11) DEFAULT NULL,
  `court_name` varchar(255) NOT NULL,
  PRIMARY KEY (`court_id`),
  KEY `court_details_ibfk_1` (`field_sports_id`),
  CONSTRAINT `court_details_ibfk_1` FOREIGN KEY (`field_sports_id`) REFERENCES `sports_location_mapping` (`field_sports_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `court_details`
--

LOCK TABLES `court_details` WRITE;
/*!40000 ALTER TABLE `court_details` DISABLE KEYS */;
INSERT INTO `court_details` VALUES (1,3,'court 1'),(2,3,'court 2'),(3,4,'court 1'),(4,4,'court 2'),(5,2,'table 1'),(6,2,'table 2'),(7,5,'court 1'),(8,5,'court 2'),(9,5,'court 3'),(10,5,'court 4'),(11,7,'Table 1'),(12,7,'Table 2'),(13,7,'Table 3'),(14,6,'Table 1'),(15,6,'Table 2'),(16,8,'Pool 1'),(17,9,'Pool 1'),(18,10,'Gym 1'),(19,10,'Gym 2'),(20,11,'Gym 1'),(21,11,'Gym 2');
/*!40000 ALTER TABLE `court_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `court_slot_type_mapping`
--

DROP TABLE IF EXISTS `court_slot_type_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `court_slot_type_mapping` (
  `court_slot_type_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `court_id` int(11) DEFAULT NULL,
  `slot_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`court_slot_type_mapping_id`),
  KEY `court_slot_type_mapping_ibfk_1` (`court_id`),
  KEY `court_slot_type_mapping_ibfk_2` (`slot_type_id`),
  CONSTRAINT `court_slot_type_mapping_ibfk_1` FOREIGN KEY (`court_id`) REFERENCES `court_details` (`court_id`),
  CONSTRAINT `court_slot_type_mapping_ibfk_2` FOREIGN KEY (`slot_type_id`) REFERENCES `slot_type` (`slot_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `court_slot_type_mapping`
--

LOCK TABLES `court_slot_type_mapping` WRITE;
/*!40000 ALTER TABLE `court_slot_type_mapping` DISABLE KEYS */;
INSERT INTO `court_slot_type_mapping` VALUES (1,1,1),(2,2,1),(3,2,2),(4,5,1),(5,6,1),(6,6,2),(7,1,3),(8,5,3),(9,4,1),(10,4,2),(11,3,1),(12,3,3),(13,7,1),(14,7,2),(15,8,1),(16,8,3),(17,9,1),(18,9,2),(19,10,1),(20,11,3),(21,12,1),(22,12,2),(23,13,1),(24,13,3),(25,14,1),(26,14,2),(27,15,1),(28,15,3),(29,16,1),(30,16,2),(31,17,1),(32,17,3),(33,11,1),(34,18,1),(35,18,3),(36,19,1),(37,19,2),(38,20,1),(39,20,3),(40,21,1),(41,21,2);
/*!40000 ALTER TABLE `court_slot_type_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ground_bookings`
--

DROP TABLE IF EXISTS `ground_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ground_bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `user_coupon_id` int(11) NOT NULL,
  `time_of_booking` time NOT NULL,
  `booking_date` date NOT NULL,
  `billing_amount` float NOT NULL,
  `booking_status_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `location_id` (`location_id`),
  KEY `transaction_id` (`transaction_id`),
  KEY `user_coupon_id` (`user_coupon_id`),
  KEY `booking_status_id` (`booking_status_id`),
  CONSTRAINT `ground_bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `ground_bookings_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `sports_location` (`location_id`),
  CONSTRAINT `ground_bookings_ibfk_3` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`),
  CONSTRAINT `ground_bookings_ibfk_5` FOREIGN KEY (`user_coupon_id`) REFERENCES `user_coupons` (`user_coupon_id`),
  CONSTRAINT `ground_bookings_ibfk_6` FOREIGN KEY (`booking_status_id`) REFERENCES `booking_status` (`booking_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ground_bookings`
--

LOCK TABLES `ground_bookings` WRITE;
/*!40000 ALTER TABLE `ground_bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ground_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locality`
--

DROP TABLE IF EXISTS `locality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `locality` (
  `locality_id` int(11) NOT NULL AUTO_INCREMENT,
  `locality_name` varchar(255) NOT NULL,
  PRIMARY KEY (`locality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locality`
--

LOCK TABLES `locality` WRITE;
/*!40000 ALTER TABLE `locality` DISABLE KEYS */;
INSERT INTO `locality` VALUES (1,'Patia'),(2,'Old Town');
/*!40000 ALTER TABLE `locality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment_method` (
  `payment_method_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_method_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_method_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `ratings` float NOT NULL,
  `review` varchar(6535) NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `ground_bookings` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot`
--

DROP TABLE IF EXISTS `slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slot` (
  `slot_id` int(11) NOT NULL AUTO_INCREMENT,
  `slot_start_time` time DEFAULT NULL,
  `slot_end_time` time DEFAULT NULL,
  `slot_duration` int(10) DEFAULT NULL,
  `slot_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `slot_ibfk_1` (`slot_type_id`),
  CONSTRAINT `slot_ibfk_1` FOREIGN KEY (`slot_type_id`) REFERENCES `slot_type` (`slot_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot`
--

LOCK TABLES `slot` WRITE;
/*!40000 ALTER TABLE `slot` DISABLE KEYS */;
INSERT INTO `slot` VALUES (1,'06:00:00','07:00:00',1,1),(2,'07:00:00','08:00:00',1,1),(3,'08:00:00','09:00:00',1,1),(4,'09:00:00','10:00:00',1,1),(5,'10:00:00','11:00:00',1,1),(6,'11:00:00','12:00:00',1,1),(7,'12:00:00','13:00:00',1,1),(8,'13:00:00','14:00:00',1,1),(9,'15:00:00','16:00:00',1,2),(10,'16:00:00','17:00:00',1,2),(11,'17:00:00','18:00:00',1,2),(12,'18:00:00','19:00:00',1,2),(13,'19:00:00','20:00:00',1,2),(14,'20:00:00','21:00:00',1,2),(15,'21:00:00','22:00:00',1,2),(16,'14:00:00','15:00:00',1,2),(17,'14:00:00','15:00:00',1,3),(18,'15:00:00','16:00:00',1,3),(19,'16:00:00','17:00:00',1,3),(20,'17:00:00','18:00:00',1,3),(21,'18:00:00','19:00:00',1,3),(22,'19:00:00','20:00:00',1,3),(23,'20:00:00','21:00:00',1,3),(24,'21:00:00','22:00:00',1,3);
/*!40000 ALTER TABLE `slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot_availability`
--

DROP TABLE IF EXISTS `slot_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slot_availability` (
  `slot_avail_id` int(11) NOT NULL AUTO_INCREMENT,
  `slot_id` int(11) DEFAULT NULL,
  `court_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `availability` bit(1) DEFAULT b'0',
  PRIMARY KEY (`slot_avail_id`),
  KEY `slot_availability_ibfk_1` (`slot_id`),
  KEY `slot_availability_ibfk_2` (`court_id`),
  CONSTRAINT `slot_availability_ibfk_1` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`slot_id`),
  CONSTRAINT `slot_availability_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `court_details` (`court_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_availability`
--

LOCK TABLES `slot_availability` WRITE;
/*!40000 ALTER TABLE `slot_availability` DISABLE KEYS */;
INSERT INTO `slot_availability` VALUES (1,4,4,'2019-07-20','2019-12-20',_binary '\0');
/*!40000 ALTER TABLE `slot_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot_booking_mapping`
--

DROP TABLE IF EXISTS `slot_booking_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slot_booking_mapping` (
  `slot_booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) DEFAULT NULL,
  `slot_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`slot_booking_id`),
  KEY `slot_booking_mapping_ibfk_1` (`booking_id`),
  KEY `slot_booking_mapping_ibfk_2` (`slot_id`),
  CONSTRAINT `slot_booking_mapping_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `ground_bookings` (`booking_id`),
  CONSTRAINT `slot_booking_mapping_ibfk_2` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`slot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_booking_mapping`
--

LOCK TABLES `slot_booking_mapping` WRITE;
/*!40000 ALTER TABLE `slot_booking_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `slot_booking_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot_type`
--

DROP TABLE IF EXISTS `slot_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slot_type` (
  `slot_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `slot_cost` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`slot_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_type`
--

LOCK TABLES `slot_type` WRITE;
/*!40000 ALTER TABLE `slot_type` DISABLE KEYS */;
INSERT INTO `slot_type` VALUES (1,'Type 1',250),(2,'Type 2',300),(3,'Type 3',250);
/*!40000 ALTER TABLE `slot_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sports` (
  `sports_id` int(11) NOT NULL AUTO_INCREMENT,
  `sports_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sports_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (3,'Badminton'),(4,'Snooker'),(5,'Pool'),(6,'Swimming'),(7,'Gym');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports_location`
--

DROP TABLE IF EXISTS `sports_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sports_location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_id` int(11) NOT NULL,
  `ground_name` varchar(255) NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `sports_location_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports_location`
--

LOCK TABLES `sports_location` WRITE;
/*!40000 ALTER TABLE `sports_location` DISABLE KEYS */;
INSERT INTO `sports_location` VALUES (1,1,'Embassy'),(2,2,'Go Bananas'),(3,3,'Gyana'),(4,3,'Udaan Academy'),(5,2,'Six Pockets'),(6,3,'HHI'),(7,2,'New Marrion Hotel'),(8,3,'Knockout Gym'),(9,2,'AD Fitness Gym');
/*!40000 ALTER TABLE `sports_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports_location_mapping`
--

DROP TABLE IF EXISTS `sports_location_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sports_location_mapping` (
  `field_sports_id` int(11) NOT NULL AUTO_INCREMENT,
  `sports_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`field_sports_id`),
  KEY `sports_location_mapping_ibfk_1` (`sports_id`),
  KEY `sports_location_mapping_ibfk_2` (`location_id`),
  CONSTRAINT `sports_location_mapping_ibfk_1` FOREIGN KEY (`sports_id`) REFERENCES `sports` (`sports_id`),
  CONSTRAINT `sports_location_mapping_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `sports_location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports_location_mapping`
--

LOCK TABLES `sports_location_mapping` WRITE;
/*!40000 ALTER TABLE `sports_location_mapping` DISABLE KEYS */;
INSERT INTO `sports_location_mapping` VALUES (1,4,1),(2,4,2),(3,3,3),(4,3,2),(5,3,4),(6,4,5),(7,5,5),(8,6,6),(9,6,7),(10,7,8),(11,7,9);
/*!40000 ALTER TABLE `sports_location_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_address`
--

DROP TABLE IF EXISTS `tournament_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tournament_address` (
  `tournament_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`tournament_address_id`),
  KEY `tournament_id` (`tournament_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `tournament_address_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`tournament_id`),
  CONSTRAINT `tournament_address_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_address`
--

LOCK TABLES `tournament_address` WRITE;
/*!40000 ALTER TABLE `tournament_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournament_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_bookings`
--

DROP TABLE IF EXISTS `tournament_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tournament_bookings` (
  `tournament_booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `tournament_status` varchar(255) NOT NULL,
  PRIMARY KEY (`tournament_booking_id`),
  KEY `tournament_id` (`tournament_id`),
  KEY `user_id` (`user_id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `tournament_bookings_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`tournament_id`),
  CONSTRAINT `tournament_bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `tournament_bookings_ibfk_3` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_bookings`
--

LOCK TABLES `tournament_bookings` WRITE;
/*!40000 ALTER TABLE `tournament_bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournament_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tournaments` (
  `tournament_id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_name` varchar(255) NOT NULL,
  `tournament_data` date NOT NULL,
  `tournament_time` time NOT NULL,
  `prize_amount` float NOT NULL,
  `joing_fee` float NOT NULL,
  `sports_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tournament_id`),
  KEY `sports_id` (`sports_id`),
  CONSTRAINT `tournaments_ibfk_1` FOREIGN KEY (`sports_id`) REFERENCES `sports` (`sports_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_time` datetime DEFAULT NULL,
  `transaction_amount` float DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`payment_method_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) DEFAULT NULL,
  `user_mail` varchar(255) NOT NULL,
  `phone_no` bigint(15) DEFAULT NULL,
  `sex` varchar(7) DEFAULT NULL,
  `user_password` varchar(120) DEFAULT NULL,
  `emergency_contact` bigint(15) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `user_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'Goutam','a@a.com',1234567890,'Male','$2b$10$rLHQF8CT2rilymSp0iIsNuEGPwAjmsXc1rnFYIpqWCV/qgTyqxGJG',1234567890,2),(12,'Goutam','aa@a.com',1234567890,'Female','$2b$10$FNDeyzRKzWcM00dZjLOR/eW8SIp8PtsIM3yZJHqMuwMy0vCOan9IC',1234567890,2),(13,'PARTHA SARATHI SAHOO','partha.jagan96@gmail.com',9348641901,'Female','$2b$10$nataCXWjqnh4WIvL9wXNMuBsub8Ac3clESOXGwKtVvkR3IH2fm6cG',9439811200,2),(14,NULL,'aaaaa@a.com',NULL,NULL,'$2b$10$kqyrHurQooyDxBncqJBVAuQSY.y7HSijkCR7drBfNYj4duymh/5p6',NULL,2),(15,NULL,'aaaaaaaaa@a.com',NULL,NULL,'$2b$10$oGL./ZuxvlVbhb9Kx2Q4SeFt5VgYzNA1JhS1p4g/h.Oq34t0hpL/i',NULL,2),(16,NULL,'aaaaaaaaab@a.com',NULL,NULL,'$2b$10$V.zjUvXKxFkPAkTE5S8u2u6.MS2xLevtyHmf9ajF59Kj9QOqP9R/W',NULL,2),(17,'','qwerty@qw.com',NULL,NULL,NULL,NULL,2),(18,'','qwerty@qw.com',NULL,NULL,NULL,NULL,2),(19,NULL,'aaaaaaaaabbb@a.com',NULL,NULL,'$2b$10$lDv1hKnNyYVvDE.fnEhGF.KEGFEsMXXnGTtvpyj0uuUhP0EQE0jGi',NULL,2),(20,NULL,'aaaaaaaaalkjhg@a.com',NULL,NULL,'$2b$10$19fLR2D.Xbn4dRGs0GBkt.B3ObFQS9nyYalkhaaVFWyFRwp4y/So.',NULL,2),(21,'','',NULL,NULL,NULL,NULL,2),(22,'GG','gg@g.com',NULL,NULL,'$2b$10$tAvz3uXEEZP3tAGuuR8HzOCZZCmFvTl8l.tuS1/roHyNL3jz.g3KO',NULL,2),(23,'asd','hh@a.com',NULL,NULL,'$2b$10$N/7yPn.cIFVpwxPFfWi7VOwRRDF0zX455ixRpHfBralLcS5T9zr7a',NULL,2),(24,'lall','ll@a.com',NULL,NULL,'$2b$10$4/c26/Mrx5Bo8EIghD2aSOZV.k89nZ75Xdc3ZvK3me0J5A5wIx7FO',NULL,2),(25,'ABD','goutam420.giri@gmail.com',NULL,NULL,'$2b$10$G6gO4wgLah6REIRpX/r83uuBvFrqiZmeumipcmVGWHJb6yrBMun6y',NULL,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_coupons`
--

DROP TABLE IF EXISTS `user_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_coupons` (
  `user_coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `coupon_amount` int(11) NOT NULL,
  PRIMARY KEY (`user_coupon_id`),
  KEY `user_id` (`user_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `user_coupons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_coupons_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_coupons`
--

LOCK TABLES `user_coupons` WRITE;
/*!40000 ALTER TABLE `user_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (2,'user'),(3,'admin');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_wallet`
--

DROP TABLE IF EXISTS `user_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_wallet` (
  `wallet_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `wallet_balance` float NOT NULL,
  `wallet_status` varchar(255) NOT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_wallet`
--

LOCK TABLES `user_wallet` WRITE;
/*!40000 ALTER TABLE `user_wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18 10:45:15
