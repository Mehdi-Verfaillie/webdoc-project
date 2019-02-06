const defaultContent = {
  intro: [
    'Think of the way a steady wind blowing across sand creates all kinds of shapes.',
    'The grains self-organise into ripples, waves and dunes. This happens, even though the grains are virtually identical.',
    'And have no knowledge of the shapes they became part of.',
    'But what if all those patterns were to fall into chaos ?'
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
