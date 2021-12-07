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

    let smallestFuelUsed = Infinity
    for (let step = 0; step <= Math.max(...data); step++) {
      const current = data.reduce((totalFuel, num) => (useSeriesSum ? sumSeries(Math.abs(num - step)) : Math.abs(num - step)) + totalFuel, 0)
      if(current < smallestFuelUsed) smallestFuelUsed = current
    }

    return smallestFuelUsed
  }
}

const part1 = calculateSmallestDistance()

const part2 = calculateSmallestDistance(/* useSeriesSum */ true)

module.exports = { part1, part2 }
