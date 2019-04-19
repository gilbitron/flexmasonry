[![npm](https://img.shields.io/npm/v/flexmasonry.svg)](https://www.npmjs.com/package/flexmasonry)

# FlexMasonry

FlexMasonry is a lightweight, zero-dependency, masonry (cascading grid layout) library powered by CSS flexbox. The library itself is inspired by [this article by Tobias Ahlin](https://tobiasahlin.com/blog/masonry-with-css/) on using `flex`, `:nth-child()`, and `order` to create a pure CSS masonry layout (as opposed to the hugely popular [Masonry library by David DeSandro](https://masonry.desandro.com/) that is powered by Javascript). I've taken this concept and sprinkled in some Javascript to tie it all together and make it easy to use.

## Features

* **Lightweight** - Just 6KB of JS and CSS
* **Fast** - Uses CSS flexbox for layout
* **Responsive** - Show different number of columns at different breakpoints
* **Simple** - Just 3 options

## Install

* Download the [latest release](https://github.com/gilbitron/flexmasonry/releases).
* Clone this repo.
* Install using NPM/Yarn:

```
npm install flexmasonry
yarn add flexmasonry
```

Then, include the `flexmasonry.js` and `flexmasonry.css` files from the `dist` folder in your HTML. Or you can use the files directly from a CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/flexmasonry/dist/flexmasonry.css">
<script src="https://unpkg.com/flexmasonry/dist/flexmasonry.js"></script>
```

## Usage

Set up your HTML. For example:

```html
<div class="grid">
    <div><img src="https://source.unsplash.com/t3DHojIo-08" alt=""></div>
    <div><img src="https://source.unsplash.com/Imc-IoZDMXc" alt=""></div>
    <div><img src="https://source.unsplash.com/SOZWHqeXcPQ" alt=""></div>
    <div><img src="https://source.unsplash.com/bkdzvgBB7rQ" alt=""></div>
    <div><img src="https://source.unsplash.com/Aruugw_rJCM" alt=""></div>
</div>
```

Then hook up the script, passing in the selector target:

```js
FlexMasonry.init('.grid');
```

FlexMasonry will then convert all `.grid` elements to masonry grids will multiple columns.

## Options

The second, optional, parameter of the `init` method is an object containing options. The default options are as follows:

```js
{
    /*
     * If `responsive` is `true`, `breakpointCols` will be used to determine
     * how many columns a grid should have at a given responsive breakpoint.
     */
    responsive: true,
    /*
     * A list of how many columns should be shown at different responsive
     * breakpoints, defined by media queries.
     */
    breakpointCols: {
        'min-width: 1500px': 6,
        'min-width: 1200px': 5,
        'min-width: 992px': 4,
        'min-width: 768px': 3,
        'min-width: 576px': 2,
    },
    /*
     * If `responsive` is `false`, this number of columns will always be shown,
     * no matter the width of the screen.
     */
    numCols: 4,
}
```

For example, to always shown 6 columns in your grid:

```js
FlexMasonry.init('.grid', {
    responsive: false,
    numCols: 6
});
```

## Methods

The `FlexMasonry` variable has several methods:

**`init(targets, options = {})`**

Initialises the FlexMasonry library and sets up the `targets` as masonry grids.

* `targets` can be a string, an array of elements or a `Node​List`.
* `options` [see above](#options).

**`refresh(target, options = {})`**

Refreshes the `target` grid layout.

* `targets` can be a string, an array of elements or a `Node​List`.
* `options` [see above](#options).

**`refreshAll(options = {})`**

Refreshes the grid layouts of all `targets` passed to `init()`.

* `options` [see above](#options).

**`destroyAll()`**

Removes the event listeners for all `targets` passed to `init()`.

## Development

Run `yarn` to install the dependencies and use `demo/index.html` to test things. To watch/build the library:

```
yarn watch
yarn build
```

## FAQ

> Why not just use pure CSS?

A good question! You _can_ use pure CSS to achieve the same outcome. However, there are several aspects of this setup that require a bit of "dynamic" updating to make it flexible and easy to use (hence the use of Javascript). The main one being that the masonry container requires a fixed height (which FlexMasonry calculates on the fly). Also the masonry container needs a certain number of "break" elements to work properly depending on the number of columns. To enable this, and to support having a different number of columns at different responsive breakpoints, we need Javascript.

## Credits

FlexMasonry was created by [Gilbert Pellegrom](https://gilbitron.me) from [Dev7studios](https://dev7studios.co). Released under the MIT license.
