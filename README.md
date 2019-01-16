Project description
===================

Installing
----------
The project is a mono-repo based on yarn work spaces.
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

Architectural decisions
-----------------------
I've made a premise tha this widget is a part of a bigger application. So as consecutive decision I decided to introduce Redux, Redux-saga and split an application on independent modules.

The solution is loosely based on a ducks-modular-redux, but I introduced some changes to follow next principles:
1. Reducer, Action creator, sagas are divided and stored by a feature.
2. Action types have to be prefixed by the feature.
3. Modules have to provide selectors which are independent of the module mount point.
4. The initial state of the application is split by a module.
5. Mount points and react-redux connect are not hard-coded into a module and configured in only one place.
6. Module is not tightly coupled with a store mount point.
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
The approach with UI components was the same, to make them modular. The solution is based on an Atomic design principles.
I introduced three levels separation of UI for now: Widgets, Components, and Atoms. 
- Widget. The independent part which could be attached to the page. It is the only thing bound to the non-UI module.
- Component. The UI entity which is a part of a specific Widget and provides one widget specific functionality.
- Atom. The UI entity which is a totally independent, contains no busyness-logic and designed to be used as a simple building block for multiple Widgets.

Technological decisions
-----------------------
Front-end app is CRA generated for simplicity, which influenced the choice of technologies. 
For defining UI components styles I chose Sass, but probably using one of CSS in Js solution would be preferable.
