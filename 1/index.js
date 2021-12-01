/**
 * @param {string} input
 */
function part1(input) {
  return input
    .split('\n')
    .map(Number)
    .reduce((total, next, i, depths) => {
      if(!i) return total
      if(depths[i-1] < next) return total + 1
      return total
    }, 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  return input
    .split('\n')
    .map(Number)
    .reduce((list, next, i, depths) => {
      if(i >= depths.length - 2) return list

      list.push(next + depths[i+1] + depths[i+2])

      return list
    }, [])
    .reduce((total, next, i, depths) => {
      if(!i) return total
      if(depths[i-1] < next) return total + 1
      return total
    }, 0)
}

module.exports = { part1, part2 }
