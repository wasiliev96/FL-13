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

function App() {
  const _app = document.createElement("div");
  _app.id = "app";
  let _books = books;

  function generateSkeleton() {
    const _skeleton = document.createRange().createContextualFragment(`
      <div class="container">
        <div class="book-list">
          <ul id="books"></ul>
        </div>
        <div class="lightBox">
          <div id="bookCard"></div>
        </div>
      </div>
    `);
    _app.appendChild(_skeleton);
  }

  function pushApp() {
    root.appendChild(_app);
  }

  function pushList() {

    const _bookParent = document.querySelector("#books");

    function listCLickHandler(listObj) {
      console.table(listObj);
    }
    const createListItem = (item) => {
      const _node = document.createElement("li");
      const _name = document.createTextNode(item.name);
      _node.appendChild(_name);

      _node.addEventListener("click", function () {
        listCLickHandler(item);
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
console.log("done");