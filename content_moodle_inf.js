window.addEventListener('load', () => {
    if (document.getElementsByClassName('login').length > 0 && document.getElementsByClassName('login')[0].innerText == 'You are not logged in. (Log in)') {
        window.location = 'https://moodle.inf.ufrgs.br/login/index.php';
        return;
    }
    
    if (document.querySelector('form[action="https://moodle.inf.ufrgs.br/"] > button') != null) {
        document.querySelector('form[action="https://moodle.inf.ufrgs.br/"] > button').click();
        return;
    }

    if (document.getElementById('username') != null && document.getElementById('password') != null && document.getElementById('loginbtn') != null) {
        const login = document.getElementById('username');
        const password = document.getElementById('password');
        const button = document.getElementById('loginbtn');

        chrome.storage.sync.get(['username_inf', 'password_inf'], (result) => {
            login.value = result.username_inf;
            password.value = result.password_inf;
            button.click();
        });
        return;
    }

    if (window.location.href.startsWith('https://moodle.inf.ufrgs.br/mod/resource/view.php')) {
        window.location = document.querySelector('.resourceworkaround > a').href;
    } else if (window.location.href.startsWith('https://moodle.inf.ufrgs.br/mod/url/view.php')) {
        window.location = document.querySelector('.urlworkaround > a').href;
    }
});
