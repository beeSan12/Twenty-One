/**
 * @file The starting point of the application.
 * @module src/app
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author // Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 2.0.0
 */

// TODO: Replace the code below with your own game logic.
import { CardTable } from './CardTable.js'

/**
 * Start a game of Twenty-One.
 * Check if the number of rounds and players are valid integers.
 *
 * @throws {Error} The number of rounds must be between 1 and 5.
 * @throws {Error} The number of players must be between 1 and 7 or 52.
 * @throws {Error} The deck must contain 52 cards.
 * @throws {Error} The number of players must be a valid integer.
 * @throws {Error} The number of rounds must be a valid integer.
 * @throws {Error} The number of cards must be a valid integer.
 * @throws {Error} Deck is empty
 */
function startGame () {
  process.exitCode = 0 // Default exit code for successfull termination.
  const args = process.argv.slice(2) // Ignore the first two arguments which are 'node' and the file path
  const numberOfRounds = parseInt(args[0]) || 1 // If no argument is sent, set the number of rounds to 1)
  const numberOfPlayers = parseInt(args[1]) || 3 // If no argument is sent, set the number of players to 3)

  // Validate arguments
  console.log('Number of rounds:', numberOfRounds)
  console.log('Number of players:', numberOfPlayers)

  try {
    if (!Number.isInteger(numberOfPlayers)) {
      process.exitCode = 27
      throw new Error('The number of players must be a valid integer.')
    }
    if (!Number.isInteger(numberOfRounds)) {
      process.exitCode = 26
      throw new Error('The number of rounds must be a valid integer.')
    }
    if (numberOfRounds < 1 || numberOfRounds > 5) {
      process.exitCode = 1
      throw new Error('The number of rounds must be between 1 and 5')
    }
    if ((numberOfPlayers < 1 || numberOfPlayers > 7) && numberOfPlayers !== 52) {
      process.exitCode = 1
      throw new Error('The number of players must be between 1 and 7 or 52')
    }

    const cardTable = new CardTable(numberOfPlayers)
    cardTable.playRounds(numberOfRounds)
  } catch (error) {
    console.error(error.message)
    console.log(`Process exit code: ${process.exitCode}`)
    process.exit()
  }
}

startGame()
