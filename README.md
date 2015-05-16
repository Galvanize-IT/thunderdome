# less-playground
A live-reload environment for Less


### Install

[Node.js](https://nodejs.org/) should be installed on your system. I recommend installing it with [nvm](https://github.com/creationix/nvm#installation).

Once node is install on your system, make sure [Gulp](http://gulpjs.com/) is installed globally:

    npm install --global gulp

The playground can then be installed with:

    npm install

And run with:

    npm start

Open `http://localhost:8080` in your browser.

Start hacking on `index.html` and `src/app.less`


### Notes

Multiple pages are currently not supported.

[Sass](http://sass-lang.com/) has a watch built into its command line tool, unlike Less.

Live reload also has a [number of options](https://github.com/livereload/livereload-js). Installing the [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) allows the `<script src="http://localhost:35729/livereload...` line to be removed from `index.html`.

aodin, 2015
