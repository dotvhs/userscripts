// ==UserScript==
// @name         Reveal & Copy Steam keys
// @namespace    http://t.me/AboutTheDot
// @version      2024-07-19
// @description  Adds two buttons on the Humble Bundle key page for easier revealing and copying keys.
// @author       dot
// @match        https://www.humblebundle.com/downloads?key=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humblebundle.com
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    const keyContainer = document.querySelector(".key-container.wrapper")
    const revealLink = document.createElement("a")
    revealLink.href = "#"
    revealLink.textContent = "Reveal keys"

    const copyLink = document.createElement("a")
    copyLink.href = "#"
    copyLink.textContent = "Copy keys to clipboard"

    const linksContainer = document.createElement("div")
    linksContainer.style = "display: flex; justify-content: flex-end; gap: 15px;"

    if (keyContainer) {
        linksContainer.appendChild(revealLink)
        linksContainer.appendChild(copyLink)
        keyContainer.appendChild(linksContainer)

        function revealKeys(event) {
            event.preventDefault();

            const keyList = keyContainer.querySelectorAll(".key-list .key-redeemer")

            keyList.forEach((element, index) => {
                setTimeout(function(){
                element.querySelector(".js-keyfield.keyfield.enabled").click()
                }, index * 1000);
            })
        }

        function copyKeys(event) {
            event.preventDefault();

            const keyList = keyContainer.querySelectorAll(".key-list .key-redeemer")
            let keys = ''

            keyList.forEach((element, index) => {
                const title = element.querySelector('.heading-text h4').textContent
                const key = element.querySelector('.keyfield-value').textContent
                keys += `${title.trim()}: ${key.trim()}\n`
            })

            GM_setClipboard(keys)
        }

        revealLink.addEventListener("click", revealKeys)
        copyLink.addEventListener("click", copyKeys)
    }

})();