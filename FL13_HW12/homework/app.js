let booksLibrary = JSON.parse(localStorage.getItem('books'));
const getId = id => {
  return document.getElementById(id);
};
const createNode = (type, id = null, className = null, innerNode = null) => {
  const node = document.createElement(type);
  if (className) {
    node.className = className;
  }
  if (id) {
    node.id = id;
  }
  if (innerNode) {
    node.appendChild(innerNode);
  }
  return node;
};
const root = getId('root');
const booksWrapper = createNode('div', 'booksWrapper');
const books = createNode('ul', 'books');
booksWrapper.appendChild(books);
const addBookBtn = createNode('button', 'addBook');
addBookBtn.innerHTML = 'Add Book';
booksWrapper.appendChild(addBookBtn);

const previewBox = createNode('div', 'previewBox');
const preview = createNode('div', 'preview');
const previewBookName = createNode('h1', 'previewBookName');
preview.appendChild(previewBookName);
const previewBookImage = createNode('img', 'previewBookImage');
previewBookImage.setAttribute('src', '#');
previewBookImage.setAttribute('alt', 'book image');
preview.appendChild(previewBookImage);
const previewBookAuthors = createNode('p', 'previewBookAuthors');
preview.appendChild(previewBookAuthors);
const previewBookPlot = createNode('p', 'previewBookPlot');
preview.appendChild(previewBookPlot);
previewBox.appendChild(preview);

const editView = createNode('div', 'editView');
editView.className = 'hidden';

const editNameLabel = createNode('label');
editNameLabel.appendChild(document.createTextNode('Book name:'));
const editBookNameInput = createNode('input', 'editBookNameInput');
editBookNameInput.setAttribute('type', 'text');
editNameLabel.appendChild(editBookNameInput);
editView.appendChild(editNameLabel);

const editImageLabel = createNode('label');
editImageLabel.appendChild(document.createTextNode('Book image:'));
const editImageName = createNode('input', 'editBookImageInput');
editImageLabel.setAttribute('type', 'text');
editImageLabel.appendChild(editImageName);
editView.appendChild(editImageLabel);

const editAuthorsLabel = createNode('label');
editAuthorsLabel.appendChild(document.createTextNode('authors:'));
const editAuthorsName = createNode('input', 'editBookAuthorsInput');
editAuthorsLabel.setAttribute('type', 'text');
editAuthorsLabel.appendChild(editAuthorsName);
editView.appendChild(editAuthorsLabel);

const editPlotLabel = createNode('label');
editPlotLabel.appendChild(document.createTextNode('plot:'));
const editPlotName = createNode('textarea', 'editBookPlotInput');
editPlotLabel.appendChild(editPlotName);
editView.appendChild(editPlotLabel);

const editControls = createNode('div', null, 'edit-control');
const editCancelBtn = createNode('button', 'editCancel', 'cancel-btn');
editCancelBtn.innerHTML = 'Cancel';
const editSaveBtn = createNode('button', 'editSave', 'save-btn');
editSaveBtn.innerHTML = 'Save';
editSaveBtn.addEventListener('click', function () {
  saveEdit(this.dataset.target);
});
editControls.appendChild(editCancelBtn);
editControls.appendChild(editSaveBtn);
editView.appendChild(editControls);
previewBox.appendChild(editView);

const addView = createNode('div', 'add');
addView.className = 'hidden';

const addNameLabel = createNode('label');
addNameLabel.appendChild(document.createTextNode('Book name:'));
const addBookName = createNode('input', 'addBookNameInput');
addBookName.setAttribute('type', 'text');
addNameLabel.appendChild(addBookName);
addView.appendChild(addNameLabel);

const addImageLabel = createNode('label');
addImageLabel.appendChild(document.createTextNode('Book image:'));
const addImageName = createNode('input', 'addBookImageInput');
addImageLabel.setAttribute('type', 'text');
addImageLabel.appendChild(addImageName);
addView.appendChild(addImageLabel);

const addAuthorsLabel = createNode('label');
addAuthorsLabel.appendChild(document.createTextNode('authors:'));
const addAuthorsName = createNode('input', 'addBookAuthorsInput');
addAuthorsLabel.setAttribute('type', 'text');
addAuthorsLabel.appendChild(addAuthorsName);
addView.appendChild(addAuthorsLabel);

const addPlotLabel = createNode('label');
addPlotLabel.appendChild(document.createTextNode('plot:'));
const addPlotName = createNode('textarea', 'addBookPlotInput');
addPlotLabel.appendChild(addPlotName);
addView.appendChild(addPlotLabel);

const addControls = createNode('div', null, 'add-control');
const addCancelBtn = createNode('button', 'addCancel', 'cancel-btn');
addCancelBtn.innerHTML = 'Cancel';
const addSaveBtn = createNode('button', 'addSave', 'save-btn');
addSaveBtn.innerHTML = 'Save';
addControls.appendChild(addCancelBtn);
addControls.appendChild(addSaveBtn);
addView.appendChild(addControls);
previewBox.appendChild(addView);
root.appendChild(booksWrapper);
root.appendChild(previewBox);

function updatebookList() {
  books.innerHTML = booksLibrary
    .map(
      (book, index) =>
        `<li>
        <a href='index.html?id=${index}' onclick = 'linkHandler(event)'>${book.name}</a>
        <button class='edit-book-li' onclick="edit(event)">edit</button>
        </li>`
    )
    .join('');
}

updatebookList();

function switchView(view, book, bookId) {
  switch (view) {
    case edit:
      editBookNameInput.value = book.name || '';
      editImageName.value = book.image || '';
      editAuthorsName.value = book.authors || '';
      editPlotName.innerText = book.plot || '';
      editSaveBtn.dataset.target = bookId;
      setActiveView(editView);
      break;
    default:
      previewBookName.innerHTML = book.name || 'No name';
      previewBookImage.setAttribute('src', book.image || '');
      previewBookAuthors.innerHTML = book.authors || 'Unknown authors';
      previewBookPlot.innerHTML = book.plot || 'No plot';
      setActiveView(preview);
      break;
  }
}

function updatePreview() {
  const bookId = +location.search.match(/\d*$/)[0];
  console.log('updatePreview=>bookId: ' + bookId);
  const book = booksLibrary[bookId];
  if (!book) {
    return;
  }
  switch (location.hash) {
    case '#edit':
      switchView(edit, book, bookId);
      break;
    default:
      switchView(preview, book);
      break;
  }
}

function linkHandler(e) {
  e.preventDefault();
  let state = {
    page: e.target.href
  };
  if (addBookBtn.disabled) {
    addBookBtn.disabled = false;
  }
  console.log(`state page: ${state.page}`);

  history.pushState(state, '', state.page + '#preview');

  setActiveView(preview);
  updatePreview();
  console.log(`book id: ${+location.search.match(/\d*$/)}`);
}

window.addEventListener('popstate', function () {
  updatePreview();
});

window.onunload = function () {
  localStorage.setItem('books', JSON.stringify(booksLibrary));
};

function updateSearch(book) {
  previewBookName.innerHTML = book.name || 'No name';
  previewBookImage.setAttribute('src', book.image || '');
  previewBookAuthors.innerHTML = book.authors || 'Unknown authors';
  previewBookPlot.innerHTML = book.plot || 'No plot';
  updatePreview();
}

window.onload = function () {
  const UNWANTED_HASH_CHARS_LENGTH = 4;
  let searchId = location.search.slice(UNWANTED_HASH_CHARS_LENGTH) || null;
  console.log('window.onload -> searchId ', searchId);

  if (searchId && searchId < booksLibrary.length) {
    updateSearch(booksLibrary[searchId]);
  } else {
    history.pushState('', '', '/index.html');
  }
  updatePreview();
};

function validateEditInput() {
  if (editBookNameInput.value.length <= 0) {
    alert('invalid Book Title!');
    return false;
  }
  if (editBookNameInput.value.length <= 0) {
    alert(addBookName.value);
    alert('invalid image path!');
    return false;
  }
  if (editAuthorsName.value.length <= 0) {
    alert('invalid author name!');
    return false;
  }
  if (editPlotName.value.length <= 0) {
    alert('invalid plot!');
    return false;
  }
  return true;
}

function edit(event) {
  addBookBtn.disabled = true;

  const bookId = +event.target.previousElementSibling.href.match(/\d*$/)[0];
  console.log('edit -> bookId', bookId);
  const book = booksLibrary[bookId];

  history.pushState('', '', event.target.previousElementSibling.href + '#edit');
  setActiveView(editView);
  editBookNameInput.value = book.name || '';
  editImageName.value = book.image || '';
  editAuthorsName.value = book.authors || '';
  editPlotName.innerText = book.plot || '';
  editSaveBtn.dataset.target = bookId + '';
}

addBookBtn.addEventListener('click', addBookView);

function addBookView() {
  addBookBtn.disabled = true;
  setActiveView(addView);
  const locationString = './index.html' + '#add';
  history.pushState('', '', locationString);
  preview.classList.add('hidden');
  addView.classList.remove('hidden');
  addBookName.value = '';
  addImageName.value = '';
  addAuthorsName.value = '';
  addPlotName.value = '';

  addSaveBtn.addEventListener('click', saveBtnHandler);
}

function validateInput() {
  if (addBookName.value.length <= 0) {
    alert('invalid Book Title!');
    return false;
  }
  if (addImageName.value.length <= 0) {
    alert('invalid image path!');
    return false;
  }
  if (addAuthorsName.value.length <= 0) {
    alert('invalid author name!');
    return false;
  }
  if (addPlotName.value.length <= 0) {
    alert('invalid plot!');
    return false;
  }
  return true;
}

function saveBtnHandler() {
  if (!validateInput()) {
    return;
  }
  addBookBtn.disabled = false;
  booksLibrary.push({
    name: addBookName.value,
    image: addImageName.value,
    authors: addAuthorsName.value,
    plot: addPlotName.value
  });
  updatebookList();
  updatePreview();
  setActiveView(preview);
  addSaveBtn.removeEventListener('click', saveBtnHandler);
}

const cancelBtns = document.getElementsByClassName('cancel-btn');
[...cancelBtns].map(btn => {
  btn.addEventListener('click', function () {
    if (confirm('Discard changes?')) {
      addBookBtn.disabled = false;
      history.back();
    }
  });

  return 0;
});

function saveEdit(target) {
  if (!validateEditInput()) {
    return;
  }
  addBookBtn.disabled = false;
  booksLibrary[target].name = editBookNameInput.value;
  console.log(
    'saveEdit -> booksLibrary[target].name',
    booksLibrary[target].name
  );

  booksLibrary[target].image = editImageName.value;
  console.log(
    'saveEdit -> booksLibrary[target].image',
    booksLibrary[target].image
  );

  booksLibrary[target].authors = editAuthorsName.value;
  console.log(
    'saveEdit -> booksLibrary[target].authors',
    booksLibrary[target].authors
  );
  booksLibrary[target].plot = editPlotName.value;
  console.log(
    'saveEdit ->   booksLibrary[target].plot',
    booksLibrary[target].plot
  );
  history.back();
  updatebookList();
  updatePreview();
  const ALERT_TIMEOUT = 300;
  setTimeout(() => {
    alert('Book successfully updated!');
  }, ALERT_TIMEOUT);
}

function setActiveView(visibleView) {
  [preview, addView, editView].map(view => {
    if (!view.classList.contains('hidden')) {
      view.classList.add('hidden');
    }
    visibleView.classList.remove('hidden');
    return true;
  });
}
