let input = document.querySelector('#input');
let searchbtn = document.querySelector('.search');
let apikey = '662127fc-4553-4cb3-9a73-1c5db38a79c7';
let not_found = document.querySelector('.notfound');
let defbox = document.querySelector('.def');
let audiobox= document.querySelector('.audio');
let load = document.querySelector('.loading');
searchbtn.addEventListener('click' , function (e) {
    e.preventDefault();
     
    


    //clear data 

    audiobox.innerHTML = '';
    not_found.innerText = '';
    defbox.innerText = '';
    // get input data
    let word = input.value;

    // call API get data
    if (word == '') {
        alert('Word is required');
        return;
    }

    getData(word);
});


async function getData(word) {
    load.style.display = 'block';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);

    const data = await response.json();
    // if empty result
    console.log(data);
    

    if (!data.length) {
        load.style.display = 'none';
        not_found.innerText = 'No result found';
        return;
        
    }

    // if reslt is suggestion

    if (typeof data[0] === 'string') {
        load.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        not_found.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        });
        
        return;
    }
      // result found

      load.style.display = 'none';
    let definition = data[0].shortdef[0];
    defbox.innerText = definition;
    
    const soundname = data[0].hwi.prs[0].sound.audio;
    if(soundname){
       // soundfile avalibale
       renderSound(soundname);      
    }
  


}

function renderSound(soundname) {
    // 
    let subfolder = soundname.charAt(0);
    let soundsrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundname}.wav?key=${apikey}`;
    let aud = document.createElement('audio');
    aud.src = soundsrc;

    aud.controls = true;
    audiobox.appendChild(aud);

}