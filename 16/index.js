function parseInput(input) {
  return input.split('').map(x => (parseInt(x, 16).toString(2)).padStart(4, '0').split('')).flat()
}

class BitParser {
  constructor(blob) {
    this.blob = blob
    this.sumOfVersions = 0
  }

  runParser() {
    return this.parsePackets(this.blob)
  }

  parsePackets(blob) {
    let packetVersion = parseInt(blob.splice(0, 3).join(''), 2)
    this.sumOfVersions += packetVersion
    let packetTypeId = parseInt(blob.splice(0, 3).join(''), 2)

    if(packetTypeId == 4) {
      return this.parseLiteralNumber(blob)
    } else {
      return this.parseOperator(blob, packetTypeId)
    }
  }

  parseLiteralNumber(blob, numberInBinary = []) {
    const continues = blob.splice(0, 1)[0] == '1'
    const nextNumberSection = blob.splice(0, 4)

    if(continues) return this.parseLiteralNumber(blob, [ ...numberInBinary, ...nextNumberSection ])
    // blob.splice(0, blob.length % 4)
    return parseInt([ ...numberInBinary, ...nextNumberSection ].join(''), 2)
  }

  parseOperator(blob, packetTypeId) {
    const lengthTypeId = blob.splice(0, 1)[0]

    let subPacketResults = []
    if(lengthTypeId == '0') {
      const BitsLengthOfSubPackets = parseInt(blob.splice(0, 15).join(''), 2)

      const subpacketsBlob = blob.splice(0, BitsLengthOfSubPackets)
      while(subpacketsBlob.length) {
        subPacketResults.push(this.parsePackets(subpacketsBlob))
      }
    } else {
      const numberOfSubPackets = parseInt(blob.splice(0, 11).join(''), 2)
      for (let i = 0; i < numberOfSubPackets; i++) {
        subPacketResults.push(this.parsePackets(blob))
      }
    }

    switch (packetTypeId) {
      case 0:
        return subPacketResults.reduce((total, next) => total + next, 0)
      case 1:
        return subPacketResults.reduce((total, next) => total * next, 1)
      case 2:
        return Math.min(...subPacketResults)
      case 3:
        return Math.max(...subPacketResults)
      case 5:
        return subPacketResults[0] > subPacketResults[1] ? 1 : 0
      case 6:
        return subPacketResults[0] < subPacketResults[1] ? 1 : 0
      case 7:
        return subPacketResults[0] == subPacketResults[1] ? 1 : 0
    }
  }
}

/**
 * @param {string} input
 */
 function part1(input) {
  let binaryBlob = parseInput(input)

  const bitParser = new BitParser(binaryBlob)

  bitParser.runParser()

  return bitParser.sumOfVersions
}

/**
 * @param {string} input
 */
function part2(input) {
  let binaryBlob = parseInput(input)

  const bitParser = new BitParser(binaryBlob)

  return bitParser.runParser()
}

module.exports = { part1, part2 }
