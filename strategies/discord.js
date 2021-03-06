const passport = require("passport")
const DiscordStrategy = require("passport-discord")
const User = require("../database/schemas/user")
const Oauth2Creadiantils = require("../database/schemas/Oauth2")
const CryptoJS = require("crypto-js")
const { encrypt } = require("../utils/utils")

passport.serializeUser(
    (user, done) => {
        done(null, user.discordId)
    })
passport.deserializeUser(
    async (discordId, done) => {
        try {
            const user = await User.findOne({ discordId })
            return user ? done(null, user) : done(null, null)
        } catch (error) {
            done(error, null)
            console.error(error.message)
        }
    })


passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["identify", "guilds"],
},
    async (accessToken, refreshToken, profile, done) => {
        const encryptedAccessToken = encrypt(accessToken).toString();
        const encryptedRefreshToken = encrypt(refreshToken).toString();
        const { id, username, discriminator, avatar, guilds } = profile;
        try {
            const findUser = await User.findOneAndUpdate({ discordId: id }, {
                discordTag: `${username}#${discriminator}`,
                avatar, 
                guilds,
            },
                {
                    new: true
                })
            const findCredentials = await Oauth2Creadiantils.findOneAndUpdate({ discordId: id }, {
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
            })
            if (findUser) {
                if (!findCredentials) {
                    const newCredentials = await Oauth2Creadiantils.create({
                        discordId: id,
                        accessToken: encryptedAccessToken,
                        refreshToken: encryptedRefreshToken,
                    })
                }
                console.log("founded it")
                return done(null, findUser)
            } else {
                const newUser = await User.create({
                    discordId: id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds,
                })
                const newCredentials = await Oauth2Creadiantils.create({
                    accessToken: encryptedAccessToken,
                    refreshToken: encryptedRefreshToken,
                    discordId: id,
                })
                return done(null, newUser)
                console.log("created new user and saved it To DataBase")
            }

        } catch (e) {
            done(e, null)
            console.error(e.message)
        }
        console.log("hello from discord file")
    }
))