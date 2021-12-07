/**
 * @param {number} n
 */
const sumSeries = n => (n*(n+1))/2

/**
 * @param {boolean} useSeriesSum
 */
function calculateSmallestDistance(useSeriesSum = false) {
  /**
   * @param {string} input
   */
  return function(input) {
    let data = input
     .split(',')
     .map(Number)

    const max = Math.max(...data)
    let smallestFuelUsed = Infinity
    let current = 0
    for (let step = 0; step <= max; step++) {
      current = 0
      for(let num of data) {
        const distance = Math.abs(num - step)
        current += useSeriesSum ? sumSeries(distance) : distance
        if(current > smallestFuelUsed) break
      }
      if(current < smallestFuelUsed) smallestFuelUsed = current
    }

    return smallestFuelUsed
  }
}

const part1 = calculateSmallestDistance()

const part2 = calculateSmallestDistance(/* useSeriesSum */ true)

module.exports = { part1, part2 }
