var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
    date: {
        type: Date, 
        required: [true, "Date not provided"]
    }, 
    time: {
        type: String,
        unique: [true, "Time already exists in the database"],
        required:[true, "Time not provided"]
    },
    description: {
        type: String, 
        required: [true, "Description not provided"],
    },
    participants: {
        type: String, 
        required: [true, "Participant List not provided"],
    },  
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", EventSchema);