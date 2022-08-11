const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");

const controller = {
  editStudiosAmenities: async (req, res) => {
    try {
      const doc = await studioModel.updateMany(
        {},
        { $set: { amenities: ["Showers", "Lockers", "Mats", "Parking"] } },
        { upsert: true }
      );
      console.log(doc);
    } catch (err) {
      res.send(err);
    }
  },
  editDateOfLesson: async (req, res) => {
    const doc = await lessonModel.updateMany(
      {},
      { $set: { time: "17:30 pm" } },
      { upsert: true } 
    );
  },

  editField: async (req, res) => {
    try {
    const doc = await studioModel.updateMany(
      {},
      { $set: { contacts: [
      "contact",
      "website",
      "instagram",
      "facebook"]} },
      { upsert: true } 
      
    );
    console.log(doc);
  } catch (err) {
    res.send(err);
  }
  },

  addStudents: async (req, res) => {
    try {
      const doc = await lessonModel.updateMany(
        { lessonDate: { $lte: Date.now() } },
        { $push: { students: req.params.user_id } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(doc);
    } catch (err) {
      res.send(err);
    }
  },

  addLessons: async (req, res) => {
    try {
      const doc = await studioModel.findAndUpdateOne(
        { name: "Barre 2 Barre" },
        { $push: { lessons: req.params.user_id } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(doc);
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = controller;





