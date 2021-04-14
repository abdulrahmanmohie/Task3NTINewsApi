const express = require('express')
const router = new express.Router()
const Reporter = require('../models/reporter')
const auth = require('../middleware/auth')
const multer = require('multer')

router.post('/reporters',async(req,res)=>{
    const reporter = new Reporter(req.body)
    try{
        await reporter.save()
        const token = await reporter.generateToken()
        res.status(201).send({reporter,token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/reporters/login',async(req,res)=>{
    try{
        const reporter = await Reporter.findByCredentials(req.body.email,req.body.password)
        const token = await reporter.generateToken()
        res.send({reporter,token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/profile',auth,async(req,res)=>{
    res.send(req.reporter)
})
router.get('/reporters',auth,(req,res)=>{
    Reporter.find({}).then((reporters)=>{
        res.status(200).send(reporters)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})
router.get('/reporters/:id',(req,res)=>{
    const _id = req.params.id
    Reporter.findById(_id).then((reporter)=>{
        if(!reporter){
            return res.status(404).send('Cannot find reporter!')
        }
        res.status(200).send(reporter)
    }).caych((e)=>{
        res.status(500).send('connection error!')
    })
})
router.patch('/reporters/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    let isValid = updates.every((element)=> allowedUpdates.includes(element))
    if(!isValid){
        return res.status(400).send('cannot update!')
    }
    const _id = req.params.id
    try{
        const reporter = await Reporter.findById(_id)
        updates.forEach((update)=>(reporter[update] = req.body[update]))
        await reporter.save()
        if(!user){
            return res.send('No reporter found!')
        }
        res.status(200).send(reporter)
    }catch(e){
        res.status(400).send(`Error ${e}`)
    }
})
router.delete('reporters/:id',auth,async(req,res)=>{
    const _id = req. params.id
    try{
        const reporter = await Reporter.findByIdAndDelete(_id)
        if(!reporter){
            return res.send('Not found')
        }
        res.send(reporter)
    }
    catch(e){
        res.send(e)
    }
})
router.post('/logout',auth,async(req,res)=>{
    try{
        req.reporter.tokens = req.reporter.tokens.filter((element)=>{
            return element.token !== req.token
        })

        await req.reporter.save()
        res.send('Logout suceessfully')
    }
    catch(e){
        res.status(500).send('Please login')
    }
})
router.post('/logoutAll',auth,async(req,res)=>{
    try{
        req.reporter.tokens = []
        await req.reporter.save()
        res.send('Logout all was done suceesfully')
    }
    catch(e){
        res.send('Please Login')
    }
})
const uploads = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
           return cb(new Error('Please upload an image'))
        }
       cb(undefined,true)
    }

})
router.post('/profile/avatar',auth,uploads.single('avatar'),async(req,res)=>{
    console
    try{
        req.reporter.avatar = req.file.buffer
        await req.reporter.save()
        res.send()
    }catch(e){
        res.send(e)
    }
})

module.exports = router