'use strict';

console.info('Yeah!! dhikr counter app.');

// set default counter
var count = 0;

// show main & hidden content
toogleDiv('main');

// check SpeechRecognition support
if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onerror = function(event) {
        console.log(event.error);
    };

    recognition.onend = function() {
        recognition.start();
    };

    recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript);
        if (event.results[0][0].transcript == 'Subhanallah') {
            countDictation('Subhanallah', 'Alhamdulillah');
        } else if (event.results[0][0].transcript == 'Alhamdulillah') {
            countDictation('Alhamdulillah', 'Allahu Akbar');
        } else if (event.results[0][0].transcript == 'Allahu Akbar') {
            countDictation('Allahu Akbar', 'Alhamdulillah');
        }
    };
}

function startDictation(event) {
    toogleDiv('content');
    recognition.lang = 'id';
    recognition.start();
}

function countDictation(dictation, nextDictation) {
    console.log('dictation : ' + dictation + ' next dictation : ' + nextDictation);
    count = count + 1;
    $('#dicttext').text('( ' + dictation + ' )');
    if (count > 33) {
        $('#dicttext').text('( ' + nextDictation + ' )');
        count = 0;
    }
    $('.counter').html(count);
}

function toogleDiv(div) {
    if (div == 'main') {
        $('#main').show();
        $('#content').hide();
    } else if (div == 'content') {
        $('#main').hide();
        $('#content').show();
        $('body').css('background-color', '#9b4dca');
    }
}
