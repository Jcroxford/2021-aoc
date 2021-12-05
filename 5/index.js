/**
 * @param {boolean} includeDiagonals
 */
function findVents(includeDiagonals = false) {
  /**
   * @param {string} input
   */
  return function(input) {
    const GRID_SIZE = 10 // change size big enough to handle all input
    return input
      .split('\n')
      .map(x => x
        .split(' -> ')
        .map(x => x.split(',').map(Number))
      )
      .reduce(
        (grid, [ [ x1, y1 ], [ x2, y2 ] ]) => {
          if(x1 == x2) {
            const highest = Math.max(y1, y2)
            const lowest = Math.min(y1, y2)
            for(let i = lowest; i <= highest; i++) {
              grid[i][x1]++
            }
          } else if(y1 == y2) {
            const highest = Math.max(x1, x2)
            const lowest = Math.min(x1, x2)
            for(let i = lowest; i <= highest; i++) {
              grid[y1][i]++
            }
          } else if(includeDiagonals) {
            const largestDistance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
            let currentX = Math.min(x1, x2) // always start with lowest X to simplify
            let currentY = x1 < x2 ? y1 : y2
            const yDirection = currentY == Math.max(y1, y2) ? -1 : 1

            for (let i = 0; i <= largestDistance; i++) {
              grid[currentY][currentX]++
              currentX++
              currentY = currentY + yDirection
            }
          }

          return grid
        },
        new Array(GRID_SIZE).fill(null).map(x => new Array(GRID_SIZE).fill(0))
      )
        // .map(x => x.join('')).join('\n') // to visualize graph comment this in and comment out below lines
      .map(y => y.filter(x => x > 1))
      .flat()
      .length
  }
}

const part1 = findVents()

const part2 = findVents(/* includeDiagonals */true)

module.exports = { part1, part2 }
