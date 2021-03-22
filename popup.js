document.addEventListener('DOMContentLoaded', () => {
    let delay = 1000;
    let wpm = 500;
    let interval;
    let timeout;
    
    const displayTextDiv = document.getElementById('display-text');

    document.getElementById('read').addEventListener('click', onclick, false);
    document.getElementById('cancel').addEventListener('click', cancel, false);
    document.getElementById('fontsize').addEventListener('change', fontsize, false);

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'hi', start)
            }
        )
    }

    function start (res) {
        cancel();
        showDisplay();
        const words = res.text.split(/\s+/).filter(Boolean);
        wpm = document.getElementById('wpm').value || 500;
        const speed = 1000 * 60 / wpm;
        let i = 0;

        timeout = setTimeout(() => {
            interval = setInterval(() => {
                if (i < words.length) {
                    displayTextDiv.innerHTML = words[i++];
                } else {
                    cancel({
                        words: words.length
                    });
                }
            }, speed);
        }, delay);
    }

    function showDisplay() {
        displayTextDiv.innerHTML = 'get ready';
    }

    function cancel (stats) {
        clearInterval(interval);
        clearTimeout(timeout);
        
        if (stats) {
            displayTextDiv.innerHTML = `You read\n${stats.words} words!`;
        } else {
            displayTextDiv.innerHTML = 'highlight text then push read';
        }
    }

    function fontsize(event) {
        displayTextDiv.style['font-size'] = `${event.target.value}em`;
    }
}, false);

