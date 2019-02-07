const express = require('express')
const { json, urlencoded } = require('body-parser')
const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
  section: String,
  content: [String]
})

const Collection = mongoose.model('collection', collectionSchema)


Collection.remove({}).then(() => {
  Collection.create({
    section: 'intro',
    content: [
      'Think of the way a steady wind blowing across sand creates all kinds of shapes.',
      'The grains self-organise into ripples, waves and dunes. This happens, even though the grains are virtually identical.',
      'And have no knowledge of the shapes they became part of.',
      'But what if all those patterns were to fall into chaos ?'
    ]
  })

})


const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/api', async (req, res) => {
  const all = await Collection.find({}).lean().exec()
  res.status(200).json(all)
})

app.get('/api/:section', async (req, res) => {
  const { section } = req.params
  const data = await Collection.findOne({ section }).lean().exec()
  res.status(200).json(data)
})

mongoose.connect('mongodb://localhost:27017/chaos-theory')
  .then(() => app.listen(5000, () => {
    console.log('server on http://localhost:5000')
  }))
  .catch(console.error)
