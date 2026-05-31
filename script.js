let budget = Number(localStorage.getItem("budget")) || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
    renderExpenses();
});

function setBudget() {
    budget = Number(document.getElementById("budget").value);

    if (budget <= 0) {
        alert("Enter a valid budget");
        return;
    }

    localStorage.setItem("budget", budget);
    updateDashboard();
}

function addExpense() {

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("category").value;
    const payment = document.getElementById("payment").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    if (!name || amount <= 0) {
        alert("Enter valid expense details");
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
        payment,
        date,
        notes
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    updateDashboard();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("notes").value = "";
}

function renderExpenses() {

    const list = document.getElementById("expenseList");

    list.innerHTML = "";

    expenses.forEach(expense => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${expense.name}</strong><br>
                ₹${expense.amount}<br>
                ${expense.category} | ${expense.payment}<br>
                ${expense.date}<br>
                ${expense.notes}
            </div>

            <button class="delete-btn"
            onclick="deleteExpense(${expense.id})">
            Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();
    updateDashboard();
}

function updateDashboard() {

    const spent = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const remaining = budget - spent;

    document.getElementById("budgetDisplay").textContent =
        "₹" + budget;

    document.getElementById("spentDisplay").textContent =
        "₹" + spent;

    document.getElementById("remainingDisplay").textContent =
        "₹" + remaining;
}
