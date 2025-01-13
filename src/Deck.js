/**
 * @file Module for the class Deck.
 * @module src/Deck
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a deck.
 */
export class Deck {
  /**
   * Array of playing cards.
   *
   * @type {PlayingCard[]}
   */
  #playingCards

  /**
   * Initializes a new instance of the Deck class.
   */
  constructor () {
    this.#playingCards = []

    for (const suit of PlayingCard.suits) {
      for (const rank of PlayingCard.ranks) {
        this.#playingCards.push(new PlayingCard(rank, suit))
      }
    }
  }

  /**
   * Shuffles the array of playing cards in place.
   */
  shuffle () {
    for (let i = this.#playingCards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.#playingCards[i], this.#playingCards[randomIndex]] = [this.#playingCards[randomIndex], this.#playingCards[i]]
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    return this.#playingCards.join(' ')
  }
}
