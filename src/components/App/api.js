const defaultContent = {
  intro: [
    'Think of the way a steady wind blowing across sand creates all kinds of shapes.',
    'The grains self-organise into ripples, waves and dunes. This happens, even though the grains are virtually identical.',
    'And have no knowledge of the shapes they became part of.',
    'But what if all those patterns were to fall into chaos ?'
  ],
  conclusion: [
    'And that’s the essence of this story. Unthinking simple rules have the power to create amazingly complex systems whitout any conscious toughts. Just like the ones in sand dunes. In our lungs, our hearts, in weather. And on the geography of our planet. Design do not need an active, interfering designer. It’s an inherent par of the universe.',
    '',
    'So what is the ultimate lesson we can take from all of this ? Well it’s that, all the complexity of the universe, all it’s infinite richness Emerges from mindless simple rules, repeated over and over again.',
    'But remember. Powerful tought this process is, it’s also inherently impredictable.',
    'So, although I can confidently tell you that the future will be amazing I can also say, with scientific certainty That I have no idea what it holds.'
  ],
  impact: [
    '',
    'Unfortunately, I have to tell you all of this is true. And yet, to be scared of chaos is pointless',
    'It’s woven into the basic laws of physics. And we really all have to accept it as a fact of life.',
    ''
  ]
}

const getContent = async (section) => {
  try {
    const response = await fetch(`/api/${section}`)
    const data = await response.json()
    const { content } = data
    return content
  } catch (e) {
    return defaultContent[section]
  }
}

export { getContent }
