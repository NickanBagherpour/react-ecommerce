# Learning React with E-commerce Project

* create project with `npx create-react-app <project-name>`
* remove unnecessary files
* add files to git and make initial commit
* create and switch to `develop` branch
* `npm install node-sass`

----
## Other Packages
> for routing use `npm install react-router-dom`

> add firebase `npm install firebase` for backend purposes [ db , auth ]

> add `npm install redux redux-logger react-redux`
- add redux to our application so we can leverage all the benefits that come with uni-directional data flow. Instead of the prop drilling we would have to do in order to pass our new user object down deeper into our component trees from our app, we can now just connect those components directly to our redux store where we store all our data.

> add `npm install reselect` for creating memoized "selector" functions

> add `npm install redux-persist`
- We don't want our users to lose their some info (e.g. carts) whenever they refresh, so we are going to leverage one of the benefits of redux by persisting our store object in localstorage using redux-persist.

