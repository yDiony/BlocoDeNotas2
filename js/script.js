let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal = document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//-------------------EVENTOS---------
addNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';

btnCloseNote.addEventListener('click', (evt) => {
  listNotes();
    evt.preventDefault();
    modal.style.display = 'none';
    notes.style.display = 'flex';
    addNote.style.display = 'block';

  })
})

closeModal.addEventListener('click',(evt) => {
  listNotes();
  evt.preventDefault();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
  modalView.style.display = 'none';

})

btnSaveNote.addEventListener('click',(evt) => {
  evt.preventDefault();
  let objNote = {id : document.querySelector("#input-id").value.trim(),
    title: document.querySelector("#input-title").value.trim(),
    content: document.querySelector("#input-content").value.trim(),};
    console.log(objNote); 
    saveNote(objNote);
})



//-------------FUNÇÕES-----------------



const loadNotes = () => {
  notes.innerHTML="";
  let listNotes = localStorage.getItem('notes');
  if(!listNotes){
    listNotes = [];
  }else{
    listNotes = JSON.parse(listNotes)
  } 
  return listNotes;
}



const saveNote = (note) => {
    let listNotes = loadNotes();
    if(note.id.length < 1){
      note.id = new Date().getTime();
      document.querySelector('#input-id').value = note.id;
      listNotes.push(note);
    }else{
      console.log(note.id)
      listNotes.forEach((item, i) =>  {
        if(item.id == note.id){
          listNotes[i] = note;
      }
      });
    }

    note.lastTime = new Date().getTime();
    console.log(listNotes);
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes',listNotes);
}
const listNotes = () => {
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
 

    divCard.className = 'card';
    divCard.style.width = '18rem';
    notes.appendChild(divCard);
    let divCardBody = document.createElement('div');
    divCardBody.className='card-body';
    divCard.appendChild(divCardBody);
    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    pContent.className = 'card-text';
    divCardBody.appendChild(pContent);
    pLastTime = document.createElement('p');
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString('pt-br');
    divCardBody.appendChild(pLastTime);

    divCard.addEventListener('click',(evt) => {
      evt.preventDefault();
       mostrar(item);

    });
    
   
  })
}

let mostrar = (note) => {
  notes.style.display = 'none';
    modalView.style.display= 'block';
    addNote.style.display='none';

  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>"
  document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>"
  document.querySelector('#content-note').innerHTML +="<p>Ultima atalização: "+new Date(note.lastTime).toLocaleDateString('pt-br')+"</p>"
  let aDelete = document.createElement('a');
  let i = document.createElement('i');
  document.querySelector('#controls-note').innerHTML = "";
  i.style.color = "red"
  i.className = 'bi';
  i.className = 'bi-trash-fill';
  aDelete.appendChild(i);
  document.querySelector('#controls-note').appendChild(aDelete);
  //criando o botao de editar
  let aEdit = document.createElement('a')
  let iEdit = document.createElement('i');
  iEdit.style.color = "yellow"
  iEdit.className= "bi bi-pen"
  iEdit.src = "./img/edit.png"
  aEdit.appendChild(iEdit);
  document.querySelector("#controls-note").appendChild(aEdit)


  //evento de clicar e n recarregar a pag
  aDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  })

  //funcaodedeeditar
  aEdit.addEventListener('click', () => {
    document.querySelector("#input-id").value = note.id;
    document.querySelector("#input-title").value = note.title;
    document.querySelector("#input-content").value = note.content;
    modal.style.display = 'block';
    addNote.style.display = 'none';
    notes.style.display = 'none';
    modalView.style.display = 'none';
});

    
  modalView.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
}


const deleteNote = (id) => {
  let noteDel = loadNotes(); 

  noteDel = noteDel.filter(note => note.id !== id);

  localStorage.setItem('notes', JSON.stringify(noteDel)); //Transforma o valor das notas em string
  
  listNotes();

  modalView.style.display='none';
  addNote.style.display = 'block';
  notes.style.display = 'flex';
  
  
};

