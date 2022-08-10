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
      { $set: { capacity: "0" } },
      { upsert: true } 
    );
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
};

module.exports = controller;
