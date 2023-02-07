window.addEventListener('load', () => {
    mainMenuView.init();
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
    constructor(Note) {
        this.Note = Note;
    }

    renderHTML() {
        let conv = new showdown.Converter();
        return conv.makeHtml(this.Note.contenu);
    }

    afficher() {
        let div = document.querySelector('div#currentNoteView');
        div.innerHTML = this.renderHTML();
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
        document.querySelector("#form_add_note_valid").addEventListener("click", () => {
            let titre = document.querySelector("#form_add_note_title").textContent;
            let contenu = document.querySelector("#form_add_note_text").textContent;
            //let note= new Note(titre, contenu);
            // la stocke dans la variable partagée
            // l'affiche en créant objet noteView
        });
    }
}

let mainMenuView = {
    addHandler: function () {
        document.querySelector("#add").addEventListener("click", () => {
            noteFormView.display();
            console.log("add");
        });
        document.querySelector("#edit").addEventListener("click", () => {
            console.log("edit");
        });
        document.querySelector("#del").addEventListener("click", () => {
            console.log("delete");
            noteFormView.hide();
        });
    },
    init: function () {
        this.addHandler();
    }
}