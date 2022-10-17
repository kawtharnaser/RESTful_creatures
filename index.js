// import express
const express = require('express')
//create an instance of an express app
const app = express()
//assign a port to have the app listen to
PORT = 3500

//configuring the view engine to use ejs
app.set('view engine', 'ejs')

//import ejsLayout
const ejsLayout = require('express-ejs-layouts')
// MIDDLEWARE of express-ejs-layouts
app.use(ejsLayout)


//store form data in js object, req.body
app.use(express.urlencoded({extended: false}))

//MIDDLEWARE of controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))


//main page route 
app.get('/', (req, res)=>{
    res.redirect('/prehistoric_creatures')
})



//have the app listen to the port
app.listen(PORT, ()=>{
    console.log('App listening on port 3500!')
})