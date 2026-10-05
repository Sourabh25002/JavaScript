// All chapters of the notes. To add a new chapter, add one line here —
// the sidebar on every chapter page and the list on the home page update by themselves.
const chapters = [
  { file: "01-introduction.html",     title: "Introduction to JavaScript", about: "What JavaScript is, where it runs, a quick tour" },
  { file: "02-lexical-structure.html", title: "Lexical Structure",          about: "Naming rules, comments, and the semicolon trap" },
];

// "01", "02", ... from the chapter's position in the list
const chapterNumber = (index) => String(index + 1).padStart(2, "0");

const homeList = document.getElementById("chapter-list");

if (homeList) {
  // ---------- Home page: fill the chapter list ----------
  homeList.innerHTML = chapters.map((ch, i) => `
    <li>
      <a href="chapters/${ch.file}">
        <span class="ch">${chapterNumber(i)}</span>
        <span>${ch.title}<small>${ch.about}</small></span>
      </a>
    </li>`).join("");
} else {
  // ---------- Chapter page: build the sidebar ----------
  const currentFile = location.pathname.split("/").pop();

  // Give every section heading an id (e.g. "s1-1") so the sidebar can link to it
  const sections = [...document.querySelectorAll("main h2")].map((h2) => {
    const num = h2.querySelector(".num")?.textContent.trim() ?? "";
    h2.id = "s" + num.replace(".", "-");
    return { id: h2.id, num, title: h2.textContent.replace(num, "").trim() };
  });

  const items = chapters.map((ch, i) => {
    const isCurrent = ch.file === currentFile;
    const sectionLinks = isCurrent
      ? `<ul class="sections">${sections.map((s) =>
          `<li><a href="#${s.id}"><span>${s.num}</span>${s.title}</a></li>`).join("")}</ul>`
      : "";
    return `
      <li class="${isCurrent ? "current" : ""}">
        <a href="${ch.file}"><span class="ch">${chapterNumber(i)}</span>${ch.title}</a>
        ${sectionLinks}
      </li>`;
  }).join("");

  const sidebar = document.createElement("nav");
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <a class="sidebar-home" href="../index.html">JavaScript Notes</a>
    <ol>${items}</ol>`;

  document.body.prepend(sidebar);
  document.body.classList.add("has-sidebar");
}
