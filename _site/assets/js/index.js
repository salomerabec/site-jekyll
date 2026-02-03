document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".typewriter");
  const paragraphs = Array.from(container.querySelectorAll("p"));

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");

  let pIndex = 0;

  function typeParagraph(p, next) {
    const text = p.textContent;
    p.textContent = "";

    // on crée un span pour contenir le texte tapé
    const textSpan = document.createElement("span");
    p.appendChild(textSpan);

    // on ajoute le curseur juste après le texte
    p.appendChild(cursor);

    p.style.visibility = "visible";

    let i = 0;

    function typeChar() {
      if (i < text.length) {
        textSpan.textContent += text[i];
        i++;
        setTimeout(typeChar, 20);
      } else {
        setTimeout(next, 300);
      }
    }

    typeChar();
  }

  function typeAll() {
    if (pIndex < paragraphs.length) {
      typeParagraph(paragraphs[pIndex], () => {
        pIndex++;
        typeAll();
      });
    } else {
      // Curseur final : on le laisse après le dernier texteSpan
      paragraphs[paragraphs.length - 1].appendChild(cursor);
    }
  }

  typeAll();
});
