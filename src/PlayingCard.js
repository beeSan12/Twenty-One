/**
 * @file Module for the class PlayingCard.
 * @module src/PlayingCard
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 2.0.0
 */

/**
 * Represents a playing card.
 */
export class PlayingCard {
  static ranks = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
  static suits = Object.freeze(['♣', '♦', '♥', '♠'])

  /**
   * Creates a new PlayingCard object.
   *
   * @param {number} rank - The playing card's rank.
   * @param {string} suit - The playing card's suit.
   */
  constructor (rank, suit) {
    /**
     * The playing card's rank.
     *
     * @type {number}
     */
    this.rank = rank

    /**
     * The playing card's suit.
     *
     * @type {string}
     */
    this.suit = suit

    // Make the object immutable.
    Object.freeze(this)
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    // If Ace, Jack, Queen, or King use the first character; otherwise the rank.
    let rankText
    switch (this.rank) {
      case 1:
        rankText = 'A'
        break
      case 11:
        rankText = 'J'
        break
      case 12:
        rankText = 'Q'
        break
      case 13:
        rankText = 'K'
        break
      default:
        rankText = this.rank.toString()
    }

    return rankText + this.suit
  }

  /**
   * Returns the primitive value of the specified object.
   *
   * @returns {number} The primitive value of the specified object.
   */
  valueOf () {
    return this.rank
  }
}
