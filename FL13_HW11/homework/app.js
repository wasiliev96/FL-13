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


/**
 *
 * @param {[{}]} data
 * @returns {{createTree: createTree}} - run method interface
 * @constructor
 */
function DOMExplorer(data) {
    let _folderId = 0;
    const contextMenuActions = [
        {
            name: 'rename'
        },
        {
            name: 'delete'
        }
    ];
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
        _node.classList.add('node');
        return _node;

    };
    /**
     *
     * @param {*} innerData - inner data, not required
     * @returns {HTMLElement}
     * @param className
     */
    const ul = (innerData, className) => {
        const _container = createNode('ul', innerData);
        if (className) {
            _container.className = className;
        }
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
     * @param {HTMLElement} icon label's icon
     */
    const label = (title, inputId, icon) => {
        const _label = createNode('label');
        _label.setAttribute('for', inputId);
        _label.appendChild(icon);
        _label.appendChild(document.createTextNode(title));
        return _label;
    };

    /**
     *
     * @param {object} item - structured item(file|folder) schema
     * @returns {HTMLElement}
     */
    const createItem = (item) => {
        let _node = li();
        _node.addEventListener('contextmenu', (e) => {
            callContext(e);
        }, {})
        const _icon = createNode('i');
        _icon.className = 'material-icons';
        _node.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            this.classList.add('item__hover');
        }, false);
        _node.addEventListener('mouseout', function (e) {
            this.classList.remove('item__hover');
        }, false)
        if (item.folder) {
            _node.classList.add('folder');
            _icon.innerHTML = 'folder';
            const _label = label(item.title, `node` + ++_folderId, _icon);
            const _checkbox = checkbox(`node` + _folderId);
            _node.appendChild(_checkbox);
            _node.appendChild(_label);
            const _childrenList = ul('', 'container');
            if (item.children) {
                for (const child of item.children) {
                    const _child = createItem(child);
                    _childrenList.appendChild(_child);
                }
            } else {
                const _emptyText = document.createElement('em');
                _emptyText.innerHTML = 'Folder is empty';
                _childrenList.appendChild(_emptyText);
            }
            _node.appendChild(_childrenList);
            return _node;
        } else {
            _icon.innerHTML = 'insert_drive_file'
            _node.appendChild(_icon);
            _node.appendChild(document.createTextNode(item.title));
            return _node;
        }

    };

    const createTree = () => {
        let _data = data;
        const _parentTree = ul('', 'container');
        for (const item of _data) {
            const _item = createItem(item);
            _parentTree.appendChild(_item);
        }
        rootNode.appendChild(_parentTree);
    };
    const _contextMenu = createNode('div');
    _contextMenu.id = 'contextMenu';
    const _menuList = ul(null, 'menu-list');
    for (const contextAction of contextMenuActions) {
        _menuList.appendChild(li(contextAction.name));
    }
    _contextMenu.appendChild(_menuList);
    document.body.appendChild(_contextMenu);

    const callContext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.nodeName);
        if (e.target.nodeName === "EM") {
            return;
        }
        _contextMenu.style.top = e.clientY + 'px';
        _contextMenu.style.left = e.clientX + 'px';
        _contextMenu.style.display = 'inline-block';
        document.body.addEventListener('click', event => {
            _contextMenu.style.display = 'none'
        }, {
            once: true
        });
    }
    return {
        createTree: createTree
    };

}

const explorer = new DOMExplorer(data);
explorer.createTree();
