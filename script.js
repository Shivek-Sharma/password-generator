// Characer Set Table -> https://net-comber.com/charset.html

const result = document.getElementById('result');
const clipboard = document.getElementById('clipboard');
const password_length = document.getElementById('password-length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);    //97 -> a
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);    //65 -> A
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.+-';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(length, lower, upper, numbers, symbols) {
    let generatedPassword = '';

    const checkedCount = lower + upper + numbers + symbols;

    if (checkedCount === 0) {
        alert("Please check at least one option to generate password");
        return;
    }

    const checkedArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i += checkedCount) {
        checkedArr.forEach(checkedItem => {
            const funcName = Object.keys(checkedItem)[0];
            // console.log(funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//Event Listeners
generate.addEventListener('click', () => {
    const length = +password_length.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasNumbers = numbers.checked;
    const hasSymbols = symbols.checked;

    result.innerText = generatePassword(length, hasLower, hasUpper, hasNumbers, hasSymbols);
});

//copy password to clipboard
clipboard.addEventListener('click', () => {
    const password = result.innerText;

    const cb = navigator.clipboard;
    cb.writeText(password);
    alert("Password copied to clipboard!");

    //reference -> https://dev.to/tqbit/how-to-use-javascript-to-copy-text-to-the-clipboard-2hi2
});