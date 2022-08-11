const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// enum: [///at create, the location has to be one of these if not will erroor
//       "Woodlands",
//       "Yishun",
//       "Ang Mo Kio",
//       "Hougang",
//       "Punggol",
//       "Sengkang",
//       "Serangoon",
//       "Bedok",
//       "Pasir Ris",
//       "Tampines",
//       "Bukit Batok",
//       "Bukit Panjang",
//       "Choa Chu Kang",
//       "Clementi",
//       "Jurong",
//       "Bishan",
//      "Bukit Merah",
//      "Bukit Timah",
//      "Central Area",
//       "Geylang",
//       "Kallang",
//       "Marine Parade",
//       "Queenstown",
//       "Toa Payoh"],

//user post man to post back this manner to make sure its working befor using the form
const studiosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact:{
    type: String,
    required: true,
  },
  amenities: [{
    type: String,
    emnum: ["Showers", "Lockers", "Mats", "Parking"]
  }],
  location:[{
    type: String,
    enum: [///at create, the location has to be one of these if not will erroor
      "North",
      "South",
      "East",
      "West",
      "Central",
      ],
    required: true,
  }],
  activities:[{
    type: String,
    enum: [///at create, the location has to be one of these if not will erroor
      "Yoga",
      "Hiit",
      "Martial Arts",
      "Running",
      "Pilates",
      "Boxing",
      "Barre",
      "Cycling",
      "Dance",
      "Outdoors"
      ],
  }],
  socials:[{
    type: String,
    required: true
  }],
  createdBy: {
    type: Schema.Types.ObjectId, //this would be the array of the students dbs
    ref: "User", ///the name it saved in the dbs
  },
  lessonNames:[{
    type: String,
    required: true
  }],
  lessons: [{
    type: Schema.Types.ObjectId, //this would be the array of the students dbs
    ref: "Lesson", ///the name it saved in the dbs
  }],
  reviews: [
    {
      type: Schema.Types.ObjectId, //this would be the array of the students dbs
      ref: "Review", ///the name it saved in the dbs
    },
  ],
  address: {
    type: String,
    required: true,
  },
});

//this creates the product collections
const Studio = mongoose.model("Studio", studiosSchema);

module.exports = Studio;
