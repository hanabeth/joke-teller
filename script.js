const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS API
function tellJoke(joke) {
    VoiceRSS.speech({
        key: 'Provide Voice RSS API key here',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Call Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if Joke API returns two-part joke
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Test-to-Speech
        tellJoke(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch errors
        console.log('Error has occurred -> ', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);