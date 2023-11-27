// // // // main.js

// let recognition;

// function startVoiceRecognition() {
//   const speechInput = document.getElementById('speechInput');
//   const startButton = document.getElementById('startButton');

//   if (!recognition) {
//     recognition = new webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = function (event) {
//       const transcript = event.results[event.results.length - 1][0].transcript;
//       speechInput.value += transcript;
//     };

//     recognition.onend = function () {
//       startButton.innerText = 'Start Voice Recognition';
//     };
//   }

//   if (recognition && recognition.isStarted) {
//     recognition.stop();
//     startButton.innerText = 'Start Voice Recognition';
//   } else {
//     recognition.start();
//     startButton.innerText = 'Stop Voice Recognition';
//   }
// }

// async function generateResponse() {
//   const speechInput = document.getElementById('speechInput').value;

//   try {
//     const response = await fetch('http://localhost:3000/generate-response', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text: speechInput }),
//     });

//     if (response.status === 429) {
//       console.log('Rate limit exceeded. Please wait and try again.');
//     } else {
//       const responseData = await response.json();
//       document.getElementById('responseOutput').value = responseData.response;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

/* text to response */





// speech to speech 
// let recognition;

// function startVoiceRecognition() {
//   const speechInput = document.getElementById('speechInput');
//   const startButton = document.getElementById('startButton');

//   if (!recognition) {
//     recognition = new webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = function (event) {
//       const transcript = event.results[event.results.length - 1][0].transcript;
//       speechInput.value += transcript;
//     };

//     recognition.onend = function () {
//       startButton.innerText = 'Start Voice Recognition';
//     };
//   }

//   if (recognition && recognition.isStarted) {
//     recognition.stop();
//   } else {
//     recognition.start();
//   }

//   startButton.innerText = recognition && recognition.isStarted ? 'Start Voice Recognition' : 'Stop Voice Recognition';
// }

// async function generateResponse() {
//   const speechInput = document.getElementById('speechInput');
//   const responseOutput = document.getElementById('responseOutput');

//   try {
//     const response = await fetch('http://localhost:3000/generate-response', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text: speechInput.value }),
//     });

//     handleResponse(response, responseOutput);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// function handleResponse(response, responseOutput) {
//   if (response.status === 429) {
//     console.log('Rate limit exceeded. Please wait and try again.');
//   } else {
//     response.json().then((responseData) => {
//       responseOutput.value = responseData.response;
//       speak(responseData.response);

//       // Clear the speechInput after generating a response
//       document.getElementById('speechInput').value = '';
//     });
//   }
// }

// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   window.speechSynthesis.speak(utterance);
// }




/* i am tryoing something new more than one chat  */

// main.js

// let recognition;
// let conversationCount = 1;

// function startVoiceRecognition() {
//   const speechInput = document.getElementById('speechInput');
//   const startButton = document.getElementById('startButton');

//   if (!recognition) {
//     recognition = new webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = function (event) {
//       const transcript = event.results[event.results.length - 1][0].transcript;
//       speechInput.value += transcript;
//     };

//     recognition.onend = function () {
//       startButton.innerText = 'Start Voice Recognition';
//     };
//   }

//   if (recognition && recognition.isStarted) {
//     recognition.stop();
//   } else {
//     recognition.start();
//   }

//   startButton.innerText = recognition && recognition.isStarted ? 'Start Voice Recognition' : 'Stop Voice Recognition';
// }

// async function generateResponse() {
//   const speechInput = document.getElementById('speechInput');
//   const responseOutput = document.getElementById('responseOutput');

//   try {
//     const response = await fetch('http://localhost:3000/generate-response', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text: speechInput.value }),
//     });

//     handleResponse(response, responseOutput);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// function handleResponse(response, responseOutput) {
//   if (response.status === 429) {
//     console.log('Rate limit exceeded. Please wait and try again.');
//   } else {
//     response.json().then((responseData) => {
//       const conversationLog = document.getElementById('conversationLog');
//       const question = speechInput.value.trim();
//       const responseText = responseData.response;

//       // Append the conversation to the log
//       conversationLog.innerHTML += `<div class="conversation-item">Question-${conversationCount}: ${question}</div>`;
//       conversationLog.innerHTML += `<div class="conversation-item">Response-${conversationCount}: ${responseText}</div>`;

//       // Clear the speechInput after generating a response
//       speechInput.value = '';

//       // Increment the conversation count
//       conversationCount++;

//       // Scroll to the bottom of the conversation log
//       conversationLog.scrollTop = conversationLog.scrollHeight;

//       // Speak the response
//       speak(responseText);
//     });
//   }
// }

// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   window.speechSynthesis.speak(utterance);
// }
/* more than one chat  */


// main.js

let recognition;
let conversationCount = 1;

function startVoiceRecognition() {
  const speechInput = document.getElementById('speechInput');
  const startButton = document.getElementById('startButton');

  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      speechInput.value += transcript;
    };

    recognition.onend = function () {
      startButton.innerText = 'Start Voice Recognition';
      // Automatically generate a response when speech recognition stops
      generateResponse();
    };
  }

  if (recognition && recognition.isStarted) {
    recognition.stop();
  } else {
    recognition.start();
  }

  startButton.innerText = recognition && recognition.isStarted ? 'Stop Voice Recognition' : 'Start Voice Recognition';
}

async function generateResponse() {
  const speechInput = document.getElementById('speechInput');
  const responseOutput = document.getElementById('responseOutput');

  try {
    const response = await fetch('http://localhost:3000/generate-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: speechInput.value }),
    });

    handleResponse(response, responseOutput);
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleResponse(response, responseOutput) {
  if (response.status === 429) {
    console.log('Rate limit exceeded. Please wait and try again.');
  } else {
    response.json().then((responseData) => {
      const conversationLog = document.getElementById('conversationLog');
      const question = speechInput.value.trim();
      const responseText = responseData.response;

      // Append the conversation to the log
      conversationLog.innerHTML += `<div class="conversation-item">Question-${conversationCount}: ${question}</div>`;
      conversationLog.innerHTML += `<div class="conversation-item">Response-${conversationCount}: ${responseText}</div>`;

      // Clear the speechInput after generating a response
      speechInput.value = '';

      // Increment the conversation count
      conversationCount++;

      // Scroll to the bottom of the conversation log
      conversationLog.scrollTop = conversationLog.scrollHeight;

      // Speak the response
      speak(responseText);
    });
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}
