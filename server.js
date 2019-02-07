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
<<<<<<< HEAD

=======
  Collection.create({
    section: 'conclusion',
    content: [
      'And that’s the essence of this story. Unthinking simple rules have the power to create amazingly complex systems whitout any conscious toughts. Just like the ones in sand dunes. In our lungs, our hearts, in weather. And on the geography of our planet. Design do not need an active, interfering designer. It’s an inherent par of the universe.',
      'So what is the ultimate lesson we can take from all of this ? Well it’s that, all the complexity of the universe, all it’s infinite richness Emerges from mindless simple rules, repeated over and over again.',
      'But remember. Powerful tought this process is, it’s also inherently impredictable.',
      'So, although I can confidently tell you that the future will be amazing I can also say, with scientific certainty That I have no idea what it holds.'
    ]
  })
>>>>>>> lea est cool
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
