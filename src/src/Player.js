/**
 * @file Module for the class Player.
 * @module src/Player
 * @author // Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 2.0.0
 */
import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a player in the game of Twenty-One.
 *
 * @class
 */
export class Player {
  #hand = []
  #nickname = ''
  #standValue = 0

  /**
   * Initializes a new instance of the Player class.
   *
   * @param {string} nickname - The nickname of the player.
   * @param {number} standValue - The value at which the player will stand.
   */
  constructor (nickname, standValue = 14) {
    this.#nickname = nickname
    this.#standValue = standValue
    this.#hand = []
  }

  /**
   * Determines if the player can hit (draw another card).
   *
   * @returns {boolean} True if the player can hit, false otherwise.
   */
  get canHit () {
    return this.#hand.length < 5 && !this.isBusted && this.valueOf() < this.#standValue
  }

  /**
   * Returns a boolean indicating whether the player's hand value is over 21.
   *
   * @returns {boolean} True if the player is busted, false otherwise.
   */
  get isBusted () {
    return this.valueOf() > 21
  }

  /**
   * Checks if the two cards in the players hand has a value of 21 together, and if so, is a natural winner.
   *
   * @returns {boolean} True if the player has a natural win, false otherwise.
   */
  get isNaturalWinner () {
    return (this.valueOf() === 21 && this.#hand.length === 2) || (this.valueOf() < 21 && this.#hand.length === 5)
  }

  /**
   * Returns the nickname of the player.
   *
   * @returns {string} The nickname of the player.
   */
  getNickname () {
    return this.#nickname
  }

  /**
   * Adds a card to the player's hand if the hand has less than 5 cards.
   *
   * @param {PlayingCard} playingCard - The card to add to the player's hand.
   */
  addToHand (playingCard) {
    this.#hand.push(playingCard)
  }

  /**
   * Discards all cards in the player's hand and returns them.
   *
   * @returns {PlayingCard[]} The cards that were discarded.
   */
  discardHand () {
    const discardedHand = this.#hand
    this.#hand = []
    return discardedHand
  }

  /**
   * Returns a string representation of the player's hand and its value.
   *
   * @returns {string} A string representation of the player's hand and its value.
   */
  toString () {
    if (this.#hand.length === 0) {
      return `${this.#nickname} - Hand: -`
    }

    const cards = this.#hand.map((card) => card.toString()).join(', ')

    return `${this.#nickname} - Hand: ${cards} - Value: ${this.valueOf()}`
  }

  /**
   * Returns the calculated value of the player's hand.
   *
   * @returns {number} The calculated value of the player's hand.
   */
  valueOf () {
    let handValue = 0
    let acesCountedAsFourteen = 0

    for (const card of this.#hand) {
      handValue += card.valueOf()

      if (card.rank === 1) {
        acesCountedAsFourteen++
        handValue += 13
      }
    }

    while (handValue > 21 && acesCountedAsFourteen > 0) {
      handValue -= 13
      acesCountedAsFourteen--
    }

    return handValue
  }
}
