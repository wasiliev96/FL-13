const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

// TODO: your code goes here

function DOMExplorer (data, rootNode) {
  const _data = data;
  const _rootNode = rootNode || document.body;
  const _parentTree = document.createElement('ul');
  const createNode = (parentNode, node) => {
    const type_file = 'li';
    const type_folder = 'ul';
    const _name = document.createTextNode(
      node.folder ? `Folder ${ node.title }:` : node.title);
    const _node = document.createElement(node.folder ? type_folder : type_file);
    const _folder = document.createElement(type_folder);

    if (node.folder && node.children) {
      node.children.map((item) => {
        _node.appendChild(createNode(_node, item));
      });
      _folder.appendChild(_name);
      _folder.appendChild(_node);
      return _folder;
    } else {
      _node.appendChild(_name);
      return _node;
    }
  };

  const run = () => {
    _data.forEach((item) => {
      _parentTree.appendChild(createNode(_rootNode, item));
    });
    _rootNode.appendChild(_parentTree);
  };

  return {
    run: run
  };
};

const explorer = new DOMExplorer(data, rootNode);
explorer.run();
