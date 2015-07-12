# Thunderdome
Galvanize's client-side stack: Backbone/React with ES2015

Includes:
* [Backbone](http://backbonejs.org/) and [React](https://facebook.github.io/react/) written with ES2015 using the [Babel](https://babeljs.io/) transpiler
* [Less](http://lesscss.org/) with CSS minification
* Development and production build tasks with [Gulp](http://gulpjs.com/)
* Linting with [ESLint](http://eslint.org/)


### System Dependencies

[Node.js](https://nodejs.org/) should be installed on your system. I recommend installing it with [nvm](https://github.com/creationix/nvm#installation).

Once node is installed, make sure [Gulp](http://gulpjs.com/) is installed globally:

    npm install --global gulp


### Installation

The playground can then be installed with:

    npm install

And run with:

    npm start

Open `http://localhost:8080` in your browser.

Start hacking on `index.html` and `src/app.less`


### Development



### Production / Deployment




Multiple pages are currently not supported.

[Sass](http://sass-lang.com/) has a watch built into its command line tool, unlike Less.

Live reload also has a [number of options](https://github.com/livereload/livereload-js). Installing the [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) allows the `<script src="http://localhost:35729/livereload...` line to be removed from `index.html`.

aodin, 2015
