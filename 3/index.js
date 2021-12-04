/**
 * @param {string} input
 * @returns number
 */
 const convertToDecimal = (input) => parseInt(input, 2)

/**
 * @param {string} input
 */
function part1(input) {
   const gamma = []
   const epsilon = []
   const rows = input.split('\n')

   for (let i = 0; i < rows[0].length; i++) {
    const numOfZeroes = rows.filter(r => r[i] == '0').length
    const numOfOnes = rows.filter(r => r[i] == '1').length

    if(numOfOnes > numOfZeroes) {
      gamma.push('1')
      epsilon.push('0')
    } else {
      gamma.push('0')
      epsilon.push('1')
    }
   }

   return convertToDecimal(gamma.join('')) * convertToDecimal(epsilon.join(''))
}

/**
 * @param {string} input
 */
function part2(input) {
  const rows = input.split('\n')
  let oxygen = [...rows]
  let co2 = [...rows]

  for (let i = 0; i < rows[0].length; i++) {
    const oxygenZeroes = oxygen.filter(r => r[i] == '0').length
    const oxygenOnes = oxygen.filter(r => r[i] == '1').length

    if(oxygenOnes > oxygenZeroes || oxygenOnes == oxygenZeroes) {
      if(oxygen.length > 1) oxygen = oxygen.filter(r => r[i] == '1')
    } else {
      if(oxygen.length > 1) oxygen = oxygen.filter(r => r[i] == '0')
    }

    const co2Zeroes = co2.filter(r => r[i] == '0').length
    const cozOnes = co2.filter(r => r[i] == '1').length
    if(cozOnes > co2Zeroes || cozOnes == co2Zeroes) {
      if(co2.length > 1) co2 = co2.filter(r => r[i] == '0')
    } else {
      if(co2.length > 1) co2 = co2.filter(r => r[i] == '1')
    }
  }

  return convertToDecimal(oxygen[0]) * convertToDecimal(co2[0])
}

module.exports = { part1, part2 }
