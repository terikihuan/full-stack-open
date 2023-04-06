// function that takes care of manipulating cache
const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, (_ref) => {
    console.log(cache)
    console.log(query)
    console.log(_ref)
    const { allBooks } = _ref
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

export default updateCache
