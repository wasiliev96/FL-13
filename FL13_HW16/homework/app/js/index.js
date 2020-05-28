const baseUrl = "http://localhost:3000";
const appContainer = document.getElementById("app-container");
const usersList = document.getElementById("usersList");
const addUserBtn = document.getElementById("addUser");
const nameField = document.getElementById("name");
const usernameField = document.getElementById("username");
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

function updateList() {
  xhr.open("GET", `${baseUrl}/users`, true);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      fillTable(JSON.parse(xhr.responseText));
    }
  };
}
updateList();

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

addUserBtn.addEventListener("click", function () {
  xhr.open("POST", `${baseUrl}/users`, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(
    JSON.stringify({ name: nameField.value, username: usernameField.value })
  );
  xhr.onload = () => {
    updateList();
  };
});
