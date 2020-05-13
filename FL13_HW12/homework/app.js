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
    "imageUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "plot": `Lorem ipsum dolor sit amet.`
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

const editBook = (bookJson, bookDiv) => {
  console.log(`bookJson: ${bookJson}\n bookDiv: ${{bookDiv}}`);

  const _modal = node("div");
  const _modalInner = node("div");
  _modalInner.className = "modal";

  _modal.appendChild(_modalInner);

  for (const prop in bookJson) {
    let _input;
    if (prop === "id") {
      continue;
    }
    if (prop === "plot") {
      _input = node("textarea");
    } else {
      _input = node("input");
      _input.setAttribute("type", "text");
    }
    _input.id = prop;
    _input.value = bookJson[prop];
    _modalInner.appendChild(_input);
    console.log(`Prop: ${prop} input added`);
  }
  const _modalControl = node("div");
  _modalControl.id = "modalControl";

  const _modalCancel = node("button");
  _modalCancel.id = "modalCancel";
  _modalCancel.innerHTML = "Cancel";
  _modalControl.appendChild(_modalCancel);

  const _modalSave = node("button");
  _modalSave.id = "modalSave";
  _modalSave.innerHTML = "Save";
  _modalControl.appendChild(_modalSave);


  _modalInner.appendChild(_modalControl);

  root.appendChild(_modal);
};

const getTable = (books) => {
  const _app = node("div", "container");


  const _list = node("ul");
  _list.className = "bookList";

  const _viewBox = node("div", "bookBox");

  const _button = node("button");

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
      _button.addEventListener("click", function () {
        editBook(book, _target);
      });
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
  _button.innerHTML = "button";
  _button.className = "btn btn-edit";

  _viewBox.appendChild(_button);

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