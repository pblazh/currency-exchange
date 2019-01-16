Project description
===================

Installing
----------
The project is a mono-repo based on yarn workspaces.
To install dependencies and start the project in the development mode:

```bash
yarn
yarn build
yarn start
```
Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run tests call:
```bash
yarn test
```
To Launch the test runner in the interactive watch mode:
```bash
yarn test:watch
```

Project description
-------------------
As originally the back-end home task was sent to me I took it as a sign and decided to create a simple server as well. That gave me a possibility to not depend on third-party data providers and fake such features as fast-changing exchange rate and changing user account values. For simplicity, it is made just as random fluctuations.

The project contains three parts: server, client and common. The server is that API part, common is a small set of utils and typing which is used across the project and client is the biggest part, the test task itself. Each part is a separate npm package with its own scripts and dependencies.

Architectural decisions
-----------------------
I've started from a premise that this currency-exchange widget could be a part of a bigger application. So as a consequence I decided to introduce Redux, Redux-saga and split an application on independent modules. To fulfill the requirements of a bigger flexible application I chose the solution that is loosely based on a ducks-modular-redux, but with some changes to follow next principles:
1. Reducer, Action creator, sagas are divided and stored by a feature.
2. Action types have to be prefixed by the feature.
3. Modules have to provide selectors which are independent of the module mount point.
4. The initial state of the application is split by a module.
5. Mount points and react-redux connect are not hard-coded into a module and configured in only one place.
6. A module is not tightly coupled with a store mount point.
6. Modules are not coupled one to another.
7. It possible to dynamically import modules. 

So a module is a plain JavaScript function which:
 1. MUST export a default function `creator` which accepts one argument of type string a mount point.
 2. The `create` function MUST return an object representing the module instance
 3. The module instance object has to have the following structure:
    {
        mountPoint: String,                         // mount point passed to the create function
        actions: {[key: string]: ActionCreator},    // Array of action creators
        selectors: {[key: string]: Selector},       // Array of selectors
        reducer: (state, action) => state,          // Redux reducer
        saga: function,                             // optional, Redux saga
    }
 4. Saga MUST NOT have dependencies outside the module
 5. Actions, selectors, sagas MUST NOT depend on the mount point of a module
 6. An action creator MUST have property `type`
 7. Action types MUST have the form '<domain>.<module>.<mount_point>.<action>'

Correlation with The Atomic Workflow.
-------------------------------------
The approach with UI components was the same, to make them modular. The solution is based on Atomic design principles.
I introduced three-level separation of UI: Widgets, Components, and Atoms. 
- Widget. The independent part, which could be attached to the page. It is the only thing which is bound to the non-UI module.
- Component. The UI entity which is a part of a specific Widget and provides widget specific functionality.
- Atom. The UI entity which is a totally independent contains no busyness-logic and designed to be used as a simple building block for multiple Widgets.
The HOC components should also be stored with Atoms, since they a generic by definition and not be separate just because of their implementation.

Technological decisions
-----------------------
To prevent application part from importing things from sibling branches of the project structure were introduced global mappings:
 - @api
 - @atoms
 - @widgets
 - @store

 Where `@api` is plain JavaScript facade to the server API and `@store` is a container for modules + typings of a module system. After the consideration, I decided to remove `index.ts` from `@atoms` to encourage manual importing for a bundle optimization reasons. `@Store` however does not expose separate modules but rather list of instances in the `modules.ts`. The reason behind this is what I wanted it to be the place where the application structure is defined and separate modules could be stored in a separate npm package.

Front-end app is CRA generated for simplicity, which influenced the choice of technologies. 
For defining UI components styles I chose Sass, but probably using one of CSS-in-Js solution, Emotion, for example, would be preferable.