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

const methodOverride = require('method-override')



//to make update and delete requests - doesn't exist in js
app.use(methodOverride('_method'))

//store form data in js object, req.body
app.use(express.urlencoded({extended: false}))

app.use((req, res, next)=>{
    console.log("Our own middleware!")
    console.log(`Request for ${req.method} at ${req.path} `)
    next()
})
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