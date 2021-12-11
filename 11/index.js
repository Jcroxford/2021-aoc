const parseGrid = f => input => f(input.split('\n').map(x => x.split('').map(Number)))

function performOneStepEnergyIncrease(grid) {
  let flashesThisStep = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      grid[r][c]++
      if(grid[r][c] == 10) flashesThisStep += flash(grid, r, c)
    }
  }

  return flashesThisStep
}

function flash(grid, r, c) {
  grid[r][c] = 11
  const points = findSurroundingPoints(grid, r, c)

  let flashes = 1
  for(let [pr, pc] of points) {
    if(grid[pr][pc] == 11) continue

    grid[pr][pc] += 1
    if(grid[pr][pc] == 10) flashes += flash(grid, pr, pc)
  }

  return flashes
}

function findSurroundingPoints(grid, r, c) {
  pairs = []

  if(grid[r-1] != undefined) {
    pairs.push([r-1, c])
    if(grid[r-1][c-1] != undefined) pairs.push([r-1, c-1])
    if(grid[r-1][c+1] != undefined) pairs.push([r-1, c+1])
  }

  if(grid[r+1] != undefined) {
    pairs.push([r+1, c])
    if(grid[r+1][c-1] != undefined) pairs.push([r+1, c-1])
    if(grid[r+1][c+1] != undefined) pairs.push([r+1, c+1])
  }

  if(grid[r][c-1] != undefined) pairs.push([r, c-1])
  if(grid[r][c+1] != undefined) pairs.push([r, c+1])

  return pairs
}

function part1(grid) {
  let totalFlashes = 0
  const STEPS = 100
  for (let i = 0; i < STEPS; i++) {
    const flashesThisStep = performOneStepEnergyIncrease(grid)
    grid = grid.map(row => row.map(c => c > 9 ? 0 : c))

    totalFlashes += flashesThisStep
  }

  return totalFlashes
}

function part2(grid) {
  const gridSize = grid.reduce((total, row) => row.length + total, 0)

  let i = 0
  while(true) {
    const flashesThisStep = performOneStepEnergyIncrease(grid)
    grid = grid.map(row => row.map(c => c > 9 ? 0 : c))

    if(flashesThisStep == gridSize) return i+1
    i++
  }
}

module.exports = { part1: parseGrid(part1), part2: parseGrid(part2) }
