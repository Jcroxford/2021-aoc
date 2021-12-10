/**
 * @param {string} input
 */
function parseTagList(input) {
  return input
    .split('\n')
    .map(x => x.split(''))
    .map((set) => {
      const openingChunks = []
      const tagDefinitions = {
        '(': { closeTag: ')', autoCompleteScore: 1, corruptScore: 3 },
        '[': { closeTag: ']', autoCompleteScore: 2, corruptScore: 57 },
        '{': { closeTag: '}', autoCompleteScore: 3, corruptScore: 1197 },
        '<': { closeTag: '>', autoCompleteScore: 4, corruptScore: 25137 }
      }
      for(let char of set) {
        if(Object.keys(tagDefinitions).includes(char)) {
          openingChunks.push(char)
        } else if(tagDefinitions[openingChunks[openingChunks.length - 1]].closeTag != char) {
          return { corrupt: true, result: Object.values(tagDefinitions).find(x => x.closeTag == char).corruptScore }
        } else if(tagDefinitions[openingChunks[openingChunks.length - 1]].closeTag == char) {
          openingChunks.pop()
        }
      }

      return {
        corrupt: false,
        result: openingChunks.reverse().reduce((total, next) => total * 5 + tagDefinitions[next].autoCompleteScore, 0)
      }
    })
}

/**
 * @param {string} input
 */
function part1(input) {
  return parseTagList(input)
    .filter(x => x.corrupt)
    .map(x => x.result)
    .reduce((acc, n) => acc + n, 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  const result = parseTagList(input)
    .filter(x => !x.corrupt)
    .map(x => x.result)
    .sort((a, b) => a - b)

  return result[Math.floor(result.length/2)]
}

module.exports = { part1, part2 }
