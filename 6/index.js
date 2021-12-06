/**
 * @param {string} input
 */
function breedFish(input) {
  const numberOfDays = 80
  let fishDict = input
    .split(',')
    .map(Number)
    .reduce(
      (dict, fish) => ({ ...dict, [fish]: dict[fish] + 1}),
      { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
    )

  for (let d = 0; d < numberOfDays; d++) {
    let previous = 0
    let current = 0
    for (let a = 8; a >= 0; a--) {
      if(a == 0) {
        fishDict[8] = fishDict[0]
        fishDict[6] = fishDict[6] + fishDict[0]
        fishDict[0] = 0
      }
      previous = current
      current = fishDict[a]
      fishDict[a] = previous
    }

  }

  return Object.keys(fishDict).reduce((total, key) => total + fishDict[key], 0)
}

const part1 = breedFish

const part2 = breedFish

module.exports = { part1, part2 }
