window.addEventListener('load', () => {
    GlobalNoteView.init();
});

window.addEventListener("beforeunload", function (e) {
    GlobalNoteView.noteList.save();
}, false);

class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    setTitle(title) {
        this.title = title;
    }

    setContent(content) {
        this.content = content;
    }
}

class NoteView {
    constructor(note) {
        this.note = note;
    }

    renderHTML() {
        let conv = new showdown.Converter();
        return conv.makeHtml("# " + this.note.title + "<hr/>" + this.note.content);
    }

    display() {
        let div = document.querySelector('#currentNoteView');
        div.innerHTML = this.renderHTML()
        isAllowedMenu(true);
    }
}

class NoteList {

    liste = [];

    constructor() {
        this.liste = [];
    }

    addNote(note) {
        this.liste.push(note);
        noteListMenuView.displayItem(note);
        return this.liste.length - 1;
    }

    getNoteById(i) {
        return this.liste[i];
    }

    getListe() {
        return this.liste;
    }

    save() {
        let value = JSON.stringify(this.liste);
        localStorage.setItem("notes", value)
    }

    load() {
        let v = localStorage.getItem("notes");
        this.liste = JSON.parse(v);
        noteListMenuView.update();
    }

    deleteNote(idNote) {
        clearInput();
        this.liste.splice(idNote, 1);
    }

    editNote(idNote, title, content) {
        let note = this.liste[idNote];
        note.setContent(content);
        note.setTitle(title);
        noteListMenuView.updateItem(idNote, title);
    }
}

let noteFormView = {
    display: function () {
        document.querySelector(".create_edit_note").classList.remove("create_edit_note-hidden");
    },
    hide: function () {
        document.querySelector(".create_edit_note").classList.add("create_edit_note-hidden");
    },
    validate: function () {
        let content = document.querySelector("#form_add_note_text").value;
        let title = document.querySelector("#form_add_note_title").value;
        if (content === "" || title === "") {
            alert("Veuillez remplir tous les champs");
            return;
        }
        let idNote = GlobalNoteView.idcurrentNote;
        if (idNote === -1) { //ajout
            idNote = GlobalNoteView.noteList.addNote(new Note(title, content));
            GlobalNoteView.idcurrentNote = idNote;
        } else GlobalNoteView.noteList.editNote(idNote, title, content); //modification
        noteFormView.displayNote();
    },
    
    init: function () {
        document.querySelector("#form_add_note_valid").addEventListener("click", this.validate);
    },
    
    //Afficher la note dans la vue
    displayNote: function () {
        let note = GlobalNoteView.noteList.getNoteById(GlobalNoteView.idcurrentNote)
        document.querySelector("#form_add_note_text").value = note.content;
        document.querySelector("#form_add_note_title").value = note.title;
        new NoteView(note).display();
        noteFormView.hide();
    },
    
    //Affiche une alerte si le titre ou le contenu est vide
    log: function (content, title) {
        
    }
}

let mainMenuView = {
    addHandler: function () {
        GlobalNoteView.idcurrentNote = -1;
        noteFormView.display();
        noteListMenuView.clearSelected();
        clearInput();
        isAllowedMenu(false);
    },
    editHandler: function (e) {
        if (e.target.style.cursor === 'pointer') {
            document.querySelector("#currentNoteView").innerHTML = "";
            noteFormView.display();
            isAllowedMenu(false);
        }
    },
    delHandler: function (e) {
        if (e.target.style.cursor === 'pointer') {
            let idNote = GlobalNoteView.idcurrentNote;
            noteListMenuView.deleteItem(idNote);
        }
    },
    init: function () {
        document.querySelector("#add").addEventListener("click", this.addHandler);
        document.querySelector("#edit").addEventListener("click", this.editHandler);
        document.querySelector("#del").addEventListener("click", this.delHandler);
    }
}

let GlobalNoteView = {
    noteList: new NoteList,
    idcurrentNote: -1,


    init: function () {
        GlobalNoteView.noteList.load();
        mainMenuView.init();
        noteFormView.init();
        noteListMenuView.init();
        clearInput();
        isAllowedMenu(false);
    }

}

let noteListMenuView = {

    init: function () {
        document.querySelector("#noteListMenu").addEventListener("click", this.handler);
    },

    update: function () {
        document.querySelector("#noteListMenu").innerHTML = "";
        (function () {
            GlobalNoteView.noteList.getListe().forEach(note => {
                noteListMenuView.displayItem(note);
            })
        })()
    },

    displayItem(note) {
        let div = document.querySelector('#noteListMenu');
        let item = document.createElement('div');
        item.classList.add('note_list_item');
        item.innerHTML = note.title + " " + new Date().toISOString().split('T')[0];
        div.appendChild(item);
    },

    updateItem(idNote, title) {
        let div = document.querySelector('#noteListMenu');
        div.childNodes[idNote].innerHTML = title + " " + new Date().toISOString().split('T')[0];
    },

    deleteItem(idNote) {
        //supprimer la note de la liste
        let div = document.querySelector('#noteListMenu');
        div.removeChild(div.childNodes[idNote]);
        GlobalNoteView.noteList.deleteNote(idNote);

        //Si la liste est vide
        if (GlobalNoteView.noteList.getListe().length === 0) {
            GlobalNoteView.idcurrentNote = -1;
            clearInput();
            isAllowedMenu(false);
            return;
        }
        
        //Selectionner la note précédente ou suivante
        if (idNote > 0) idNote--;

        //Afficher la note sélectionnée
        this.handler({target: div.childNodes[idNote] }, idNote);
    },

    handler: function (e, idNote = -1) {
        if (!e.target.classList.contains('note_list_item'))
            return;

        //Récupérer l'idNote de la note cliquée
        if (idNote === -1) {
            idNote = function (e) {
                let id = 0;
                while (e.previousSibling) {
                    e = e.previousSibling;
                    id++;
                }
                return id;
            }(e.target);
            
            noteListMenuView.clearSelected();
        }
        //Ajouter la classe selected à la note cliquée
        e.target.classList.add('note_list_item-selected');

        GlobalNoteView.idcurrentNote = idNote;
        //Afficher la note cliquée
        noteFormView.displayNote();

    },
    
    //Supprimer la classe selected de la note précédente
    clearSelected: function() {
        let selected = document.querySelector('.note_list_item-selected');
        if (selected)
            selected.classList.remove('note_list_item-selected');
    }
}

// Efface le contenu des champs de saisie
function clearInput() {
    document.querySelector("#form_add_note_text").value = "";
    document.querySelector("#form_add_note_title").value = "";
    document.querySelector("#currentNoteView").innerHTML = "";
}

// Autorise l'édition et la suppresion de la note
function isAllowedMenu(bool) {
    let edit = document.querySelector("#edit");
    let del = document.querySelector("#del");
    if (!bool) {
        edit.style.cursor = "not-allowed";
        del.style.cursor = "not-allowed";
    } else {
        edit.style.cursor = "pointer";
        del.style.cursor = "pointer";
    }
}