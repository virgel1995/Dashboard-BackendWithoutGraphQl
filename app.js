require("dotenv").config()
require("./strategies/discord")
require("./utils/database");
const express = require("express")
const passport = require("passport")
const app = express()
const PORT = process.env.PORT || 3003
const routes = require("./routes")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors")



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: ["https://grondlebot.virgelroot.repl.co"], credentials: true}))
// { origin: [process.env.Domain], credentials: true})
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000 * 60 * 24 },
  store: MongoStore.create({
    mongoUrl: process.env.mongo_URL,
    autoRemove: 'interval',
    autoRemoveInterval: 60 * 24 // 24 hours = 1 day
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", routes)

app.listen(PORT, () => console.log("Runing on Port " + PORT))