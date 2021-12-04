/**
 * @param {string} input
 */
function part1(input) {
  let depth = 0
  let horizontal = 0
  input
    .split('\n')
    .map(x => x.split(' '))
    .map(([direction, num]) => ([ direction, Number(num)]))
    .forEach(([direction, num]) => {
      if(direction == 'forward') horizontal += num
      if(direction == 'up') depth -= num
      if(direction == 'down') depth += num
    })

    return depth * horizontal
}

/**
 * @param {string} input
 */
function part2(input) {
  let depth = 0
  let horizontal = 0
  let aim = 0
  input
    .split('\n')
    .map(x => x.split(' '))
    .map(([direction, num]) => ([ direction, Number(num)]))
    .forEach(([direction, num]) => {
      if(direction == 'forward') {
        horizontal += num
        depth += aim * num
      }
      if(direction == 'up') aim -= num
      if(direction == 'down') aim += num
    })

    return depth * horizontal
}

module.exports = { part1, part2 }
