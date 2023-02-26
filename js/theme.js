const body = document.querySelector('body');

// Récupération du thème dans le localStorage
window.addEventListener('load', () => {
    if (localStorage.getItem('dark') === 'true') {
        darkTheme(true);
        document.querySelector('#darkmode').value = 'Light Mode';
    } else {
        darkTheme(false);
        document.querySelector('#darkmode').value = 'Dark Mode';
    }
});

// Changement du thème et sauvegarde dans le localStorage
document.querySelector('#darkmode').addEventListener('click', () => {
    if (localStorage.getItem('dark') === 'true') {
        localStorage.setItem('dark', 'false');
        darkTheme(false);
        document.querySelector('#darkmode').value = 'Dark Mode';
    } else {
        localStorage.setItem('dark', 'true');
        darkTheme(true);
        document.querySelector('#darkmode').value = 'Light Mode';
    }
});

// Fonction pour changer le thème
function darkTheme(dark) {
    if (dark === true) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}