var _ = require("lodash")

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (fav, curr) => {
      if (fav.likes < curr.likes) {
        return curr
      }
      return fav
    },
    { likes: -99999 }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
