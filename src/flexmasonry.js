const defaultOptions = {
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
};

let _resizeId = null;
let _options = {};
let _targets = [];

function init(targets, options = {}) {
    if (typeof targets === 'string') {
        _targets = document.querySelectorAll(targets);
    } else {
        _targets = targets;
    }

    _options = Object.assign(defaultOptions, options);

    _targets.forEach(function(target) {
        setUp(target);
        setHeight(target);
    });

    addEventListeners();

    return this;
}

function setUp(target) {
    target.classList.add('flexmasonry');

    if (_options.responsive) {
        target.classList.add('flexmasonry-responsive');
    }

    setColsClass(target);

    Array.from(target.children).forEach(function(item) {
        item.classList.add('flexmasonry-item');
    });

    addBreakElements(target);
}

function onLoad() {
    _targets.forEach(function(target) {
        setHeight(target);
    });
}

function onResize() {
    if (_resizeId) {
        window.cancelAnimationFrame(_resizeId);
    }

    _resizeId = window.requestAnimationFrame(function() {
        refreshAll();
    });
}

function addEventListeners() {
    window.addEventListener('load', onLoad);
    window.addEventListener('resize', onResize);
}

function removeEventListeners() {
    window.removeEventListener('load', onLoad);
    window.removeEventListener('resize', onResize);
}

function setHeight(target) {
    if (getCurrentCols() < 2) {
        target.style.removeProperty('height');
        return;
    }

    let heights = [];

    Array.from(target.children).forEach(function(item) {
        if (item.classList.contains('flexmasonry-break')) {
            return;
        }

        const comp   = window.getComputedStyle(item);
        const order  = comp.getPropertyValue('order');
        const height = comp.getPropertyValue('height');

        if (!heights[order - 1]) {
            heights[order - 1] = 0;
        }
        heights[order - 1] += Math.ceil(parseFloat(height));
    });

    const maxHeight = Math.max(...heights);
    target.style.height = maxHeight + 'px';
}

function addBreakElements(target) {
    const breakEls = target.querySelectorAll('.flexmasonry-break');
    if (Array.from(breakEls).length === (getCurrentCols() - 1)) {
        return;
    }

    for (let i = 1; i < getCurrentCols(); i++) {
        const breakDiv = document.createElement('div');
        breakDiv.classList.add('flexmasonry-break');
        breakDiv.classList.add('flexmasonry-break-' + i);
        target.appendChild(breakDiv);
    }
}

function removeBreakElements(target) {
    const breakEls = target.querySelectorAll('.flexmasonry-break');
    if (Array.from(breakEls).length === (getCurrentCols() - 1)) {
        return;
    }

    Array.from(breakEls).forEach(function(breakEl) {
        breakEl.parentNode.removeChild(breakEl);
    });
}

function setColsClass(target) {
    if (target.classList.contains('flexmasonry-cols-' + getCurrentCols())) {
        return;
    }

    target.className = target.className.replace(/(flexmasonry-cols-\d+)/, '');
    target.classList.add('flexmasonry-cols-' + getCurrentCols());
}

function getCurrentCols() {
    if (!_options.responsive) {
        return _options.numCols;
    }

    const keys = Object.keys(_options.breakpointCols);
    for (const key of keys) {
        if (window.matchMedia('(' + key + ')').matches) {
            return _options.breakpointCols[key];
        }
    }

    return 1;
}

function refresh(target, options = {}) {
    _options = Object.assign(defaultOptions, options);

    setColsClass(target);
    removeBreakElements(target);
    addBreakElements(target);
    setHeight(target);

    return this;
}

function refreshAll(options = {}) {
    _targets.forEach(function(target) {
        refresh(target, options);
    });

    return this;
}

function destroyAll() {
    removeEventListeners();
}

export default {
    init,
    refresh,
    refreshAll,
    destroyAll,
}
