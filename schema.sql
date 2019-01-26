-- In Progress. USES MySQL.  

use restaurants_db;

create table ratings (
id integer(10) AUTO_INCREMENT,
yelpName varchar(80) NOT NULL, 	    -- Yelp Restaurant name
longitude DECIMAL(10) NOT NULL,	    -- Yelp Longitude
latitude DECIMAL(10) NOT NULL,	 	-- Yelp Latitude
yelpRating DECIMAL(4) NOT NULL, 	-- Yelp Rating

/* SECOND API */
zomato_Name varchar(80) NOT NULL,	-- Zomato Name
zomato_Rating DECIMAL(4) NOT NULL,	-- Zomato Rating
zomato_latitude DECIMAL(10) NOT NULL, -- Zomato Latitude
zomato_longitude DECIMAL(10) NOT NULL, -- Zomato Longitude

/* THIRD API */
api3Name varchar(80) NOT NULL,
api3Rating DECIMAL(4) NOT NULL,
api3_latitude DECIMAL(10) NOT NULL,
api3_longitude DECIMAL(10) NOT NULL,
PRIMARY KEY(id) -- Primary Key
);