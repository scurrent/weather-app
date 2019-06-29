
const path = require("path")
const express = require("express")
const app = express()

//getting PORT from what Heroku provides
const port = process.evn.PORT || 3000
//handlebars plugin for express
const hbs = require("hbs")
//tell express this is the view engine we are using
app.set("view engine", "hbs")


const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


console.log(__dirname)
console.log(__filename)
//or
console.log(path.join(__dirname, ".."))
console.log(path.join(__dirname,  "../.."))
console.log(path.join(__dirname, "../public"))


const publicDirPath = path.join(__dirname, "../public")

//views default to root "views" directory - if you want to customize to "templates for example"
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
//customizing your server
app.use(express.static(publicDirPath))
app.set()
//this is a handlebars call
app.get("", (req, res) =>{

    //console.log(" in the handlebar get")

    res.render("index", {
        title: "Weather Fetcher",
        creator: "The Ripper"
    })
})

app.get("/help", (req, res) =>{

    console.log(" in the help get")
    
        res.render("help", {
            title: "The HELP Page",
            message: "What do you need help with today?",
            creator: "The Ripper"
        })
    })

    app.get("/about", (req, res) =>{
        
        res.render("about", {
            title: "The About Page",
            message: "About me",
            creator: "The Ripper"
        })
    })

    app.get("/weather", (req, res) =>{
        if(!req.query.address){
            return res.send({
                error: "no address was provided"
            }) 
            
        }
        //   = {}   default
        geocode(req.query.address, (error, {lat, long, locationName} = {})=>{
            if(error){
                return res.send({error})
            }
            //forecast(lat, long, (error, {forcastData})=>{
            forecast(long, lat, (error, forecastData) => {    

                console.log(forecastData)
                if(error){
                    return res.send({error})
                }
                res.send({
                    location: locationName,
                    address: req.query.address,
                    forcastData: forecastData,
                    greeting: "have a nice day!"
                })
        })
     })
      




    })

    app.get("/products", (req, res) =>{
        if(!req.query.search){
               return res.send({
                   error: "no search term provided"
               }) 
               
        }
           console.log(req.query.search)
        res.send( {
            products:[]
        })
    })

//app.com   --> show them something
//app.com/help
//app.com/about
// these are routes


/*will never get called after the "app.use"
app.get("", (req , res) => {
    //function for homepage
    res.send("Cha cha home express!")
})

app.get("/about", (req , res) => {
    //function for about
    res.send("<t1>About</t1>")
})

app.get("/help", (req , res) => {
    //function for help
    res.send("<t1>Help</t1>")
})
*/

//start the server - do this once

//404 handling
app.get("/help/*", (req, res)=>{
    res.send("ho help found for that")
})

app.get("*", (req, res) => {
    //res.send("404 Dude!")
    res.render("404", {
        title: "404",
        message: "PAGE not FOUND",
        creator: "404 writer    "
    })
})

app.listen(port, () =>{
    console.log("The server is up on " + port)

})
