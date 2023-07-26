window.addEventListener('load', () => {
    if (document.getElementById('rcmloginuser') != null && document.getElementById('rcmloginpwd') != null && document.querySelector('.button.mainaction') != null) { 
        const login = document.getElementById('rcmloginuser');
        const password = document.getElementById('rcmloginpwd');
        const button = document.querySelector('.button.mainaction');

        chrome.storage.sync.get(['username_inf', 'password_inf'], (result) => {
            console.log(result);
            login.value = result.username_inf;
            password.value = result.password_inf;
            button.click();
        });
    }
});
