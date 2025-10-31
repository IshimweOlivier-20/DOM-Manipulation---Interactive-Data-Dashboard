## InsightFlow Employee Performance Dashboard

### Overview

**InsightFlow** is a web-based data dashboard designed to track and manage employee performance metrics.
Built entirely using **Vanilla JavaScript**, **HTML**, and **CSS**, it dynamically renders employee data, allows inline edits through modals, and provides sorting, searching, and filtering — all without page reloads or external libraries.

---

### Features

#### 1. Dynamic Table Rendering

* Renders employee data dynamically from a static JavaScript array.
* Uses only DOM methods like `createElement()`, `appendChild()`, and `textContent`.
* No static HTML table is preloaded — everything is generated on page load.

#### 2. Interactive Sorting

* Click on **Name**, **Role**, or **Score** headers to sort the table.
* Sorting toggles between ascending and descending order.

#### 3. Search & Filter

* **Search bar** filters employees by name as you type.
* **Dropdown filter** allows you to display specific roles (e.g., Developer, Designer).
* Both filters work together for precise results.

#### 4. Inline Editing via Modal

* Each row includes an **Edit** button.
* Clicking **Edit** opens a modal where you can modify an employee’s role and score.
* Input validation ensures score values are between 0–100.
* Changes instantly update both the array and the DOM.

#### 5. Add & Delete Employees

* **Add Employee** button opens a form to input new data.
* Submitting adds the new employee to the table dynamically.
* **Delete** button removes employees from the list and re-renders the table.

#### 6. Visual Highlighting

* **Green** background: score ≥ 85 (High performers)
* **Yellow** background: 70 ≤ score < 85 (Average performers)
* **Red** background: score < 70 (Low performers)
* Coloring updates automatically when data changes.

#### 7. Summary Section

Displays dynamic metrics that automatically update after any change:

* Total number of employees
* Average performance score
* Highest performing employee’s name

---

### Technologies Used

* **HTML5** – structure and semantic layout
* **CSS3** – styling, responsive design, and animations
* **JavaScript (ES6+)** – DOM manipulation, event handling, dynamic updates

---

### Future Improvements

* ✅ Add persistent data storage using **LocalStorage** or **IndexedDB**.
* ✅ Add **CSV import/export** functionality for batch updates.
* ✅ Implement pagination for large datasets.
* ✅ Add role-based analytics or charts for insights.

