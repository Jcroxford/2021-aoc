// bingo can only happen in row or column that the newest number was marked.
// this function checks only those
function checkForBingo(card, matchedRowIndex, matchedColIndex) {
  if(!card[matchedRowIndex].filter(c => !c.marked).length) return card

  const verticalRow = card.map(row => row[matchedColIndex])
  if(!verticalRow.filter(c => !c.marked).length) return card

  return null
}

function sumUnmarkedNumbers(card) {
  return card.reduce((total, row) => total + row.reduce((total, col) => col.marked ? total : total + col.number, 0), 0)
}

/**
 * @param {string} input
 */
function prepareData(input) {
  let [ numbersToBeDrawn, ...bingocards ] = input.split(`\n\n`)

  numbersToBeDrawn = numbersToBeDrawn.split(',').map(Number)

  bingocards = bingocards
    .map(b => b.split('\n'))
    .map(card => card
      .map(row => row.match(/\d{1,2} {0,1}/g))
      .map(row => row.map(col => ({ number: Number(col.trim()), marked: false })))
    )

  return { numbersToBeDrawn, bingocards }
}

function playRound(card, drawnNumber) {
  for (let rowIndex = 0; rowIndex < card.length; rowIndex++) {
    const row = card[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const col = row[columnIndex];

      if(col.number == drawnNumber) {
        col.marked = true
        return { gotBingo: !!checkForBingo(card, rowIndex, columnIndex) }
      }
    }
  }

  return null
}

/**
 * @param {string} input
 */
function part1(input) {
  let { numbersToBeDrawn, bingocards } = prepareData(input)

  for(let drawnNumber of numbersToBeDrawn) {
    for (let card of bingocards) {
      if(playRound(card, drawnNumber).gotBingo) return sumUnmarkedNumbers(card) * drawnNumber
    }
  }
}

/**
 * @param {string} input
 */
function part2(input) {
  let { numbersToBeDrawn, bingocards } = prepareData(input)

  for(let drawnNumber of numbersToBeDrawn) {
    if(bingocards.length > 1) {
      bingocards = bingocards.filter(card => !playRound(card, drawnNumber).gotBingo)
    } else {
      const card = bingocards[0]

      if(playRound(card, drawnNumber).gotBingo) return sumUnmarkedNumbers(card) * drawnNumber
    }
  }
}

module.exports = { part1, part2 }
