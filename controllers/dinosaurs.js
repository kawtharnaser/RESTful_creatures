const express = require('express')
const router = express.Router()
const fs = require('fs')
const { stringify } = require('querystring')

router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render('dinosaurs/index', {myDinos: dinoData})
})


router.get('/new', (req, res)=>{
    res.render('dinosaurs/new')
})

router.get('/:idx', (req, res)=>{
    //get dinosaurs
   let dinosaurs = fs.readFileSync('./dinosaurs.json')
   let dinoData = JSON.parse(dinosaurs)
   console.log('This is the req.params object!', req.params)
   let dinoIndex = parseInt(req.params.idx)
   res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res)=>{
    console.log('This is the req body', req.body)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res)=>{
    console.log("This is my request params object", req.params)

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.splice(req.params.idx, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))



    res.redirect('/dinosaurs')
})


router.get('/edit/:idx', (req, res)=>{
    //Grab dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //Display edit page
    res.render('dinosaurs/edit', {
        dino: dinoData[req.params.idx],
        dinoId: req.params.idx
    })
})



router.put('/:dinoId', (req, res)=>{
    // Grab all dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.JSON')
    // Parse JSON data into JS object VVV
    let dinoData = JSON.parse(dinosaurs)
    //update our dinosaurs with form data
    dinoData[req.params.dinoId].name= req.body.name
    dinoData[req.params.dinoId].type= req.body.type
    // update our JSON file with new data
    fs.writeFileSync('./dinosaurs.JSON', JSON.stringify(dinoData))
    //redirect to home page
    res.redirect('/dinosaurs')

})



module.exports = router