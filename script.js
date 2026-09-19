let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

  const description =
    document.getElementById("description").value.trim();

  const amount =
    Number(document.getElementById("amount").value);

  const type =
    document.getElementById("type").value;

  const date =
    document.getElementById("date").value;

  if (!description || !amount || amount <= 0 || !date) {
    alert("Please fill all fields.");
    return;
  }

  const transaction = {
    description: description,
    amount: amount,
    type: type,
    date: date
  };

  transactions.push(transaction);

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  updateUI();
}

function updateUI() {

  let income = 0;
  let expenses = 0;

  const list =
    document.getElementById("transactionList");

  if (!list) return;

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
      <div>
        <strong>${transaction.description}</strong>
        <small>${transaction.date}</small>
      </div>

      <span class="${transaction.type}">
        ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}
      </span>
    `;

    list.appendChild(li);
  });

  document.getElementById("income").textContent =
    `₹${income}`;

  document.getElementById("expenses").textContent =
    `₹${expenses}`;

  document.getElementById("balance").textContent =
    `₹${income - expenses}`;
}

updateUI();
