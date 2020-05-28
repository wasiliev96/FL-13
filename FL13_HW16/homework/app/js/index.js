const baseUrl = "http://localhost:3000";
const appContainer = document.getElementById("app-container");
const usersList = document.getElementById("usersList");
// Your code goes here
usersList.innerText = "Loading...";
function createNode(
  tagName,
  nodeClass = null,
  nodeId = null,
  innerText = null
) {
  const _node = document.createElement(tagName);
  if (nodeClass) {
    _node.className = nodeClass;
  }
  if (nodeId) {
    _node.id = nodeId;
  }
  if (innerText) {
    _node.appendChild(document.createTextNode(innerText));
  }
  return _node;
}

const xhr = new XMLHttpRequest();

xhr.open("GET", `${baseUrl}/users`, true);

xhr.send(); // (1)

xhr.onreadystatechange = function () {
  // (3)
  if (xhr.readyState !== 4) return;

  if (xhr.status !== 200) {
    alert(xhr.status + ": " + xhr.statusText);
  } else {
    //main treat
    fillTable(JSON.parse(xhr.responseText));
  }
};

function fillTable(data) {
  const container = document.createDocumentFragment();
  for (let user of data) {
    const _li = createNode("li");
    const userId = createNode("div", "user-id", null, user.id);
    _li.appendChild(userId);
    const uname = createNode("input", "name", null);
    uname.setAttribute("type", "text");
    uname.value = user.name;
    _li.appendChild(uname);
    const username = createNode("input", "username", null);
    username.setAttribute("type", "text");
    username.value = user.username;
    _li.appendChild(username);

    _li.appendChild(username);
    const _buttonsGroup = createNode("div", "buttonsGroup", null);

    const btnUpdate = createNode("button", "update", null, "Update");
    _buttonsGroup.appendChild(btnUpdate);
    const btnDelete = createNode("button", "delete", null, "Delete");
    _buttonsGroup.appendChild(btnDelete);

    _li.appendChild(_buttonsGroup);
    container.appendChild(_li);
  }
  usersList.innerText = "";
  usersList.appendChild(container);
}
