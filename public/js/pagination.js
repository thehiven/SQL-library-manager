function createPagination(page, booksLength) {
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  ul.className = 'pagination';
  div.appendChild(ul);

  fillPagination(ul, booksLength);
  page.appendChild(div);

  return ul;
}

function fillPagination(pagination, booksLength) {
  const numberOfPages = Math.ceil(booksLength / 5);
  for (let i = 0; i < numberOfPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'button';
    a.textContent = i + 1;

    li.appendChild(a);
    pagination.appendChild(li);
  }
}

function showPage(books, pageNumber) {
  const startNumber = pageNumber * 5 - 5;
  const endNumber = pageNumber * 5 - 1;

  books.forEach((book, index) => {
    if (index >= startNumber && index <= endNumber) {
      book.style.display = 'table-row';
    } else {
      book.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body;
  const books = document.querySelectorAll('tr.book-element');
  const pagination = createPagination(page, books.length);

  // control highlighted page
  let previousHighlight = pagination.firstChild.firstChild;
  previousHighlight.classList.add('active');
  showPage(books, 1);

  pagination.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      previousHighlight.classList.remove('active');
      e.target.classList.add('active');
      previousHighlight = e.target;
      
      showPage(books, parseInt(e.target.textContent));
    }
  });
});