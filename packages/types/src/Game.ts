export enum Game {
  Kelimelik = 'kelimelik',
  Literaki = 'literaki',
  Scrabble = 'scrabble',
  ScrabbleDuel = 'scrabble-duel',
  SuperScrabble = 'super-scrabble',
}

const games = Object.values(Game);

export const isGame = (locale: unknown): locale is Game => games.includes(locale as Game);
