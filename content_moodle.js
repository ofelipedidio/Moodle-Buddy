window.addEventListener('load', () => {
    if (document.getElementById('text1') != null && document.getElementById('text') != null && document.getElementById('botaoDeAcesso') != null) {
        const login = document.getElementById('text1');
        const password = document.getElementById('text');
        const button = document.getElementById('botaoDeAcesso').children[0];

        chrome.storage.sync.get(['username_ufrgs', 'password_ufrgs'], (result) => {
            login.value = result.username_ufrgs;
            password.value = result.password_ufrgs;
            button.click();
        });
    }

    if (window.location.href.startsWith('https://moodle.ufrgs.br/mod/resource/view.php')) {
        window.location = document.querySelector('.resourceworkaround > a').href;
    } else if (window.location.href.startsWith('https://moodle.ufrgs.br/mod/url/view.php')) {
        window.location = document.querySelector('.urlworkaround > a').href;
    }
});
