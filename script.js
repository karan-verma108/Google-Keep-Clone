const addNote = document.querySelector('.addNote');

//updating localStorage upon change in textarea 

const updateLSdata = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);

    textAreaData.forEach((noteText) => {
        return notes.push(noteText.value);
    })

    // saving data to localStorage
    localStorage.setItem('notes', JSON.stringify(notes)) 

}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('noteBox');

    const htmlData = `<div class="operations">
    <button class="common edit"><i class="far fa-pen-to-square"></i></button>
    <button class="common delete"><i class="far fa-trash-can"></i></button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>`;


    note.insertAdjacentHTML('afterbegin', htmlData);

    // getting the references 
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the note 
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLSdata();
    });

    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;


    editBtn.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSdata();
    })



    // now let's append this note to the body 
    document.body.appendChild(note);
}

// getting data back from localStorage

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){ notes.forEach((note)=> addNewNote(note))}
addNote.addEventListener('click', () => addNewNote());