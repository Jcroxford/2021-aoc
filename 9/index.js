function findLowestPoints(floor) {
  const lowestPoints = []
  floor.forEach((row, rI, floor) => {
    row.forEach((column, cI) => {
      if(floor[rI-1] != undefined && floor[rI-1][cI] <= column) return
      if(floor[rI+1] != undefined && floor[rI+1][cI] <= column) return
      if(floor[rI][cI+1] != undefined && floor[rI][cI+1] <= column) return
      if(floor[rI][cI-1] != undefined && floor[rI][cI-1] <= column) return

      lowestPoints.push({ rI, cI })
    })
  })

  return lowestPoints
}

function createBasin(floor, rI, cI) {
  if(floor[rI] == undefined) return 0
  if(floor[rI][cI] == undefined) return 0
  if(floor[rI][cI] == 9) return 0

  floor[rI][cI] = 9 // don't revisit space

  return 1 +
  createBasin(floor, rI-1, cI) +
  createBasin(floor, rI+1, cI) +
  createBasin(floor, rI, cI+1) +
  createBasin(floor, rI, cI-1)
}

/**
 * @param {string} input
 */
function part1(input) {
  const floor = input.split('\n').map(x => x.split('').map(Number))
  return findLowestPoints(floor).map(({ rI, cI }) => floor[rI][cI]).reduce((total, next) => total + next + 1, 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  const floor = input.split('\n').map(x => x.split('').map(Number))

  return findLowestPoints(floor)
    .map(({ rI, cI }) => createBasin(floor, rI, cI))
    .sort((a, b) => a  - b)
    .slice(-3)
    .reduce((total, next) => total * next, 1)
}

module.exports = { part1, part2 }
