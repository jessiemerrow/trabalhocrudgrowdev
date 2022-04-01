const myModal = new bootstrap.Modal("#register-modal");
const session = localStorage.getItem("session");
let  logged = sessionStorage.getItem("logged");

checkLogged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const password2 = document.getElementById("password-input2").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Oops! Verifique o usuário ou a senha.")
        return;
    }
    else
    {
        if (account.password !== password) {
            alert("Oops! Verifique o usuário ou a senha.")
            return;
        }
        if (account.password2 !== password2) {
            alert("Oops! Verifique o usuário ou a senha.")
            return;
        }

        saveSession(email, checkSession);
        window.location.href = "home.html";
    }
});


// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const password2 = document.getElementById("password-create-input2").value;

    if(email.length < 5)
    {
        alert("Preencha o campo com um nome válido.");
        return;
    }

    if(password.length < 4)
    {
        alert("Preencha a senha com no minimo 4 digitos");
        return;
    }
    if(password2.length < 4)
    {
        alert("Preencha a senha com no minimo 4 digitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        password2: password2,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso.");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session)

        window.location.href = "home.html";
    }
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account)
    {
        return JSON.parse(account);
    }

    return "";
}
