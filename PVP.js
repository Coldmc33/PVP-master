// ==UserScript==
// @name         pvp master
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Enhance your PVP experience on miniblox.
// @author       You
// @match        https://miniblox.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=miniblox.io
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/496989/pvp%20master.user.js
// @updateURL https://update.greasyfork.org/scripts/496989/pvp%20master.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const KEY_F = 'f';
    const MIN_ZOOM = 50; // 50%
    const MAX_ZOOM = 500; // 500%
    const ZOOM_INCREMENT = 20; // 20%

    let zoomLevel = 100; // Start at 100%

    function zoomCanvas(zoomChange) {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            console.error('Canvas not found.');
            return;
        }

        zoomLevel = Math.min(Math.max(zoomLevel + zoomChange, MIN_ZOOM), MAX_ZOOM);
        canvas.style.transform = `scale(${zoomLevel / 100})`;
        displayZoomLevel();
    }

    function displayZoomLevel() {
        // Display the current zoom level on the screen
        let zoomDisplay = document.getElementById('zoom-display');
        if (!zoomDisplay) {
            zoomDisplay = document.createElement('div');
            zoomDisplay.id = 'zoom-display';
            zoomDisplay.style.position = 'absolute';
            zoomDisplay.style.top = '10px';
            zoomDisplay.style.right = '10px';
            zoomDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            zoomDisplay.style.color = 'white';
            zoomDisplay.style.padding = '5px';
            document.body.appendChild(zoomDisplay);
        }
        zoomDisplay.textContent = `Zoom Level: ${zoomLevel}%`;
    }

    function handleZoom(event) {
        if (event.key.toLowerCase() === KEY_F) {
            if (event.type === 'keydown') {
                zoomCanvas(ZOOM_INCREMENT);
            } else if (event.type === 'keyup') {
                zoomCanvas(100 - zoomLevel);
            }
        }
    }

    window.addEventListener('keydown', handleZoom);
    window.addEventListener('keyup', handleZoom);

    document.addEventListener('wheel', function(event) {
        event.preventDefault();
        const direction = event.deltaY > 0 ? -1 : 1;
        zoomCanvas(ZOOM_INCREMENT * direction);
    });
})();
