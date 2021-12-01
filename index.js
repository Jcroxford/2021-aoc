// when calling index provide args for day (1-24) and part (1 or 2)
const [_, __, day, part] = process.argv
const fs = require('fs')

const input = fs.readFileSync(`./${day}/input.txt`, 'utf-8')

const scope = require(`./${day}`)

console.log(Number(part) == 1 ? scope.part1(input) : scope.part2(input))
