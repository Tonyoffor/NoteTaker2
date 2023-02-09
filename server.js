const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path")
const fs = require("fs")
const util= require("util")
const readFile= util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const getnotes= ()=>{
    return readFile("db/db.json","utf-8").then(notes =>[].concat(JSON.parse(notes)))
}
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
    
})

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
    
})
app.get("/api/notes", (req,res)=>{
    getnotes().then(notes=>res.json(notes))
})
app.post("/api/notes", (req,res)=>{
    getnotes().then(notes=>{
        let newNote=[...notes,{title:req.body.title,text:req.body.text}]
        writeFile("db/db.json",JSON.stringify(newNote)).then(()=>res.json({msg:"ok"}))
    })
})
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))