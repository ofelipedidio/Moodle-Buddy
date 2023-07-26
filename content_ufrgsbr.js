window.addEventListener('load', () => {
    if (document.getElementById('usuario') != null && document.getElementById('senha') != null && document.querySelector('#pessoal > input[type=submit]') != null) {
        const login = document.getElementById('usuario');
        const password = document.getElementById('senha');
        const button = document.querySelector('#pessoal > input[type=submit]');

        chrome.storage.sync.get(['username_ufrgs', 'password_ufrgs'], (result) => {
            login.value = result.username_ufrgs;
            password.value = result.password_ufrgs;
            button.click();
        });
        return;
    }
});
