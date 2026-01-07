/* =========================
   UNIVERSAL SEARCH & FILTER
========================= */

/*
HTML STRUCTURE EXPECTED:

<input type="text" id="searchInput" placeholder="Search...">

<select id="semesterFilter">
  <option value="">All Semesters</option>
  <option value="sem1">Semester 1</option>
</select>

<select id="subjectFilter">
  <option value="">All Subjects</option>
  <option value="dsa">DSA</option>
</select>

<div class="content-grid">
  <div class="content-card" data-sem="sem1" data-subject="dsa">
      Data Structures Notes
  </div>
</div>
*/

const searchInput = document.getElementById("searchInput");
const semesterFilter = document.getElementById("semesterFilter");
const subjectFilter = document.getElementById("subjectFilter");
const cards = document.querySelectorAll(".content-card");

function filterContent() {
    const searchText = searchInput?.value.toLowerCase() || "";
    const semValue = semesterFilter?.value || "";
    const subValue = subjectFilter?.value || "";

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const sem = card.dataset.sem || "";
        const subject = card.dataset.subject || "";

        const matchesSearch = text.includes(searchText);
        const matchesSem = !semValue || sem === semValue;
        const matchesSub = !subValue || subject === subValue;

        card.style.display =
            matchesSearch && matchesSem && matchesSub
                ? "block"
                : "none";
    });
}

/* =========================
   EVENT LISTENERS
========================= */
searchInput?.addEventListener("input", filterContent);
semesterFilter?.addEventListener("change", filterContent);
subjectFilter?.addEventListener("change", filterContent);
