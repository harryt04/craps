const numberOfRolls = 50
const numberOfSessions = 3

const playingOnPassline = true

const minimumBet = 5
const sixAndEightBet = Math.round(1.2 * minimumBet)

const oddsBet = 2 * minimumBet

let bankRollIterations = []
let bankRoll = 0

const gameState = {
  point: 'off',
  pointNumber: null,
}

function rollDice() {
  const dieOne = Math.floor(Math.random() * 6) + 1
  const dieTwo = Math.floor(Math.random() * 6) + 1
  return dieOne + dieTwo
}

function runSimulations() {
  for (let i = 0; i < numberOfSessions; i++) {
    console.log(`Running Simulation number ${i + 1}`)
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
  for (let i = 0; i < numberOfRolls; i++) {
    const currentRoll = rollDice()
    // console.log("currentRoll", currentRoll);

    if (gameState.point === 'off') {
      switch (currentRoll) {
        case 7:
        case 11:
          if (playingOnPassline) {
            bankRoll += minimumBet
          }
          break
        case 2:
        case 3:
        case 12:
          if (playingOnPassline) {
            bankRoll -= minimumBet
          }
          break

        case 4:
        case 5:
        case 6:
        case 8:
        case 9:
        case 10:
          gameState.point = 'on'
          // console.log("Point is on");
          gameState.pointNumber = currentRoll
          break
      }
    } else {
      if (gameState.pointNumber === currentRoll) {
        gameState.point = 'off'
      } else {
        switch (currentRoll) {
          case 7:
            gameState.point = 'off'
            // console.log("Point is off");
            const totalLoss = Math.round(4.4 * minimumBet)
            // console.log("totalLoss", totalLoss);
            bankRoll -= totalLoss
            break
          case 5:
            bankRoll += Math.round(1.4 * minimumBet)
            bankRoll -= minimumBet
            break
          case 6:
          case 8:
            bankRoll += Math.round(1.166666667 * sixAndEightBet)
            bankRoll -= minimumBet
            break
          case 3:
          case 4:
          case 9:
          case 10:
          case 11:
            bankRoll += minimumBet
            break
          case 2:
          case 12:
            bankRoll += 2 * minimumBet
            break
        }
      }
    }
    // console.log("current bank roll", bankRoll);
  }

  bankRollIterations.push(bankRoll)
}

const average = runSimulations()

console.log(
  `Your average net win/loss after ${numberOfSessions} simulations of ${numberOfRolls} rolls is: ${average}, or a calculated house edge of ${round(
    average / numberOfRolls
  ) * -1}%`
)

function round(x) {
  return Math.round(x * 100) / 100
}
