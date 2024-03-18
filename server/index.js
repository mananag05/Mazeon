const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();




app.use(
    cors({
        origin : "http://localhost:3000",
        methods : "GET,POST,PUT,DELETE",
        credentials : true,
        
    })
)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Listening On http:/localhost:${PORT}`)
})