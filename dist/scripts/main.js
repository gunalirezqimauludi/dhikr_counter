'use strict';

console.info('Yeah!! dhikr counter app.');

// Set default counter
var count = 0;

// Toogle to show main segment
toogleSegment('main');

// Test browser support
if ('webkitSpeechRecognition' in window) {

    // This will invite the user to allow a page access to their microphone.
    // the only browser that supports this API is Chrome
    // creating a speech recognition object
    var recognition = new webkitSpeechRecognition();

    // Sets the type of the recognition (one-shot or continuous).
    // If its value is set to true we have a continuous recognition,
    // otherwise the process ends as soon as the user stops talking.
    // Recogniser doesn't stop listening even if the user pauses
    recognition.continuous = false;

    // Specifies if we want interim results.
    // If its value is set to true we’ll have access to interim results that we can show to the users to provide feedback.
    // If the value is false, we’ll obtain the results only after the recognition ends. By default it’s set to false.
    recognition.interimResults = false;

    // Sets a callback that is fired when a speech recognition error occurs. Listen for errors
    recognition.onerror = function(event) {
        console.log(event.error);
    };

    // Sets a callback that is fired when the service has disconnected.
    recognition.onend = function() {
        recognition.start();
    };

    // Sets a callback that is fired when the speech recognizer returns a result.
    recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript);
        if (event.results[0][0].transcript == 'Subhanallah') {
            countDictation('Subhanallah', 'Alhamdulillah');

            // Change background color
            $('body').css('background-color', '#9B4DCA');
        } else if (event.results[0][0].transcript == 'Alhamdulillah') {
            countDictation('Alhamdulillah', 'Allahu Akbar');

            // Change background color
            $('body').css('background-color', '#FF6D00');
        } else if (event.results[0][0].transcript == 'Allahu Akbar') {
            countDictation('Allahu Akbar', 'Alhamdulillah');

            // Change background color
            $('body').css('background-color', '#304FFE');
        }
    };
}

function startDictation(event) {

    // Toogle to show content segment
    toogleSegment('content');

    // Set default dictation text
    $('#dictation').text('( Subhanallah )');

    // Setting the language that the speaker is using
    recognition.lang = 'id';

    // Start talking and when you stop the onresult
    recognition.start();
}

// Toogle to show content segment
function countDictation(dictation, nextDictation) {
    // console.log('dictation : ' + dictation + ', next dictation : ' + nextDictation);
    count = count + 1;

    // Set dictation text
    $('#dictation').text('( ' + dictation + ' )');
    if (count > 33) {

        // Change dictation text
        $('#dictation').text('( ' + nextDictation + ' )');

        // Reset counting
        count = 0;
    }

    // Set value counting
    $('.counter').html(count);
}

// Toogle segment
function toogleSegment(div) {
    if (div == 'main') {
        $('#main').show();
        $('#content').hide();
    } else if (div == 'content') {
        $('#main').hide();
        $('#content').show();
    }
}
