const app = require("express")();
const http = require("http").createServer(app);
const path = require("path");
const { on } = require("process");
const io = require("socket.io")(http);

io.on("connection", () => {
    console.log("Connected!")
})

// display on screen or raspberry
app.get("/",(req,res)=>{    
    res.sendFile(path.join(__dirname + "/index.html"))

})

// display on staffside control device
app.get("/control",(req,res)=>{
    res.sendFile(path.join(__dirname + "/control.html"))
})

// receive from the controlside and send conmend to the index.html
app.get("/switch", (req, res) => {
    io.emit("switch", "Switch!")

    res.json({
        message: "io.emit.success"
    })
})

// SERVER CONNECTION
http.listen(3030,() =>{       // it could be a cloud server or raspberry  
    console.log("Listening on port 3030...");
})
