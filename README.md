# Pokedex - React Native Project

https://github.com/sergey-king/ts-pokedex/assets/48575848/7490bc34-41dd-4e66-9a30-34bb00139623

## Setup
This project is bootstrapped with `npx create-expo-app -t expo-template-blank-typescript`. 
For simplicity in testing, use the `Expo Go` client, but it can be modified to use EAS builds with development clients.
The project uses the latest EXPO SDK, version 49.

## Commands
- Run `npm install expo-cli --global`
- Run `npm i` inside the project folder
- Check TypeScript: `npm run ts:check`
- Check lint: `npm run lint`
- Start in production mode: `npm run start:production`
- Start in development mode: `npm run start`

Once Metro has started, press `i` to open the iOS simulator.

## Notes:
There are many wrappers for the PokeAPI available (https://pokeapi.co/docs/v2#wrap), but to demonstrate my skills, I created my own API slice to interact with the PokeAPI. To save time, I used the type definitions available from 'pokenode-ts' to ensure type parity.

## Navigation 
This project uses the newest Expo Router (next-generation file-based navigation - https://docs.expo.dev/routing/introduction/). It can also be configured with the latest React Navigation (https://reactnavigation.org/) if preferred.

## State Management
Redux with Redux Toolkit is used. This is the official Redux wrapper that simplifies most Redux tasks and eliminates a lot of boilerplate code (https://redux.js.org/introduction/why-rtk-is-redux-today).

## Data Fetching
RTK Query is employed. Similar to React Query but made to work with Redux/RTK (https://redux-toolkit.js.org/rtk-query/overview). This provides both data fetching and caching.

## Code Quality 
- eslint
- eslint-plugin-react
- eslint-plugin-react-native
- eslint-plugin-react-hooks

## Code Formatting 
- prettier

## TODO & Improvements
- Implement Styled Components/Emotion + Theming provider with Emotion.
- Add NetworkProvider to monitor network state and display connection state warnings/errors.
- Enhance error handling with Sentry Integration and performance profiling.
- Integrate analytics and screen tracking (Customer.io/Amplitude/GA, etc.).
- Develop Redux Slice tests and component tests.
- Improve GitHub setup with husky pre-commit hooks, automatic linting, and test runs.

## Extras
Redux with RTK toolkit was used because the latest Redux framework was a requirement for this assessment. However, I would be interested in completing this assessment using next-gen state management libraries like Recoil (by Facebook - https://recoiljs.org/), Jotai (https://jotai.org/), or Zustand (https://docs.pmnd.rs/zustand/getting-started/introduction).
