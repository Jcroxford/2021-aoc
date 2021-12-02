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
      switch (direction) {
        case 'forward':
          horizontal += num
          break;

        case 'up':
          depth -= num
          break;

        case 'down':
          depth += num
          break;
      }
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
      switch (direction) {
        case 'forward':
          horizontal += num
          depth += aim * num
          break;

        case 'up':
          aim -= num
          break;

        case 'down':
          aim += num
          break;
      }
    })

    return depth * horizontal
}

module.exports = { part1, part2 }
