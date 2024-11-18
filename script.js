'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">${mov}</div>
</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calculatedDisplaybalance = function (acc) {
  acc.movements = acc.movements || [];
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} INR`;
};

calculatedDisplaybalance(account1.movements);

const calcDisplaySummarry = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = ` ${interest}`;

  labelSumIn.textContent = `${income}`;

  labelSumOut.textContent = `${Math.abs(withdrawal)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
//current acoount

let currentAccount;

const updateUi = function (acc) {
  displayMovements(acc.movements);

  //display balance

  calculatedDisplaybalance(acc);

  //display summary

  calcDisplaySummarry(acc);

  console.log('login');
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log (currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //clearing fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUi(currentAccount);
    //display ui
    containerApp.style.opacity = 100;

    //welcome

    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    // display moments
  } else {
    console.log('error');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciveAcc &&
    reciveAcc.username !== currentAccount.username
  ) {
    //adding money
    currentAccount.movements.push(-amount);
    reciveAcc.movements.push(amount);

    updateUi(currentAccount);
  } else {
    console.log('user not found');
  }
  console.log(reciveAcc, amount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value == currentAccount.username &&
    Number(inputClosePin.value == currentAccount.pin)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
});
inputCloseUsername.value = inputClosePin.value = '';

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('dd');
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const movements = [200, -150, 340, -300, 430, -20, 700, -50];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) {
  if (mov > 0) depositFor.push(mov);
}

console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

withdrawals.forEach(withdrawals => depositFor.push(withdrawals));
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const IndianToDollar = 1.1;

const total = movements
  .filter(mov => mov > 0)
  .map(mov => mov * IndianToDollar)
  .reduce((acc, mov) => acc + mov, 0);
console.log(total, 'ruppe');
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function (mov, i,arr) {
//   if(mov>0 ) {
//     console.log( `Movement ${i+1} you deposited the amount ${mov}`)
//   } else {
//     console.log( `Movement ${i+1} your amount is withdrawn ${Math.abs(mov)} `)
//   }
// })

// const checkDogs = function (dogjulia ,dogkate) {
// const dogjuliacorrect = dogjulia.slice()
// dogjuliacorrect.splice(0 ,1 );
// dogjuliacorrect.splice(-2 );
// const dogs = dogjuliacorrect.join(dogkate)
// console.log(dogs)

// }
// checkDogs([3,5,2,12,7],[4,1,15,8,3])

// const usdToindia  = 89;

// const movmentsindia = account1.movements.map( mov=>
//  mov*usdToindia)

// console.log(movmentsindia)

// const calcAverageHumanAge =  ages=>
//   ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//  filter( (age)=> {
//     if (age >= 18) {
//       return age;
//     }
//   })
//   .reduce((acc, age,i,arr) => acc + age, 0) / arr.length,0;

//   console.log(humanAges);
//   console.log(ExcludeDogs);
//   console.log(averageAge);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 272, owners: ['sarah', 'john'] },
  { weight: 32, curFood: 340, owners: ['Michale'] },
];
//1
dogs.forEach(food => {
  food.recFood = Math.trunc(Number(food.weight ** 0.75 * 28));

  console.log(food.recFood);
});

//2
const sarahDog = dogs.find(dog => dog.owners.includes('sarah'));
if (sarahDog.curFood > sarahDog.recFood) {
  console.log('it is eating to much');
}

console.log(sarahDog);

//3

const allOwners = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners)
  .flat();

// else if ( OverFood.curFood < OverFood.recFood) {
//   return `${OverFood.owners , " eating too little"}`
// }

console.log(allOwners);
// dogs.map(OverFood => {
//   if (OverFood.curFood > OverFood.recFood) {
//     return`${ OverFood.owners } `
//   }

//4

const foodWeight = dogs
  .filter(weight => weight.curFood > weight.recFood)
  .map(weight => `${weight.owners} is eating to much`)
  .flat();

const lessWeight = dogs
  .filter(weight => weight.curFood < weight.recFood)
  .map(weight => `${weight.owners} is eating less much`)
  .flat();

console.log(foodWeight);
console.log(lessWeight);

const checkEating = dog => weight =>
  weight.curFood > weight.recFood * 0.9 &&
  weight.curFood < weight.recFood * 1.1;


const Exactly = dogs.some(checkEating);

console.log(Exactly);

const dogSorted = dogs.slice().sort((a,b)=> a.curFood-b.recFood)

console.log(dogSorted)