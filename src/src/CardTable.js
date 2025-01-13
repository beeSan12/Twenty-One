/**
 * @file Module for the class CardTable.
 * @module src/CardTable
 * @author // Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 2.0.0
 */

import { Deck } from './Deck.js'
import { PlayingCard } from './PlayingCard.js'
import { Player } from './Player.js'

/**
 * Represents a table for playing the game of Twenty-One.
 *
 * @class
 */
export class CardTable {
  #dealer
  #deck
  #discardPile
  #players

  /**
   * Creates a new card table with a dealer, players, deck and discard pile.
   *
   * @param {number} numberOfPlayers - The number of players.
   */
  constructor (numberOfPlayers) {
    this.#dealer = new Player('Dealer', 17)
    this.#deck = new Deck()
    this.#discardPile = []
    this.#players = []

    for (let i = 0; i < numberOfPlayers; i++) {
      const standValue = Math.floor(Math.random() * 3) + 16 // The players stand value is between 16 and 18.
      this.#players.push(new Player(`Player ${i + 1}`, standValue))
    }
  }

  /**
   * Compares the players' hands to the dealer's hand and determines the winner.
   *
   * @param {Player} player - The player.
   * @param {Player} dealer - The dealer.
   * @returns {Player} - The winner of the game.
   */
  #compareHands (player, dealer) {
    let winner = null

    if (player.valueOf() > dealer.valueOf()) {
      winner = player
    } else if (player.valueOf() < dealer.valueOf()) {
      winner = dealer
    } else {
      // If the player and the dealer have the same value, the dealer wins.
      winner = dealer
    }
    return winner
  }

  /**
   * Deals cards to the player.
   * If the deck has less than two cards, the discard pile is shuffled into the deck.
   *
   * @returns {PlayingCard} - The card that was dealt.
   */
  #deal () {
    return this.#deck.deal()
  }

  /**
   * Plays out a round of the game.
   * Dealer deals one cards to each player.
   * Dealer gets one card.
   *
   * @param {Player} player - The players for the round.
   * @param {Player} dealer - The dealer for the round.
   */
  #playOut (player, dealer) {
    let winner = null
    // Deal cards to the player until the player can't hit
    while (player.canHit) {
      if (this.#deck.count() === 1) {
        for (let i = 0; i < this.#discardPile.length; i++) {
          this.#deck.add(this.#discardPile.pop())
        }
        this.#deck.shuffle()
      }
      player.addToHand(this.#deal())
    }
    if (player.isBusted) {
      winner = dealer
    } else if (player.isNaturalWinner) {
      // Dealer does not get a turn
      winner = player
    }

    if (winner === null) {
      // Deal cards to the dealer until the dealer can't hit
      while (dealer.canHit) {
        if (this.#deck.count() === 1) {
          for (let i = 0; i < this.#discardPile.length; i++) {
            this.#deck.add(this.#discardPile.pop())
          }
          this.#deck.shuffle()
        }
        dealer.addToHand(this.#deal())
      }

      if (dealer.isBusted) {
        winner = player
      } else if (dealer.isNaturalWinner) {
        winner = dealer
      }
    }

    if (winner === null) {
      winner = this.#compareHands(player, dealer)
    }
    if (dealer.isNaturalWinner || player.isNaturalWinner) {
      console.log(`${player.toString()} ${dealer.toString()}${winner ? ` ${winner.getNickname()} is a natural winner!` : ''}`)
    } else if (player.valueOf() === dealer.valueOf()) {
      console.log(`${player.toString()} ${dealer.toString()} It's a tie!${winner ? ` ${winner.getNickname()} wins!` : ''}`)
    } else {
      console.log(`${player.toString()} ${dealer.toString()}${winner ? ` ${winner.getNickname()} wins!` : ''}`)
    }

    this.#discardPile.push(...player.discardHand())
    this.#discardPile.push(...dealer.discardHand())
  }

  /**
   * Plays a number of rounds of the game.
   *
   * @param {number} numberOfRounds - The number of rounds to play.
   */
  playRounds (numberOfRounds) {
    this.#deck.shuffle()
    for (let round = 1; round <= numberOfRounds; round++) {
      // Deal one card to each player
      for (let i = 0; i < this.#players.length; i++) {
        if (this.#deck.count() === 1 && this.#discardPile.length === 0) {
          process.exitCode = 28
          throw new Error('Deck is empty')
        }

        if (this.#deck.count() === 1) {
          for (let j = 0; j < this.#discardPile.length; j++) {
            this.#deck.add(this.#discardPile.pop())
          }
          this.#deck.shuffle()
        }
        this.#players[i].addToHand(this.#deal())
      }

      for (let i = 0; i < this.#players.length; i++) {
        this.#playOut(this.#players[i], this.#dealer)
      }
    }
  }
}
