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




module.exports = router