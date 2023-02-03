window.addEventListener('load', () => {
    document.querySelector("#add").addEventListener("click", () => {
       showForm();
    });
});

/*function showForm()
{
    document.querySelector(".create_edit_note").classList.remove("create_edit_note-hidden");
} */

let noteFormView = {
    display : function () {
        document.querySelector(".create_edit_note").classList.remove("create_edit_note-hidden");
    },
    hide : function () {
        document.querySelector(".create_edit_note").classList.add("create_edit_note-hidden");
    },
    validate : function () {
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
    addHandler : function () {
        document.querySelector("#add").addEventListener("click", () => {
           let noteFV = new FormView();
           noteFV.display();
        });
    },
    init : function () {
        document.querySelector("#add").addEventListener("click", () => {

        });
    }
}