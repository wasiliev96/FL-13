const root = document.getElementById("root");

const books = [
  {
    id: 1,
    name: "Unlocking Android",
    "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    "imageUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "plot": `Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.`

  },
  {
    id: 2,
    name: "Android in Action, Second Edition",
    "authors": ["W. Frank Ableson", "Robi Sen"],
    "imageUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
    "plot": `Android in Action, Second Edition is a comprehensive tutorial for Android developers. Taking you far beyond "Hello Android," this fast-paced book puts you in the driver's seat as you learn important architectural concepts and implementation strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in features by building useful and intriguing examples. `


  },
  {
    id: 3,
    name: "Specification by Example",
    "authors": ["Gojko Adzic"],
    "imageUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg"

  }
];

let currentBookId = null;
/**
 *
 * @param name
 * @param className
 * @returns {HTMLElement}
 */
const node = (name, className) => {
  const _node = document.createElement(name);
  if (className) {
    _node.className = className;
  }
  return _node;
};
const text = (name) => {
  return document.createTextNode(name);
};
const li = (className) => {
  const _li = node("li");
  if (className) {
    _li.className = className;
  }
  return _li;
};

let previousListItem;

const getTable = (books) => {
  const _app = node("div", "container");

  const _list = node("ul");
  _list.className = "bookList";

  const _viewBox = node("div", "view-box");
  _viewBox.className = "bookBox";

  for (const book of books) {
    const _li = li();
    _li.id = `book${book.id}`;
    _li.addEventListener("click", function () {
      if (previousListItem) {
        console.log("exist: " + previousListItem.className);
        previousListItem.classList.remove("active");
      }
      console.log(this.id);
      const targetBoxId = this.id.match(/\d*$/);
      const _target = document.getElementById(`article${targetBoxId}`);
      previousListItem = _target;
      _target.classList.add("active");
    });
    _li.appendChild(text(book.name));
    _list.appendChild(_li);

    const _bookPreview = node("article");
    _bookPreview.id = `article${book.id}`;
    _bookPreview.className = "bookPreview";

    const bookName = node("h1");
    bookName.appendChild(text(book.name));

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", book.imageUrl);

    const bookAuthors = node("em");
    bookAuthors.appendChild(text(book.authors));

    const plot = node("p");
    plot.appendChild(text(book.plot || "No description"));

    _bookPreview.appendChild(bookImage);
    _bookPreview.appendChild(bookName);
    _bookPreview.appendChild(bookAuthors);
    _bookPreview.appendChild(plot);

    _viewBox.appendChild(_bookPreview);
  }
  _app.appendChild(_list);
  _app.appendChild(_viewBox);
  return _app;
};

function App() {
  const build = () => {
    const _app = getTable(books);
    root.appendChild(_app);
  };
  return {
    build: build
  };
}

const app = new App();
app.build();