# Pokedex REPL

A project for [boot.dev](https://www.boot.dev/) backend TypeScript course: [Build a Pokedex in TypeScript](https://www.boot.dev/courses/build-pokedex-cli-typescript)

## Tools used

- WSL enviroment
- [NVM](https://github.com/nvm-sh/nvm) for Node version management
- TypeScript
- Vitest
- Node.js [interface](https://nodejs.org/api/readline.html#readlinecreateinterfaceoptions) for REPL
- [JSON Lint](https://jsonlint.com/)
- [JSON to TS converter](https://transform.tools/json-to-typescript)
- [PokeAPI](https://pokeapi.co/)

## Thoughts

- Do I really need so many type definitions. Should I just package them their own file?
- ~~What was I supposed to do with fetchLocation() in pokeapi.ts?~~ **DELETED**
- ~~Need more error handling~~ **ALL COMMANDS HANDLED**
- ~~The readline interface does not print the new line `POKEDEX > ` after callbacks. Should fix this.~~ **FIXED**

## Ideas for Extending the Project
### [from Boot.dev](https://www.boot.dev/lessons/a634e1eb-5c90-4463-8164-484def656040)

- Simulate battles between pokemon
- Add more unit tests
- Keep pokemon in a "party" and allow them to level up
- Allow for pokemon that are caught to evolve after a set amount of time
- Persist a user's Pokedex to disk so they can save progress between sessions
- Use the PokeAPI to make exploration more interesting. For example, rather than typing the names of areas, maybe you are given choices of areas and just type "left" or "right"
- Random encounters with wild pokemon
- Adding support for different types of balls (Pokeballs, Great Balls, Ultra Balls, etc), which have different chances of catching pokemon

### My ideas

- [Ink](https://github.com/vadimdemedes/ink)