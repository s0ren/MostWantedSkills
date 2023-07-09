if (!window.JIX) { window.JIX = {}; }

function isVisible(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

async function send(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch(_ => { /* Ignore errors */ });
}

function on(element, eventName, selector, fn) {
    element.addEventListener(eventName, function (event) {
        const realTarget = event.target.closest(selector);
        if (realTarget) {
            return fn.call(realTarget, event);
        }
    });
}

JIX.registerExposure = async function(selector) {
    const elems = document.querySelectorAll(selector);
    const data = {};

    for (const elem of elems) {
        if (isVisible(elem) && !elem.dataset.beaconExposed) {
            data[elem.dataset.beaconTid] = {
                catid: elem.dataset.catid,
                cattype: elem.dataset.cattype,
            };
            elem.dataset.beaconExposed = true;
        }
    }

    if (Object.keys(data).length > 0) {
        return send('/beacon', data);
    }
};

on(document, 'mousedown', 'a[data-click]', async function () {
    const click = this.dataset.click || '';
    if (click.startsWith("mailto:")) {
        return send('/api/click.json', {
            tid: this.dataset.tid,
            url: click.substring(7),
        });
    } else {
        this.setAttribute('href', click);
    }
});

JIX.registerExposure('[data-beacon-tid]');
