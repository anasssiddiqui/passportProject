const db=require('../models');
const user=db.users;
const posts=db.post;
const sequelize = require('sequelize');
const database = require('../db/db');

const crypto = require('crypto');
const FCM = require('fcm-node');

const rating =  db.query(`SELECT IFNULL(AVG(rating), 0) as avg_rating, count(id) as ratings_count  FROM restaurant_ratings as rr WHERE rr.restaurant_id=?`,{
    replacements: [getRestaurant.id],
     model: UserDetails,
    model: RestaurantRating,
    mapToModel: true,
    type: db.QueryTypes.SELECT
  });