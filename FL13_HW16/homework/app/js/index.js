const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const usersList = document.getElementById('usersList');
const addUserBtn = document.getElementById('addUser');
const nameField = document.getElementById('name');
const usernameField = document.getElementById('username');
// Your code goes here
usersList.innerText = 'Loading...';

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
  const SUCCESS_STATUS = 200;
  xhr.open('GET', `${baseUrl}/users`, true);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === SUCCESS_STATUS) {
      fillTable(JSON.parse(xhr.responseText));
    }
  };
}

updateList();

function updateItem(id, name, username, callTarget) {
  const SUCCESS_STATUS = 204;
  callTarget.disabled = true;
  xhr.open('PUT', `${baseUrl}/users/${id}`, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({name: name, username: username}));
  console.log(xhr.status);
  xhr.onload = () => {
    if (xhr.status === SUCCESS_STATUS) {
      console.log('item updated');
      callTarget.disabled = false;
    }
  };
}

function deleteItem(id, callTarget) {
  const SUCCESS_STATUS = 204;
  callTarget.disabled = true;
  console.log(id);
  xhr.open('DELETE', `${baseUrl}/users/${id}`, true);
  xhr.setRequestHeader('Authorization', 'admin');
  xhr.send();
  xhr.onload = () => {
    console.log(xhr.status);
    if (xhr.status === SUCCESS_STATUS) {
      console.log('item deleted');
      updateList();
    } else {
      callTarget.disabled = false;
    }
  };
}

function fillTable(data) {
  const container = document.createDocumentFragment();
  for (let user of data) {
    const _li = createNode('li');
    const userId = createNode('div', 'user-id', null, user.id);
    _li.appendChild(userId);
    const uname = createNode('input', 'name', null);
    uname.setAttribute('type', 'text');
    uname.value = user.name;
    _li.appendChild(uname);
    const username = createNode('input', 'username', null);
    username.setAttribute('type', 'text');
    username.value = user.username;
    _li.appendChild(username);

    _li.appendChild(username);
    const _buttonsGroup = createNode('div', 'buttonsGroup', null);
    _buttonsGroup.setAttribute('data-id', user.id);

    const btnUpdate = createNode('button', 'update', null, 'Update');
    btnUpdate.addEventListener('click', function (e) {
      const id = e.target.parentElement.dataset.id;
      const name = e.target.parentElement.parentElement.getElementsByClassName(
        'name'
      )[0].value;
      const username = e.target.parentElement.parentElement.getElementsByClassName(
        'username'
      )[0].value;
      updateItem(id, name, username, this);
    });
    _buttonsGroup.appendChild(btnUpdate);
    const btnDelete = createNode('button', 'delete', null, 'Delete');
    btnDelete.addEventListener('click', function (e) {
      const id = e.target.parentElement.dataset.id;
      deleteItem(id, this);
    });
    _buttonsGroup.appendChild(btnDelete);

    _li.appendChild(_buttonsGroup);
    container.appendChild(_li);
  }
  usersList.innerText = '';
  usersList.appendChild(container);
}

addUserBtn.addEventListener('click', function () {
  xhr.open('POST', `${baseUrl}/users`, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(
    JSON.stringify({name: nameField.value, username: usernameField.value})
  );
  xhr.onload = () => {
    updateList();
  };
});
