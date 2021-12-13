function parseData(input) {
  return input
    .split('\n')
    .reduce(([points, folds], next) => {
      if(next.includes('fold')) { // add instruction to folds
        const [direction, index] = next.match(/(x|y)=\d+/)[0].split('=')
        folds.push({ direction, index: Number(index) })
      } else if(next.includes(',')) { // add point to points list
        points.push(next.split(',').map(Number))
      }

      return [ points, folds ]
    }, [[], []])
}

function createAndPopulateGrid(points) {
  const maxY = Math.max(...points.map(([ x, y ]) => y)) + 1
  const maxX = Math.max(...points.map(([ x, y ]) => x)) + 1
  let grid = new Array(maxY).fill(undefined).map(x => new Array(maxX).fill(undefined).map(x => '.'))
  for(let [x, y] of points) {
    grid[y][x] = '#'
  }

  return grid
}

function foldGrid(grid, { direction, index }) {
  if(direction == 'x') {
    grid = grid.map(row => {
      let left = row.slice(0, index)
      let right = row.slice(index+1).reverse()

      return left.map((x, xi) => [x, right[xi]].includes('#') ? '#' : '.')
    })
  }

  if(direction == 'y') {
    let top = grid.slice(0, index)
    let bottom = grid.slice(index+1).reverse()

    grid = top.map((row, ri) => row.map((x, xi) => [x, bottom[ri][xi]].includes('#') ? '#' : '.'))
  }

  return grid
}

/**
 * @param {string} input
 */
function part1(input) {
  let [ points, folds ] = parseData(input)

  let grid = createAndPopulateGrid(points)

  grid = foldGrid(grid, folds[0])

  return grid.map(row => row.filter(x => x == '#')).flat().length
}

/**
 * @param {string} input
 */
function part2(input) {
  let [ points, folds ] = parseData(input)

  let grid = createAndPopulateGrid(points)

  folds.forEach(fold => grid = foldGrid(grid, fold))

  return grid.map(r => r.join('')).join('\n')
}

module.exports = { part1, part2 }
