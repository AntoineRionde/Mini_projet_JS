window.addEventListener('load', () => {
    GlobalNoteView.init();
    console.log("load");
});

class Note {
    constructor(titre, contenu) {
        this.titre = titre;
        this.contenu = contenu;
        this.date = new Date();
    }

    setTitre(titre) {
        this.titre = titre;
    }

    setContenu(contenu) {
        this.contenu = contenu;
    }
}

class NoteView {
    constructor(note) {
        this.note = note;
    }

    renderHTML() {
        let conv = new showdown.Converter();
        return conv.makeHtml(this.note.contenu);
    }

    afficher() {
        NoteView.visualiserClasse(true);
        let div = document.querySelector('#currentNoteView');
        div.innerHTML = this.renderHTML();
    }

    static visualiserClasse(bool) {
        let div = document.querySelector('#currentNoteView');
        if (!div.classList.contains('current_note') && bool)
            div.classList.add('current_note');
        else if (div.classList.contains('current_note') && !bool)
            div.classList.remove('current_note');
    }
}

class NoteList {
    constructor() {
        this.liste = [];
    }

    addNote(note) {
        this.liste.push(note);
        return this.liste.length - 1;
    }

    getNoteById(i) {
        return this.liste[i];
    }

    getListe() {
        return this.liste;
    }
}

let noteFormView = {
    display: function () {
        document.querySelector(".create_edit_note").classList.remove("create_edit_note-hidden");
    },
    hide: function () {
        document.querySelector(".create_edit_note").classList.add("create_edit_note-hidden");
        NoteView.visualiserClasse(false);
        clearInput();
    },
    validate: function () {
        let contenu = document.querySelector("#form_add_note_text").value;
        let titre = document.querySelector("#form_add_note_title").value;
        let noteView = new NoteView(new Note(titre, contenu));
        noteView.afficher();
        noteListMenuView.displayItem(noteView.note);
        GlobalNoteView.NoteListe.addNote(noteView.note);
        this.init();
    },

    init: function () {
        document.querySelector("#noteListMenu").addEventListener("click", this.handler);
    },

    handler: function (e) {
        let id = function (e) {
            let id = 0;
            while (e.previousSibling) {
                e = e.previousSibling;
                id++;
            }
            return id;
        }(e.target);
        
        let note = GlobalNoteView.NoteListe.getNoteById(id);
        GlobalNoteView.noteCourante = note;
        GlobalNoteView.indexNoteCourante = id;
        GlobalNoteView.changeContent();
        let noteView = new NoteView(note);
        
        noteView.afficher();
    }
}

let mainMenuView = {
    addHandler: function () {
        noteFormView.display();
        allowedMenu();
    },
    validateHandler: function () {
        console.log("validate");
        noteFormView.validate();
    },
    init: function () {
        document.querySelector("#add").addEventListener("click", this.addHandler);
        document.querySelector("#form_add_note_valid").addEventListener("click", this.validateHandler);
        document.querySelector("#del").addEventListener("click", noteFormView.hide);
    }
}

let GlobalNoteView = {
    noteCourante: new Note,
    NoteListe: new NoteList,
    indexNoteCourante: 0,


    init: function () {
        mainMenuView.init();
        clearInput();
        notAllowed();
    },
    
    changeContent : function(){
        document.querySelector("#form_add_note_text").value = GlobalNoteView.noteCourante.contenu;
        document.querySelector("#form_add_note_title").value = GlobalNoteView.noteCourante.titre;
    }

}

let noteListMenuView = {
    displayItem(note) {
        let div = document.querySelector('section.note_list');
        let item = document.createElement('div');
        item.classList.add('note_list_item');
        item.innerHTML = note.titre + " " + note.date.getDay() + "/" + note.date.getMonth() + "/" + note.date.getFullYear();
        div.appendChild(item);
    }
}

function clearInput() {
    document.querySelector("#form_add_note_text").value = "";
    document.querySelector("#form_add_note_title").value = "";
}

function notAllowed() {
    document.querySelector("#edit").style.cursor = "not-allowed";
    document.querySelector("#del").style.cursor = "not-allowed";
    //document.querySelector("#form_add_note_valid").style.cursor = "not-allowed";
}

function allowedMenu() {
    document.querySelector("#edit").style.cursor = "pointer";
    document.querySelector("#del").style.cursor = "pointer";
}

function allowedValidate() {
    document.querySelector("#form_add_note_valid").style.cursor = "pointer";
}