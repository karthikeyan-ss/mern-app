const mongoose = require("mongoose");
const mongoURI =
  "mongodb://Vismai:foody@ac-samqufw-shard-00-00.xrh9y6i.mongodb.net:27017,ac-samqufw-shard-00-01.xrh9y6i.mongodb.net:27017,ac-samqufw-shard-00-02.xrh9y6i.mongodb.net:27017/GoFoodMERN?ssl=true&replicaSet=atlas-1t09xw-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err,catData){
        if (err) console.log(err);
        else{
          global.food_items = data;
          global.foodCategory = catData;
        }
      })
      // if (err) console.log(err);
      // else{
      //   global.food_items = data;
      // }
    });
  } catch (error) {
    console.error("Error connecting to mongoDB:", error.message);
  }
};

module.exports = mongoDB;
