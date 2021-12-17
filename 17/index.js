function parseInput(input) {
  return input.replace(/target area: x=(.*)\.\.(.*), y=(.*)\.\.(.*)/, '$1 $2 $3 $4').split(' ').map(Number)
}

function findAllTargetableZones(targetZone, resolveHighestY = false, resolveTotalTargetableZones = false) {
  const [ _, x2, y1 ] = targetZone
  let x = 0
  let y = 0

  let highestY = 0
  let viableStartVelocities = 0
  for (let x = 0; x <= x2; x++) {
    for (let y = y1; y < -y1; y++) {
      currentY = reachesTargetZone(x, y, targetZone)
      if(currentY != null) {
        viableStartVelocities++
      }
      if(highestY < currentY) highestY = currentY
    }
  }

  if(resolveHighestY) return highestY
  if(resolveTotalTargetableZones) return viableStartVelocities
}

// returns highest y value if it reaches target zone
function reachesTargetZone(x, y, [ x1, x2, y1, y2 ]) {
  let xVelocity = x
  let yVelocity = y

  let currentX = 0
  let currentY = 0
  let highestY = 0

  while(currentX <= x2 && currentY >= y1) {
    currentX += xVelocity
    currentY += yVelocity
    if(currentY > highestY) highestY = currentY

    if(xVelocity > 0) xVelocity--
    yVelocity--

    if(currentX >= x1 && currentX <= x2 && currentY >= y1 && currentY <= y2) {
      return highestY
    }
  }
  return null
}

/**
 * @param {string} input
 */
function part1(input) {
  const targetZone = parseInput(input)

  return findAllTargetableZones(targetZone, /* resolveHighestY */ true)
}

/**
 * @param {string} input
 */
function part2(input) {
  const targetZone = parseInput(input)

  return findAllTargetableZones(targetZone, /* resolveHighestY */ false, /* resolveTotalTargetableZones */ true)
}

module.exports = { part1, part2 }
