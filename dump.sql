-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: pos-using-ajax
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_set_items`
--

DROP TABLE IF EXISTS `item_set_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_set_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_set_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_set_items_item_set_id_item_id_unique` (`item_set_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_set_items_ibfk_3` FOREIGN KEY (`item_set_id`) REFERENCES `item_sets` (`item_set_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_set_items_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_set_items`
--

LOCK TABLES `item_set_items` WRITE;
/*!40000 ALTER TABLE `item_set_items` DISABLE KEYS */;
INSERT INTO `item_set_items` VALUES (1,1,1,2);
/*!40000 ALTER TABLE `item_set_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_sets`
--

DROP TABLE IF EXISTS `item_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_sets` (
  `item_set_id` int NOT NULL AUTO_INCREMENT,
  `item_set_name` varchar(255) NOT NULL,
  `total_required_space` float NOT NULL DEFAULT '0',
  `total_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`item_set_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_sets`
--

LOCK TABLES `item_sets` WRITE;
/*!40000 ALTER TABLE `item_sets` DISABLE KEYS */;
INSERT INTO `item_sets` VALUES (1,'Test',1000,4000.00,'/uploads/1741370696383-226738939.png');
/*!40000 ALTER TABLE `item_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `item_size` varchar(100) DEFAULT NULL,
  `required_space` float DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `active_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'test','test',2000.00,'250',500,'/uploads/1741368919418-551127735.png',1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 23:53:22
