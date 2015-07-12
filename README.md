# Thunderdome
Galvanize's client-side stack:

* [Backbone](http://backbonejs.org/) and [React](https://facebook.github.io/react/) with ES2015 using the [Babel](https://babeljs.io/) transpiler
* [Less](http://lesscss.org/) with CSS minification
* Development and production build tasks with [Gulp](http://gulpjs.com/)
* Linting with [ESLint](http://eslint.org/)
* Testing with [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/) running on [Karma](http://karma-runner.github.io/)


### System Dependencies

[Node.js](https://nodejs.org/) should be installed on your system. We recommend installing it with [nvm](https://github.com/creationix/nvm#installation).

Once node is installed, make sure [Gulp](http://gulpjs.com/) is installed globally:

    npm install --global gulp


### Installation

Thunderdome can be installed with:

    npm install


### Development

Run the development environment with:

    gulp

A proxy server is built into the development environment. It can be configured in `gulpfile.js`.

For live-reload functionality, install the [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

Testing can be run with:

    npm test

Linting can be run with:

    gulp lint


### Production / Deployment

A production build can be created with:

    gulp build

By default it will build to the `dist` directory. Files are timestamped to trigger cache-busting.

The production directory can then be copied to the server / CDN.


Galvanize Product, 2015
