function solve(allowDuplicateSmallCaves = false) {
  return function (input) {
    const connections = input
      .split('\n')
      .map(x => x.split('-'))
      .reduce((dict, [ startCave, endCave ]) => {
        // add all paths each cave can traverse too except 'start'. Also don't include any paths from end
        // since that's where we stop. dict looks something like { 'start': ['A', 'b'], 'A': ['b', 'c', 'end'], ... }
        if(!dict[startCave] && startCave != 'end') dict[startCave] = []
        if(!dict[endCave] && endCave != 'end') dict[endCave] = []

        if(endCave != 'start' && startCave != 'end') dict[startCave].push(endCave)
        if(endCave != 'end' && startCave != 'start') dict[endCave].push(startCave)

        return dict
      }, {})

  return traversePath(connections, 'start', allowDuplicateSmallCaves)
  }
}

function traversePath(connections, currentCave, allowDuplicateSmallCaves, visitedCaves = []) {
  if(currentCave == 'end') return 1

  return connections[currentCave].reduce((total, nextCave) => {
    const failsSmallCaveRules = (!allowDuplicateSmallCaves) || (allowDuplicateSmallCaves && hasVisitedSmallCaveMoreThanOnce(visitedCaves))
    if(visitedCaves.includes(currentCave) && currentCave.match(/[a-z]+/) && failsSmallCaveRules) return total
    return total + traversePath(connections, nextCave, allowDuplicateSmallCaves, [ ...visitedCaves, currentCave ])
  }, 0)
}

function hasVisitedSmallCaveMoreThanOnce(visitedCaves) {
  const smallPoints = visitedCaves
    .filter(point => point.match(/[a-z]+/) && point != 'start')
    .sort()

  for (let i = 0; i < smallPoints.length; i++) {
    const point = smallPoints[i];
    if(point == smallPoints[i+1]) return true
  }

  return false
}

const part1 = solve()

const part2 = solve(/* allowDuplicateSmallCaves */ true)

module.exports = { part1, part2 }
