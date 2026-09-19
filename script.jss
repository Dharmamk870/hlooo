let transactions = [];

function addTransaction() {
  const description =
    document.getElementById("description").value;

  const amount =
    Number(document.getElementById("amount").value);

  const type =
    document.getElementById("type").value;

  if (!description || !amount) {
    alert("Please enter description and amount.");
    return;
  }

  const transaction = {
    description: description,
    amount: amount,
    type: type
  };

  transactions.push(transaction);

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  updateUI();
}

function updateUI() {
  let income = 0;
  let expenses = 0;

  const list = document.getElementById("transactionList");

  list.innerHTML = "";

  transactions.forEach(transaction => {

    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }

    const li = document.createElement("li");

    li.className = "transaction";

    li.innerHTML = `
      <span>${transaction.description}</span>
      <span class="${transaction.type}">
        ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}
      </span>
    `;

    list.appendChild(li);
  });

  const balance = income - expenses;

  document.getElementById("income").textContent =
    `₹${income}`;

  document.getElementById("expenses").textContent =
    `₹${expenses}`;

  document.getElementById("balance").textContent =
    `₹${balance}`;
}
