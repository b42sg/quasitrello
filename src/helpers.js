export const order = (items, order = []) => {
  if (!items) {
    return items
  }

  const newItems = [ ...items ]

  newItems.sort((a, b) => {
    const bi = order.indexOf(b.id)
    const ai = order.indexOf(a.id)

    if (ai === -1) {
      return 1
    }

    return bi - ai
  })

  return newItems
}
