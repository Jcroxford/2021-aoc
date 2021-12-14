function parseInput(input) {
  return input
    .split('\n')
    .reduce(([template, insertionRules], next, i) => {
      if(i == 0) template = next.split('')
      if(next.includes('->')) {
        const [rule, value ] = next.split(' -> ')

        insertionRules[rule] = value
      }

      return [ template, insertionRules ]
    }, [ null, {} ])
}

function createNewPairList(insertionRules) {
  return Object.keys(insertionRules).reduce((dict, rule) => ({ ...dict, [rule]: 0 }), {})
}

/**
 * @param {string} input
 */
function part1(input) {
  const steps = 10
  let [ template, insertionRules ] = parseInput(input)

  for (let i = 0; i < steps; i++) {
    template = template.map((c, i) => i  == template.length -1 ? c : `${c}${insertionRules[`${c}${template[i+1]}`]}`).join('').split('')
  }

  const letterCount = template
    .reduce((dict, next) => {
      if(dict[next] == undefined) dict[next] = 0

      dict[next]++

      return dict
    }, {})

  return Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount))
}

/**
 * @param {string} input
 */
function part2(input) {
  const steps = 40
  let [ template, insertionRules ] = parseInput(input)

  let pairs = createNewPairList(insertionRules)
  for (let i = 0; i < template.length - 1; i++) {
    pairs[`${template[i]}${template[i+1]}`]++
  }

  for (let i = 0; i < steps; i++) {
    let nextPairs = createNewPairList(insertionRules)
    Object.keys(pairs).forEach(pair => {
      const occurences = pairs[pair]
      const newLetter = insertionRules[pair]

      const [ left, right ] = pair.split('')
      nextPairs[`${left}${newLetter}`] += occurences
      nextPairs[`${newLetter}${right}`] += occurences
    })

    pairs = nextPairs
  }

  letterCount = Object.keys(pairs).reduce((dict, pair) => {
    const letterToCount = pair[0] // second letter would be start to new pair. so first letter is the one to count
    if(dict[letterToCount] == undefined) dict[letterToCount] = 0

    dict[letterToCount] += pairs[pair]

    return dict
  }, {})

  // off by one because last letter can't get added above lol
  letterCount[template.slice(-1)[0]]++

  return Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount))
}

module.exports = { part1, part2 }
