let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let balance = 0;

function Tracking() {
    let expenseName = document.getElementById("expense").value;
    let expenseAmount = parseFloat(document.getElementById("Amount").value) || 0;
    let incomeAmount = parseFloat(document.getElementById("InAmount").value) || 0;
    let category = document.getElementById("item").value;

    let transaction = {
        id: Date.now(),
        Expensename: expenseName,
        ExpenseAmount: expenseAmount,
        Expensecategory: category,
        IncomeAmount: incomeAmount
    };

    transactions.push(transaction);
    updateUI();
    saveToLocalStorage();

    document.getElementById("expense").value = "";
    document.getElementById("Amount").value = "";
    document.getElementById("InAmount").value = "";
}

function updateUI() {
    let html = "";
    let totalIncome = 0;
    let totalExpense = 0;

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        html += '<div class="transaction-card">';
        html += '<p>Name: ' + t.Expensename + '</p>';
        html += '<p>Expense: ' + t.ExpenseAmount + '</p>';
        html += '<p>Income: ' + t.IncomeAmount + '</p>';
        html += '<p>Category: ' + t.Expensecategory + '</p>';
        html += '<button onclick="deleteTransaction(' + t.id + ')">Delete</button>';
        html += '</div>';

        totalIncome += t.IncomeAmount;
        totalExpense += t.ExpenseAmount;
    }

    document.getElementById("transactionsList").innerHTML = html;
    balance = totalIncome - totalExpense;
    document.getElementById("balanceDisplay").innerHTML = 'Your Total Balance: ' + balance;
}

function deleteTransaction(id) {
    let newTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id !== id) {
            newTransactions.push(transactions[i]);
        }
    }
    transactions = newTransactions;
    updateUI();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

window.onload = function() {
    updateUI();
};
