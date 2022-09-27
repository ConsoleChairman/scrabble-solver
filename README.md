![alt Scrabble Solver 2](https://raw.githubusercontent.com/kamilmielnik/scrabble-solver/master/img/logo.png)

https://scrabble-solver.org

# scrabble-solver

The ultimate, open-source cheating app for [Scrabble](https://en.wikipedia.org/wiki/Scrabble) and [Literaki](https://pl.wikipedia.org/wiki/Literaki).

Available at https://scrabble-solver.org in English, French, German, Polish & Spanish.

Run it locally for better performance (your machine surely is faster than that server).

It's cross-platform - all you need is [Node.js](https://nodejs.org/).

![Version](https://img.shields.io/github/package-json/v/kamilmielnik/scrabble-solver)
![License](https://img.shields.io/npm/l/scrabble-solver)
![Node version](https://img.shields.io/node/v/scrabble-solver)
![Dependencies](https://img.shields.io/librariesio/release/npm/scrabble-solver)
![Build](https://github.com/kamilmielnik/scrabble-solver/workflows/Build/badge.svg)
![Test](https://github.com/kamilmielnik/scrabble-solver/workflows/Test/badge.svg)
![ESLint](https://github.com/kamilmielnik/scrabble-solver/workflows/ESLint/badge.svg)

![alt User Interface](https://raw.githubusercontent.com/kamilmielnik/scrabble-solver/master/img/screencast.gif)

## Run

```Shell
npx scrabble-solver
```

or

```Shell
npm install -g scrabble-solver

# and then run anytime with:
scrabble-solver
```

Open http://localhost:3333/ if it didn't open up for you.

## Uninstall

```Shell
npm uninstall -g scrabble-solver

# The package stores logs and dictionaries in $HOME/.scrabble-solver
# It uses os.homedir() to get $HOME location.
rm -rf $HOME/.scrabble-solver
```

## Requirements

- [Node.js](https://nodejs.org/) 16+
- min. `1000px x 700px` viewport size (`1500px x 1200px` recommended)

## Dictionaries

| Language   | Word list                                                                     | Word list                                                                                                                                | Word definitions                                    |
|------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| 🇬🇧 English | [SOWPODS](https://en.wikipedia.org/wiki/Collins_Scrabble_Words)               | [Source](https://www.wordgamedictionary.com/sowpods/download/sowpods.txt)                                                                | [Merriam-Webster](https://www.merriam-webster.com/) |
| 🇺🇸 English | [TWL06](https://en.wikipedia.org/wiki/NASPA_Word_List)                        | [Source](https://www.wordgamedictionary.com/twl06/download/twl06.txt)                                                                    | [Merriam-Webster](https://www.merriam-webster.com/) |
| 🇫🇷 French  | [hbenbel/French-Dictionary](https://github.com/hbenbel/French-Dictionary/)    | [Source](https://raw.githubusercontent.com/hbenbel/French-Dictionary/a573eab10cc798d7d5da7daab4d2ac0259bb46a3/dictionary/dictionary.txt) | [CNRTL](https://www.cnrtl.fr/)                      |
| 🇩🇪 German  | [HanSolo80/German-Dictionary](https://github.com/HanSolo80/German-Dictionary) | [Source](https://raw.githubusercontent.com/HanSolo80/German-Dictionary/master/dictionary.txt)                                            | [DWDS](https://www.dwds.de)                         |
| 🇵🇱 Polish  | [SJP.PL](https://sjp.pl/slownik/dp.phtml)                                     | [Source](https://sjp.pl/slownik/growy/)                                                                                                  | [SJP.PL](https://sjp.pl)                            |
| 🇪🇸 Spanish | [FISE-2](https://fisescrabble.org/)                                           | [Source](https://github.com/kamilmielnik/fise-2/blob/master/fise-2.txt)                                                                  | [Diccionarios.com](https://www.diccionarios.com/)   |

## Tech stack

- [Lerna](https://lerna.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
