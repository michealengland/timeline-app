/**
 * Filter dates.
 *
 * @param dates Array with dates.
 * @param string direction = string forward or reverse
 */
const dateDirection = (posts, direction) => {
  if (!posts.length) {
    return
  }

  // clone posts array.
  const updatedPosts = [...posts]

  // sort Array according to direction.
  if (direction === 'normal') {
    // Sort by new to old.
    updatedPosts.sort((b, a) => {
      return new Date(a.date) - new Date(b.date)
    })
  } else {
    // Sort by old to new.
    updatedPosts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
  }

  return updatedPosts
}

export default dateDirection
