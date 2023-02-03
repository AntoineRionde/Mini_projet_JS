window.addEventListener('load', () => {

});

function Note(titre, contenu) {
    this.titre = titre;
    this.contenu = contenu;
    this.date = new Date();
}

let NoteProto = {
    setTitre(titre) {this.titre = titre;},
    setContenu(contenu) {this.contenu = contenu;}
}

Note.prototype = NoteProto;

function NoteView(Note) {
    this.Note = Note;
}

let NoteViewProto = {
    renderHTML() {
        let conv = new showdown.Converter();
        return conv.makeHtml(this.Note.contenu);
    },
    afficher() {
        let div = document.querySelector('div#currentNoteView');
        div.innerHTML = this.renderHTML();
    }
}

NoteView.prototype = NoteViewProto;