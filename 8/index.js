String.prototype.includesAll = function(compareStr) {
  return this.toString().split('').filter(c => compareStr.includes(c)).length == compareStr.length
}

/**
 * @param {string} input
 */
function part1(input) {
  return input
    .split('\n')
    .map(x => x.split(' | '))
    .map(([input, output]) => ([ input.split(' '), output.split(' ')]))
    .map(([input, output]) => ([ input.filter(x => [2,3,4,7].includes(x.length)), output.filter(x => [2,3,4,7].includes(x.length)) ]))
    .map(([input, output]) => output.length)
    .reduce((total, next) => total + next, 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  return input
    .split('\n')
    .map(x => x.split(' | '))
    .map(([input, output]) => ([ input.split(' '), output.split(' ')]))
    .map(([input, output]) => ([ input.map(x => x.split('').sort().join('')), output.map(x => x.split('').sort().join(''))]))
    .map(([input, output]) => {
      // 1, 4, 7, 8 given
      const [ one, seven, four, eight ] = input.filter(x => [2,3,4,7].includes(x.length)).sort((a,b) => a.length - b.length)
      let leftOvers = input.filter(x => ![2,3,4,7].includes(x.length))

      const six = leftOvers.find(num => num.length == 6 && !num.includesAll(one))
      const nine = leftOvers.find(num => num.length == 6 && num.includesAll(four))
      const zero = leftOvers.find(num => num.length == 6 && num != nine && num != six)

      const three = leftOvers.find(num => num.length == 5 && num.includesAll(one))
      const five = leftOvers.find(num => num.length == 5 && six.includesAll(num))
      const two = leftOvers.find(num => num.length == 5 && num != three && num != five)

      const solvedNumbers = [ zero, one, two, three, four, five, six, seven, eight, nine ]

      return output
        .map(o => o.split('').sort().join(''))
        .map(o => solvedNumbers.findIndex(n => n == o))
        .join('')
    })
    .map(Number)
    .reduce((total, next) => total + next, 0)
}

module.exports = { part1, part2 }
