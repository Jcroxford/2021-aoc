function createGrid(input, enlarge = false) {
  const grid = input
    .split('\n')
    .map(x => x.split('').map(Number))

  if(!enlarge) return grid

  const originalLength = grid[0].length
  const originalHeight = grid.length
  for (let y = 0; y < originalHeight * 5; y++) {
    for (let x = 0; x < originalLength * 5; x++) {
      if(x < originalLength && y < originalHeight) continue

      let value = null
      // if creating new row, no previous x value is available to look at.
      // so fill in bottom Y levels with top values that don't extend past original length
      if(x < originalLength && y >= originalHeight) {
        if(grid[y] == undefined) grid[y] = []
        value = (grid[y - originalHeight][x] + 1) % 10 || 1
      }
      // past original length, a left value should be available. So use that
      if(x >= originalLength) {
        value = (grid[y][x - originalLength] + 1) % 10 || 1
      }
      grid[y][x] = value
    }
  }

  return grid
}

// dijkstra's shortest distance algo
function shortestPath(weightGrid, startX, startY, targetX, targetY) {
  const distanceGrid = weightGrid.map((row, y) => row.map((col, x) => ({ distance: Infinity, x, y, weight: weightGrid[y][x], prevX: null, prevY: null })))
  distanceGrid[0][0].distance = 0

  const startNode = distanceGrid[startY][startX]
  let currentNode = startNode
  let visited = []

  while(currentNode.x != targetX || currentNode.y != targetY) {
    const adjacentNodes = findAdjacentNodes(distanceGrid, currentNode)
    for(let adjacentNode of adjacentNodes) {
      if(adjacentNode.x == currentNode.prevX && adjacentNode.y == currentNode.prevY) continue // skip node we just came from

      const potentiallySmallerDistance = currentNode.distance + adjacentNode.weight
      if(adjacentNode.distance > potentiallySmallerDistance) {
        adjacentNode.distance = potentiallySmallerDistance
        adjacentNode.prevX = currentNode.x
        adjacentNode.prevY = currentNode.y
        if(!~visited.findIndex(node => node.x == adjacentNode.x && node.y == adjacentNode.y)) visited.push(adjacentNode)
      }
    }

    visited = visited.sort((a, b) => a.distance - b.distance)

    currentNode = visited.shift()
  }

  return currentNode
}

function findAdjacentNodes(grid, { x, y }) {
  const nodes = []
  if(grid[y] && grid[y][x-1]) nodes.push(grid[y][x-1])
  if(grid[y] && grid[y][x+1]) nodes.push(grid[y][x+1])
  if(grid[y-1] && grid[y][x]) nodes.push(grid[y-1][x])
  if(grid[y+1] && grid[y][x]) nodes.push(grid[y+1][x])

  return nodes
}

/**
 * @param {string} input
 */
function part1(input) {
  const grid = createGrid(input)

  return shortestPath(grid, 0, 0, grid[0].length-1, grid.length-1).distance
}

/**
 * @param {string} input
 */
function part2(input) {
  const grid = createGrid(input, /* enlarge */ true)

  return shortestPath(grid, 0, 0, grid[0].length-1, grid.length-1).distance
}

module.exports = { part1, part2 }
