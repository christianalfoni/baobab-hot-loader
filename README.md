# baobab-hot-loader
Using Webpack hot replacement update your application state without reload

Watch a preview of the functionality on youtube: [Hot loading application state with Baobab and Webpack](https://www.youtube.com/watch?v=iVYF-_gjJGg).

## Features
- Hot loads changes to the Baobab tree
- Does a diff on changes so that any changes to state tree done through application code is not reset

## What does this mean?
Would it not be great to have a workflow where the browser never refreshes? Combine `baobab-hot-loader` with the `react-hot-loader` and `style-loader` and you are closing in on it.