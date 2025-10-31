document.addEventListener("DOMContentLoaded", () => {
  // Employee data array
  let employees = [
    { id: 1, name: "Alice Johnson", role: "Developer", score: 88 },
    { id: 2, name: "James Smith", role: "Designer", score: 73 },
    { id: 3, name: "Fatou Kamara", role: "Project Manager", score: 91 },
    { id: 4, name: "David Mwangi", role: "QA Engineer", score: 64 },
  ];

  let sortState = { column: null, asc: true };
  let editId = null;

  // ---------- Render Table ----------
  function renderTable(data) {
    const container = document.getElementById("tableContainer");
    container.innerHTML = "";

    const table = document.createElement("table");

    // Table header
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Name", "Role", "Score", "Actions"].forEach((col) => {
      const th = document.createElement("th");
      th.textContent = col;

      if (col !== "Actions") {
        th.style.cursor = "pointer";
        th.addEventListener("click", () => sortBy(col.toLowerCase()));
      }

      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement("tbody");
    data.forEach((emp) => {
      const tr = document.createElement("tr");

      // Conditional row coloring
      if (emp.score >= 85) tr.classList.add("high-score");
      else if (emp.score >= 70) tr.classList.add("medium-score");
      else tr.classList.add("low-score");

      // Cells
      ["name", "role", "score"].forEach((key) => {
        const td = document.createElement("td");
        td.textContent = emp[key];
        tr.appendChild(td);
      });

      // Action buttons
      const tdActions = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEditModal(emp.id));

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => deleteEmployee(emp.id));

      tdActions.appendChild(editBtn);
      tdActions.appendChild(delBtn);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    updateSummary();
  }

  // ---------- Sorting ----------
  function sortBy(column) {
    if (sortState.column === column) sortState.asc = !sortState.asc;
    else {
      sortState.column = column;
      sortState.asc = true;
    }

    employees.sort((a, b) => {
      if (a[column] < b[column]) return sortState.asc ? -1 : 1;
      if (a[column] > b[column]) return sortState.asc ? 1 : -1;
      return 0;
    });

    renderTable(employees);
  }

  // ---------- Filters ----------
  const searchInput = document.getElementById("search");
  const roleSelect = document.getElementById("roleFilter");

  function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const role = roleSelect.value;

    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) &&
        (!role || emp.role === role)
    );
    renderTable(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  roleSelect.addEventListener("change", applyFilters);

  // ---------- Modal Handling ----------
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const employeeForm = document.getElementById("employeeForm");
  const nameInput = document.getElementById("name");
  const roleInput = document.getElementById("role");
  const scoreInput = document.getElementById("score");

  function openEditModal(id) {
    editId = id;
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;

    modalTitle.textContent = "Edit Employee";
    nameInput.value = emp.name;
    roleInput.value = emp.role;
    scoreInput.value = emp.score;

    modal.style.display = "block";
  }

  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ---------- Add/Edit Employee ----------
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const role = roleInput.value;
    const score = Number(scoreInput.value);

    if (score < 0 || score > 100) {
      alert("Score must be between 0-100");
      return;
    }

    if (editId) {
      const emp = employees.find((e) => e.id === editId);
      emp.name = name;
      emp.role = role;
      emp.score = score;
    } else {
      const newId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      employees.push({ id: newId, name, role, score });
    }

    modal.style.display = "none";
    editId = null;
    employeeForm.reset();
    renderTable(employees);
  });

  document.getElementById("addEmployeeBtn").addEventListener("click", () => {
    editId = null;
    modalTitle.textContent = "Add Employee";
    nameInput.value = "";
    roleInput.value = "Developer";
    scoreInput.value = "";
    modal.style.display = "block";
  });

  // ---------- Delete ----------
  function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    employees = employees.filter((e) => e.id !== id);
    renderTable(employees);
  }

  // ---------- Summary ----------
  function updateSummary() {
    const total = employees.length;
    const avg =
      total > 0
        ? (employees.reduce((sum, e) => sum + e.score, 0) / total).toFixed(1)
        : 0;
    const top =
      employees.reduce((prev, e) => (e.score > prev.score ? e : prev), {
        score: 0,
        name: "N/A",
      }) || { score: 0, name: "N/A" };

    const summary = document.getElementById("summary");
    summary.innerHTML = `
      <p>Total Employees: ${total}</p>
      <p>Average Score: ${avg}</p>
      <p>Top Performer: ${top.name} (${top.score})</p>
    `;
  }

  renderTable(employees);
});
