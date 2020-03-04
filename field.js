const numberOfRolls = 1000
const numberOfSessions = 100000

const minimumBet = 5
let currentBet = 0
const tableMax = 100 * minimumBet

let bankRollIterations = []
let bankRoll = 0

const twoPaysTriple = false
const twelvePaysTriple = false

function rollDice() {
  const dieOne = Math.floor(Math.random() * 6) + 1
  const dieTwo = Math.floor(Math.random() * 6) + 1
  return dieOne + dieTwo
}

function runSimulations() {
  for (let i = 0; i < numberOfSessions; i++) {
    if (i % 1000 === 0) console.log(`Running Simulation number ${i}`)
    runSimulation()
  }
  let sum = 0
  for (let br of bankRollIterations) {
    // console.log("br", br);
    sum += br
  }
  return sum / numberOfSessions
}

function runSimulation() {
  bankRoll = 0
  currentBet = minimumBet

  for (let i = 0; i < numberOfRolls; i++) {
    const currentRoll = rollDice()

    switch (currentRoll) {
      case 3:
      case 4:
      case 9:
      case 10:
      case 11:
        bankRoll += currentBet
        currentBet = minimumBet
        break
      case 2:
        if (twoPaysTriple) bankRoll += currentBet * 3
        else bankRoll += currentBet * 2
        currentBet = minimumBet
        break
      case 12:
        if (twelvePaysTriple) bankRoll += currentBet * 3
        else bankRoll += currentBet * 2
        currentBet = minimumBet
        break
      case 5:
      case 6:
      case 7:
      case 8:
        bankRoll -= currentBet
        if (currentBet * 2 < tableMax) currentBet = currentBet * 2
        // else currentBet = tableMax
        break
    }
  }

  bankRollIterations.push(bankRoll)
}

const average = runSimulations()

console.log(
  `Your average net win/loss after ${numberOfSessions} simulations of ${numberOfRolls} rolls is: ${average}, or a calculated house edge of ${round(
    average / numberOfRolls,
  ) * -1}%`,
)

function round(x) {
  return Math.round(x * 100) / 100
}
