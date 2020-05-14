const root = document.getElementById('root');

const books = [
  {
    id: 0,
    name: 'Unlocking Android',
    'authors': ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'],
    'imageUrl': 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
    'plot': `Unlocking Android: A Developer's Guide provides concise, hands-on instruction 
    for the Android operating system and development tools. This book teaches important architectural
     concepts in a straightforward writing style and builds on this with practical and useful 
     examples throughout.`

  },
  {
    id: 1,
    name: 'Android in Action, Second Edition',
    'authors': ['W. Frank Ableson', 'Robi Sen'],
    'imageUrl': 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg',
    'plot': `Android in Action, Second Edition is a comprehensive tutorial for Android developers. 
    Taking you far beyond "Hello Android," this fast-paced book puts you in the driver's seat 
    as you learn important architectural concepts and implementation strategies. You'll master 
    the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in 
    features by building useful and intriguing examples. `


  },
  {
    id: 2,
    name: 'Specification by Example',
    'authors': ['Gojko Adzic'],
    'imageUrl': 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg',
    'plot': `Lorem ipsum dolor sit amet.`
  }
];

const node = (nodeName) => {
  return document.createElement(nodeName);
};
const nodeClass = (tagName, className) => {
  const _node = node(tagName);
  _node.className = className;
  return _node;
};
const nodeId = (tagName, id) => {
  const _node = node(tagName);
  _node.id = id;
  return _node;
};
const getId = (id) => {
  return document.getElementById(id);
};


function App() {
  let _activeCardId = null;
  let isPreviewActive = false;
  let _userBook = {};
  let _previousListItem = null;

  function setActiveCardId(id) {
    _activeCardId = id;
  }

  const _app = document.createElement('div');
  _app.id = 'app';
  let _books = books;

  function editCard(bookId) {
    setModal(_books[bookId]);
  }

  function setModal(bookObj) {
    const _modal = getId('modal');
    const _bookName = getId('modalName');
    _bookName.value = bookObj.name;
    const _bookImage = getId('modalImage');
    _bookImage.value = bookObj.imageUrl;
    const _bookAuthors = getId('modalAuthors');
    _bookAuthors.value = bookObj.authors;
    const _bookPlot = getId('modalPlot');
    _bookPlot.innerText = bookObj.plot;
    _modal.style.display = 'flex';
  }

  function generateSkeleton() {
//  app
    const _container = nodeClass('div', 'container');

    const _bookList = nodeId('ul', 'books');
    _container.appendChild(_bookList);

    const _lightBox = nodeId('div', 'lightBox');
    _container.appendChild(_lightBox);

    const _card = nodeId('div', 'card');
    _lightBox.appendChild(_card);

    _app.appendChild(_container);


    // card
    const _image = nodeId('img', 'cardImage');
    _image.setAttribute('src', '#');
    _card.appendChild(_image);

    const _name = nodeId('h2', 'cardName');
    _card.appendChild(_name);

    const _authors = nodeId('p', 'cardAuthors');
    _card.appendChild(_authors);

    const _plot = nodeId('p', 'cardPlot');
    _card.appendChild(_plot);

    const _buttons = nodeClass('div', 'buttons');
    _card.appendChild(_buttons);

    const _editBtn = nodeId('button', 'editBtn');
    _editBtn.innerText = 'Edit';
    _editBtn.addEventListener('click', function () {
      console.log('edit button');
      editCard(_activeCardId);
    });
    _buttons.appendChild(_editBtn);

    // modal
    const _modal = nodeId('div', 'modal');

    const _modalName = nodeId('input', 'modalName');

    const _modalImage = nodeId('input', 'modalImage');

    const _modalAuthors = nodeId('input', 'modalAuthors');

    const _modalPlot = nodeId('textarea', 'modalPlot');

    const _modalButtons = nodeClass('div', 'buttons');
    const _cancelBtn = nodeId('button', 'modalCancel');
    _cancelBtn.innerText = 'Cancel';
    const _saveBtn = nodeId('button', 'modalSave');
    _saveBtn.innerText = 'Save';
    _modalButtons.appendChild(_cancelBtn);
    _modalButtons.appendChild(_saveBtn);

    _modal.appendChild(_modalName);
    _modal.appendChild(_modalImage);
    _modal.appendChild(_modalAuthors);
    _modal.appendChild(_modalPlot);
    _modal.appendChild(_modalButtons);
    document.body.appendChild(_modal);

    function cancelHandler() {
      _modal.style.display = 'none';
    }

    _cancelBtn.addEventListener('click', cancelHandler), {once: true};

    _saveBtn.addEventListener('click', () => {
      _userBook.id = _activeCardId;
      _userBook.name = _modalName.value || 'No name';
      _userBook.imageUrl = _modalImage.value;
      _userBook.authors = _modalAuthors.value;
      _userBook.plot = _modalPlot.value;
      _books[_activeCardId] = _userBook;
      console.log(_books[_activeCardId]);
      const relativeLi = getId(`listItem${_activeCardId}`);
      relativeLi.innerText = _userBook.name;

      if (!_userBook) {
        alert('Book cannot be empty!');
      }
      _userBook = {};
      alert('saved');
      updateCard(_books[_activeCardId]);
      _modal.style.display = 'none';
    });
    _modal.style.display = 'flex';
  }


  function pushApp() {
    root.appendChild(_app);
  }

  function updateCard(item) {
    getId('cardImage').setAttribute('src', item.imageUrl || '#');
    getId('cardName').innerText = item.name || 'Unnamed title';
    getId('cardAuthors').innerText = item.authors || 'Author is unnamed';
    getId('cardPlot').innerText = item.plot || 'Empty...';
  }

  function pushList() {

    const _bookParent = document.querySelector('#books');


    const createListItem = (item) => {
      const _node = node('li');
      _node.id = `listItem${item.id}`
      ;
      const _name = document.createTextNode(item.name);
      _node.appendChild(_name);

      _node.addEventListener('click', function () {
        if (!_previousListItem) {
          _previousListItem = _node;
        } else {
          _previousListItem.classList.remove('active');
          _previousListItem = _node;
        }
        _node.classList.add('active');
        setActiveCardId(item.id);
        if (!isPreviewActive) {
          isPreviewActive = true;
          getId('card').style.display = 'flex';
        }
        updateCard(_books[item.id]);
        console.log(
          `active item id: ${item.id}`
        );
      });
      return _node;
    };

    for (const book of _books) {
      const _item = createListItem(book);
      _bookParent.appendChild(_item);
    }
  }

  return {
    generateSkeleton: generateSkeleton,
    pushApp: pushApp,
    pushList: pushList
  };
}

const app = new App();
app.generateSkeleton();
app.pushApp();
app.pushList();
console.log('done');