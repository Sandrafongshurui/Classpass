const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// enum Locations {
// Sembawang,
// Woodlands,
// Yishun,
// AngMoKio="Ang Mo Kio",
// Hougang,
// Punggol,
// Sengkang,
// Serangoon,
// Bedok,
// PasirRis="Pasir Ris",
// Tampines,
// BukitBatok ="Bukit Batok",
// BukitPanjang ="Bukit Panjang",
// ChoaChuKang ="Choa Chu Kang",
// Clementi,
// Jurong,
// Bishan,
// BukitMerah="Bukit Merah",
// BukitTimah ="Bukit Timah",
// Geylang,
// Kallang,
// MarineParade ="Marine Parade",
// Queenstown,
// ToaPayoh = "Toa Payoh",
// }

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
  location:[{
    type: String,
    enum: [
      "Woodlands",
      "Yishun",
      "Ang Mo Kio",
      "Hougang",
      "Punggol",
      "Sengkang",
      "Serangoon",
      "Bedok",
      "Pasir Ris",
      "Tampines",
      "Bukit Batok",
      "Bukit Panjang",
      "Choa Chu Kang",
      "Clementi",
      "Jurong",
      "Bishan",
     "Bukit Merah",
     "Bukit Timah",
     "Central Area",
      "Geylang",
      "Kallang",
      "Marine Parade",
      "Queenstown",
      "Toa Payoh"],
    required: true,
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
