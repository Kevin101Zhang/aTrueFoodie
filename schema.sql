-- In Progress. USES MySQL.

use restaurants_db;

create table ratings (
id integer(10) AUTO_INCREMENT,
yelpName varchar(80) NOT NULL,      -- Yelp Restaurant name
yelpRating DECIMAL(4) NOT NULL,     -- Yelp Rating
zomato_Name varchar(80) NOT NULL,   -- Zomato Name
zomato_Rating DECIMAL(4) NOT NULL,  -- Zomato Rating
api3Name varchar(80) NOT NULL,      -- Third Source Name
api3Rating DECIMAL(4) NOT NULL,     -- Third Source Rating
-- Hold Physical address for future searches
physical_Location varchar(100) NOT NULL,
PRIMARY KEY(id) -- Primary Key
);