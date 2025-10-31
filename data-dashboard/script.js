document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", () => {
    let employees = [
      { id: 1, name: "Alice Johnson", role: "Developer", score: 88 },
      { id: 2, name: "James Smith", role: "Designer", score: 73 },
      { id: 3, name: "Fatou Kamara", role: "Project Manager", score: 91 },
      { id: 4, name: "David Mwangi", role: "QA Engineer", score: 64 },
    ];

    let sortState = { column: null, asc: true };

    function renderTable(data) {
      const container = document.getElementById("tableContainer");
      container.innerHTML = "";

      const table = document.createElement("table");

      // Header row
      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      ["Name", "Role", "Score", "Actions"].forEach((col) => {
        const th = document.createElement("th");
        th.textContent = col;

        // Sorting click listeners
        if (col !== "Actions") {
          th.style.cursor = "pointer";
          th.addEventListener("click", () => sortBy(col.toLowerCase()));
        }

        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead);

      // Body
      const tbody = document.createElement("tbody");
      data.forEach((emp) => {
        const tr = document.createElement("tr");

        // Conditional styling
        if (emp.score >= 85) tr.classList.add("high-score");
        else if (emp.score >= 70) tr.classList.add("medium-score");
        else tr.classList.add("low-score");

        // Cells
        ["name", "role", "score"].forEach((key) => {
          const td = document.createElement("td");
          td.textContent = emp[key];
          tr.appendChild(td);
        });

        // Actions
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

      updateSummary(); // update stats after rendering
    }
