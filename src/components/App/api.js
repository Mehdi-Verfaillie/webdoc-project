const getContent = async (section) => {
  const response = await fetch(`/api/${section}`)
  const data = await response.json()
  const { content } = data
  return content
}

export { getContent }
