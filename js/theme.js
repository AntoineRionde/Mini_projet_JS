const body = document.querySelector('body');

window.addEventListener('load', () => {
    clearCheckboxes();
    SwitchThemeView.init();
});

function darkTheme(dark) {
    if (dark === true) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}

let SwitchThemeView = {
    init: function () {
        let button = document.querySelector('#darkmode');
        button.addEventListener('click', () => {
            if (button.checked)
                darkTheme(true);
            else darkTheme(false);

        });
    }
}

function clearCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}
