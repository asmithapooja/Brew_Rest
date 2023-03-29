const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    phonenumber : String,
    secondphonenumber : String,
    adults : String,
    childrens : String,
    emailid : String,
    password : String,
    aadharcard : String,
    dateofcheckin : String,
    checkinTime: String,
    dateofcheckout : String,
    prebookroomprice : String,
    discount:  String,
    advance: String,
    roomno: String,
    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rooms"
    },
    lodge: String,
    channel: {type: String, default: "Walk-In"}
})

module.exports = mongoose.model("Users", userSchema);
