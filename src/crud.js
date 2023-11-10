const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const wordInput = document.getElementById('wordInput');

// Directory for storing word files
const pathName = path.join(__dirname, 'Files');

function getFileName(word) {
  return word.toLowerCase()+ '.txt';
}

document.getElementById('btnCreate').addEventListener('click', function () {
  const word = wordInput.value.trim();
  if (word) {
    const fileName = getFileName(word);
    const file = path.join(pathName, fileName);
    fs.writeFile(file, word, function (err) {
      if (err) {
        alert('An error occurred creating the word: ' + err.message);
        return console.log(err);
      }
      alert(`Word "${word}" was added`);
      wordInput.value = '';
      displayWords(); // Call the function to display words
    });
  }
});

// Function to display words
function displayWords() {
  const wordList = document.getElementById('wordList');
  wordList.innerHTML = ''; // Clear the existing list

  // Read all files in the directory
  fs.readdir(pathName, function (err, files) {
    if (err) {
      return console.log(err);
    }

    // Loop through the files and add them to the list
    files.forEach(function (file) {
      const word = file.slice(0, -4); // Convert filename back to word
      const listItem = document.createElement('li');
      listItem.textContent = word;

      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex'; // Make the container a flex container

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteWord(word);
      });

      // Append buttons to the container
      buttonContainer.appendChild(deleteButton);

      // Append the button container to the list item
      listItem.appendChild(buttonContainer);

      // Append the list item to the word list
      wordList.appendChild(listItem);
    });
  });
}

function deleteWord(word) {
  const fileName = getFileName(word);
  const file = path.join(pathName, fileName);
  fs.unlink(file, function (err) {
    if (err) {
      alert('An error occurred deleting the word: ' + err.message);
      return console.log(err);
    }
    alert(`Word "${word}" was deleted`);
    displayWords(); // Refresh the list after deleting
  });
}

// Call the displayWords function when the page loads
displayWords();
