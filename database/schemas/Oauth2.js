const mongoose = require("mongoose")

const OauthSchemas = new mongoose.Schema({ 
accessToken:{
    type:  mongoose.SchemaTypes.String,
    required: true,
},
refreshToken:{
    type: mongoose.SchemaTypes.String,
    required: true,
},
discordId:{
    type:  mongoose.SchemaTypes.String,
    required: true,
},

})


module.exports = mongoose.model("Oauth2Creadiantils", OauthSchemas)