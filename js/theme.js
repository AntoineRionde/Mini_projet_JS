const body = document.querySelector('body');
window.addEventListener('load', () => {
    SwitchThemeView.init();
});

function switchTheme() {
    if (!body.classList.contains('dark')) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}

let SwitchThemeView = {
init: function () {
    let button = document.querySelector('.switch');
    button.addEventListener('click', () => {
        switchTheme();
    });
}
}
