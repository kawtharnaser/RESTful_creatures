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
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    phcData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phcData))
    res.redirect('/prehistoric_creatures')
})


router.delete('/:idx', (req, res)=>{
    console.log("This is my request params object", req.params)

    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    phcData.splice(req.params.idx, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phcData))



    res.redirect('/prehistoric_creatures')
})


router.get('/edit/:idx', (req, res)=>{
    //Grab phc data
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    //Display edit page
    res.render('prehistoric_creatures/edit', {
        phc: phcData[req.params.idx],
        phcId: req.params.idx
    })
})



router.put('/:phcId', (req, res)=>{
    // Grab all phc data
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.JSON')
    // Parse JSON data into JS object VVV
    let phcData = JSON.parse(prehistoric_creatures)
    //update our dinosaurs with form data
    phcData[req.params.phcId].type= req.body.type
    phcData[req.params.phcId].img_url= req.body.img_url
    // update our JSON file with new data
    fs.writeFileSync('./prehistoric_creatures.JSON', JSON.stringify(phcData))
    //redirect to home page
    res.redirect('/prehistoric_creatures')

})





module.exports = router