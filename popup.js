window.addEventListener('load', () => {
    // Moodle UFRGS
    {
        const username_ufrgs = document.getElementById("username_ufrgs");
        const password_ufrgs = document.getElementById("password_ufrgs");

        chrome.storage.sync.get(['username_ufrgs', 'password_ufrgs'], (result) => {
            username_ufrgs.value = result.username_ufrgs || '';
            password_ufrgs.value = result.password_ufrgs || '';
        });

        const updateLoginInfo = () => {
            chrome.storage.sync.set({
                username_ufrgs: username_ufrgs.value,
                password_ufrgs: password_ufrgs.value
            })
        }

        username_ufrgs.addEventListener('keyup', updateLoginInfo);
        username_ufrgs.addEventListener('input', updateLoginInfo);
        password_ufrgs.addEventListener('keyup', updateLoginInfo);
        password_ufrgs.addEventListener('input', updateLoginInfo);
    }

    // Moodle INF
    {
        const username_inf = document.getElementById("username_inf");
        const password_inf = document.getElementById("password_inf");

        chrome.storage.sync.get(['username_inf', 'password_inf'], (result) => {
            username_inf.value = result.username_inf || '';
            password_inf.value = result.password_inf || '';
        });

        const updateLoginInfo = () => {
            chrome.storage.sync.set({
                username_inf: username_inf.value,
                password_inf: password_inf.value
            })
        }

        username_inf.addEventListener('keyup', updateLoginInfo);
        username_inf.addEventListener('input', updateLoginInfo);
        password_inf.addEventListener('keyup', updateLoginInfo);
        password_inf.addEventListener('input', updateLoginInfo);
    }
});
