import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import * as tf from "@tensorflow/tfjs"
import * as cocossd from "@tensorflow-models/coco-ssd"
import fileUpload from 'express-fileupload'


let app = express()

let myModel
let cocossdModel

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.get('/api/load', async(req, res) => {
    myModel = await tf.loadLayersModel('https://teachablemachine.withgoogle.com/models/kl_Xo84Ur/model.json')
    cocossdModel = await cocossd.load()
    res.status(200).send({msg: 'models loaded'})
})

app.post('/api/photo', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ msg: 'No image uploaded' });
    }
    const image = req.files.image
    res.setHeader('Content-Type', image.mimetype)
    res.send(image.data)
})
// if (!req.files || !req.files.image) {
//     return res.status(400).json({ msg: 'No image uploaded' })
// }
// const image = req.files.image
// res.setHeader('Content-Type', image.mimetype)
// const results = await cocossdModel.detect(image.data)
// res.send(image.data)

app.get('/api/test', async (req, res) => {
    res.status(200).send({msg: 'CatScan Server'})
})

app.listen(8000, function() {
    console.log('Server started on port 8000')
})