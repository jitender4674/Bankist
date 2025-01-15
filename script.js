'use strict';

const account1 = {
    owner: 'Jitender Budhwar',
    pin: 1111,
    movements: [10000, -200, 800, -400, -20, -20, -20, -100],
    interestRate: 1.2,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2024-09-10T23:36:17.929Z',
        '2024-09-13T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'en-IN',
};

const account2 = {
    owner: 'Gaurav Budhwar',
    pin: 2222,
    movements: [20000, -200, 800, -400, -100, -20, -20, -100],
    interestRate: 1.2,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2024-09-10T23:36:17.929Z',
        '2024-09-13T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'en-IN',
};

const accounts = [account1, account2];
// ///////////////////////////////////////////////////////
// selecting elements


const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.balance__date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');

const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');


const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');


const inputLoginUser = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');

const inputCloseAccountUser = document.querySelector('.form__input--user');
const inputCloseAccountPin = document.querySelector('.form__input--pin');






// creating usernames
const createUserName = function (accArr) {
    accArr.forEach(acc => {
        acc.username = acc.owner.toLowerCase().split(' ').map(firstLetter => firstLetter[0]).join('');
        console.log(acc.username);
    });
};

createUserName(accounts);


// ---------------------------------------------------------------------------------------------------

let currentAccount;
// currentAccount = account1;
// ///////////////////////////////////////////////////////////////////////////////////////////
// EVENT HANDLERS
///////////////////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();


    currentAccount = accounts.find(acc => acc.username === inputLoginUser.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log('login successful');

        updateUi(currentAccount);

        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

        containerApp.style.opacity = 100;

        // current date and time below the current balance label
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            second: 'numeric',
        };

        setInterval(function () {
            const now = new Date();
            labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
        }, 1000);

        // clear input fields
        inputLoginUser.value = inputLoginPin.value = '';

        inputLoginPin.blur();


    }
});


// transfer money
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    const receiverAcc = accounts.find((acc => acc.username === inputTransferTo.value));

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // adding transaction date and time
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString);

        // updateUI
        updateUi(currentAccount);
    }
});


// loan

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const loanAmount = +inputLoanAmount.value;

    if (loanAmount > 0 && currentAccount.movements.some(mov => mov > loanAmount * 0.1)) {

        currentAccount.movements.push(loanAmount);

        // add loan date
        currentAccount.movementsDates.push(new Date().toISOString());
        console.log(currentAccount.movementsDates)
        // Update UI
        updateUi(currentAccount);
        // 
        inputLoanAmount.value = '';
    };
});

// close account

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputCloseAccountUser.value === currentAccount.username && +inputCloseAccountPin.value === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        // deleting the account from the original array containing all the accounts
        accounts.splice(index, 1);

        // hide UI
        containerApp.style.opacity = 0;

    }

});




// //////////////////////////////////////////////////////////////////////////////
// FUNcTIONS
// ///////////////////////////////////////////////////////////////////////////
const formattedMovementDate = function (date, locale) {
    const calcDayspassed = function (date1, date2) {
        return Math.round((Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)));
    };

    const daysPassed = calcDayspassed(date, new Date());

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 10) return `${daysPassed} days ago`; 8


    return new Intl.DateTimeFormat(locale).format(date);
}

const formattedCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(Math.abs(value));
};

const displayBalance = function (acc) {
    const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formattedCurrency(balance, acc.locale, acc.currency);
    acc.balance = Number(balance)
};
// displayBalance(currentAccount);

// displaying current date under current balance label
const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    second: 'numeric',
};

setInterval(function () {
    const now = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
}, 1000);





const displayMovements = function (acc) {
    containerMovements.innerHTML = '';

    const movs = acc.movements;

    movs.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formattedMovementDate(date, acc.locale);

        const html = `<div class="movements__row">
                <div class="movements__type movements__type--${type}">
                    ${i + 1} ${type}
                </div>
                <div class="movements__date">
                    ${displayDate}
                </div>
                <div class="movements__value">
                    ${formattedCurrency(mov, acc.locale, acc.currency)}
                </div>
                </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovements(currentAccount);
// ------------------------------------------------------------------------------------------


const displaySummary = function (acc) {
    const totalIn = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formattedCurrency(Math.abs(totalIn), acc.locale, acc.currency);

    const totalOut = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    labelSumOut.textContent = formattedCurrency(Math.abs(totalOut), acc.locale, acc.currency);

    const totalInterest = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + (mov * currentAccount.interestRate / 100), 0);
    labelInterest.textContent = formattedCurrency(totalInterest, acc.locale, acc.currency)
};
// displaySummary(currentAccount);


// UPDATE UI FUNCTION
const updateUi = function (acc) {
    displayBalance(acc);
    displayMovements(acc);
    displaySummary(acc);
}
