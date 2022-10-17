const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    console.log(phcData)
    res.render('prehistoric_creatures/index', {myPhc: phcData})
})


router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

router.get('/:idx', (req, res)=>{
    //get prehistoric creatures
   let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
   let phcData = JSON.parse(prehistoric_creatures)
   console.log('This is the req.params object!', req.params)
   let prehistoric_creaturesIndex = parseInt(req.params.idx)
   res.render('prehistoric_creatures/show', {myPhc: phcData[prehistoric_creaturesIndex]})
})

router.post('/', (req, res)=>{
    console.log('This is the req body', req.body)
    res.redirect('/prehistoric_creatures')
})


module.exports = router