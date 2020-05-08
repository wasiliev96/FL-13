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

/**
 *
 * @param {[{}]} data
 * @returns {{run: run}} - run method interface
 * @constructor
 */
function DOMExplorer (data) {
  let _folderId = 0;

  /**
   *
   * @param {string} type HTML element tag name, required
   * @param {*} innerHTML - node inner data, not required
   * @returns {HTMLElement}
   */
  const createNode = (type, innerHTML = '') => {
    const _node = document.createElement(type);
    _node.innerHTML = innerHTML;
    return _node;
  };
  /**
   *
   * @param {*} innerData - li inner data, not required
   * @returns {HTMLElement}
   */
  const li = (innerData = '') => {
    const _node = createNode('li', innerData);
    _node.className = 'node';
    return _node;

  };
  /**
   *
   * @param {*} innerData - inner data, not required
   * @returns {HTMLElement}
   */
  const ul = (innerData = '') => {
    const _container = createNode('ul', innerData);
    _container.className = 'container';
    return _container;
  };
  /**
   *
   * @param {string} inputId - id for checkbox
   * @returns {HTMLElement}
   */
  const checkbox = (inputId) => {
    const _input = createNode('input');
    _input.setAttribute('type', 'checkbox');
    _input.setAttribute('id', inputId);
    return _input;
  };

  /**
   *
   * @param {string} title
   * @param {string} inputId - joined input id
   * @returns {HTMLElement}
   */
  const label = (title, inputId) => {
    const _label = createNode('label');
    _label.setAttribute('for', inputId);
    _label.innerHTML = title;
    return _label;
  };

  /**
   *
   * @param {object} item - structured item(file|folder) schema
   * @returns {HTMLElement}
   */
  const createItem = (item) => {
    let _node;
    if (item.folder) {
      _node = li();
      const _label = label(item.title, `node` + ++_folderId);
      _node.appendChild(_label);
      const _checkbox = checkbox(`node` + _folderId);
      _node.appendChild(_checkbox);
      if (item.children) {
        const _childrenList = ul();
        for (const child of item.children) {
          const _child = createItem(child);
          _childrenList.appendChild(_child);
        }
        _node.appendChild(_childrenList);
      }
      return _node;
    } else {
      _node = li(item.title);
      return _node;
    }

  };

  const run = () => {
    const _parentTree = ul();
    for (const item of data) {
      const _item = createItem(item);
      _parentTree.appendChild(_item);
    }
    rootNode.appendChild(_parentTree);
  };
  return {
    run: run
  };

}

const explorer = new DOMExplorer(data);
explorer.run();
