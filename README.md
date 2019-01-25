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
    ```JavaScript
    {
        mountPoint: String,                         // mount point passed to the create function
        actions: {[key: string]: ActionCreator},    // Array of action creators
        selectors: {[key: string]: Selector},       // Array of selectors
        reducer: (state, action) => state,          // Redux reducer
        saga: function,                             // optional, Redux saga
    }
    ```
 4. Saga MUST NOT have dependencies outside the module
 5. Actions, selectors, sagas MUST NOT depend on the mount point of a module
 6. An action creator MUST have property `type`
 7. Action types MUST have the form '<domain>.<module>.<mount_point>.<action>'

Correlation with The Atomic design.
-----------------------------------
The approach with UI components was the same, to make them modular. The solution is based on Atomic design principles.
I introduced three-level separation of UI: Widgets, Components, and Atoms. 
- **Widget.** An independent part, which could be attached to the page. It is the only thing which is bound to the non-UI module.
- **Component.** The UI entity which is a part of a specific Widget and provides a widget specific functionality.
- **Atom.** The UI entity which is a totally independent contains no busyness-logic and designed to be used as a simple building block for multiple Widgets.
The HOC components should also be stored with Atoms, since they a generic by definition and not be separate just because of their implementation.

Technological decisions
-----------------------
To prevent application part from importing things from sibling branches of the project structure were introduced global mappings:
 - @api
 - @atoms
 - @widgets
 - @store

 Where:
 - `@api` is a plain JavaScript facade to the server API.
 - `@store` is a container for modules + typings of a module system.

 `Components` are not exposed externally as they are `widget`-specific.

 After the consideration, I decided to remove `index.ts` from `@atoms` to encourage manual importing for a bundle optimization reasons. 
 
 `@Store` however does not expose separate modules but rather list of instances in the `modules.ts`. The reason behind this is what I wanted it to be the place where the application structure is defined and separate modules could be stored in a separate npm package.

Front-end app is CRA-generated for simplicity, which influenced the choice of technologies. 
For defining UI components styles I here I used Sass, but, probably using one of CSS-in-JS solution, Emotion, for example, would be more  beneficial.

To Be Done
----------

A few things I haven't done intentionally as they make application code harder to understand and harder to reason about.
- I haven't introduced CSS-in-JS, as it is more a practical solution for a styles leaking-out problem, and have no architectural impact.
- All money calculation should not be done on floats, but rather use a big decimals representation. I a real app I would use big.js but for now, all operation on numbers here is a fake.
- I only implemented pager and leave out swiping, as making a decent swiper from scratch is quite a lot of work, and using a third-party solution will clutter the code.
- I didn't invest time into the cross device support and into the responsiveness, since I had no requirements. The only thing I've made is that on smaller screen the size of the App is 100%.
- I haven't added any trimming to the input field.
- There were no attempts to introduce i18n and accessibility.


First amendment
---------------
I was asked to improve solution so after the considerations I did the next things:

- Removed floats. An amount is now stored in "cents". That is not the perfect solution as it doesn't answer the question of how many shillings in a half-sovereign, but good enough for now.
- Now I store exchange rate in a string and only parse float when exchange.
- I've made a custom parser for the input to not use parseFloat even there.
- After the consideration, I introduced a dedicated js library Dinero.js for exchanging amounts and formatting monetary values even though it is overkill now.

Second amendment
----------------
- Created a simple money transfer. No errors handling, no overdrafts control, etc for now.
