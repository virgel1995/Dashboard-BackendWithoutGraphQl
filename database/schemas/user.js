const mongoose = require("mongoose")

const UserSchemas = new mongoose.Schema({ 
discordId:{
    type:  mongoose.SchemaTypes.String,
    required: true,
    unique: true
},
discordTag:{
    type:  mongoose.SchemaTypes.String,
    required: true,
},
avatar:{
    type: mongoose.SchemaTypes.String,
    required: true,
},
guilds:{
    type:mongoose.SchemaTypes.Array,
    required : true
}

})


module.exports = mongoose.model("User", UserSchemas)