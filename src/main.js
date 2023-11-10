function searchWord() {
    var search = document.getElementById("wordInput").value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
    .then((response) => response.json())
    .then((data) => {
        if (data && data[0]) {
            var wordData = data[0];
            console.log(wordData);

            var resultsDiv = document.getElementById("results");

            // Continue with the rest of the code to display dictionary information
            resultsDiv.innerHTML = ``;
            var phonetic = wordData.phonetics[0].text;
            resultsDiv.innerHTML += `<div class="box"><h2>${search}</h2><p><strong>Phonetic:</strong> ${phonetic}</p></div>`;

            // Display sound
            wordData.phonetics.forEach((phonetic) => {
                if (phonetic.audio) {
                    var audioURL = phonetic.audio;
                    resultsDiv.innerHTML += `<div class="box">
                    <audio controls><source src="${audioURL}" type="audio/mpeg"></audio>
                </div>`;
                }
            });
            

            // Loop through meanings
            wordData.meanings.forEach((meaning) => {

                resultsDiv.innerHTML += `<div class="box"><p><strong>${meaning.partOfSpeech}</strong></p>`;

                if (meaning.synonyms.length > 0) {
                    var synonyms = meaning.synonyms.join(', ');
                }

                else{
                    var synonyms = 'N/A';
                }
            
                if (meaning.antonyms.length > 0) {
                    var antonyms = meaning.antonyms.join(', ');
                }

                else{
                    var antonyms = 'N/A';
                }
            
                

                // Loop through definitions
                meaning.definitions.forEach((definition, index) => {
                    
                    if (definition.example) {
                        var example = `<i><strong>e.g.</strong> ${definition.example}</i>`;
                    }

                    else{
                        var example = ''
                    }
                
                    resultsDiv.innerHTML += `
                        <p><strong>${index + 1}.</strong> ${definition.definition}</p>
                        <li>${example}</li>
                        <br>
                    `;

                    
                });

                resultsDiv.innerHTML += `<div class= "box">
                    <p><strong>Synonyms:</strong> ${synonyms}</p>
                    <p><strong>Antonyms:</strong> ${antonyms}</p>
                    </div>
                    <br>
                `;
                
            });

            

            // Display related URL
            var sourceUrl = wordData.sourceUrls[0];
            if (sourceUrl) {
                resultsDiv.innerHTML += `<div class="box"><p><a href="${sourceUrl}" target="_blank">Related URL</a></p></div>`;
            }
        }
        
        else {
            // Handle case when data is empty
            var resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = `<p>No data found for ${search}</p>`;
        }
    })
    
}


