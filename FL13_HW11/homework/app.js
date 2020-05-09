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
    const label = (inputId,) => {
        const _label = createNode('label');
        _label.setAttribute('for', inputId);
        return _label;
    };

    /**
     *
     * @param {object} item - structured item(file|folder) schema
     * @returns {HTMLElement}
     */
    const createItem = (item) => {

        let _node = li();
        _node.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            this.classList.add('item__hover');
        }, false);
        _node.addEventListener('mouseout', function (e) {
            this.classList.remove('item__hover');
        }, false)

        _node.addEventListener('contextmenu', (e) => {
            callContext(e);
        }, {})
        const _icon = createNode('i');
        _icon.className = 'material-icons';

        const _label = label(`node` + ++_folderId);


        const _input = createNode('input');
        _input.setAttribute('type', 'text');
        _input.disabled = 'true';
        _input.value = item.title;

        _label.appendChild(_icon);
        _label.appendChild(_input);
        _node.appendChild(_label);

        if (item.folder) {
            _node.classList.add('folder');
            _icon.innerHTML = 'folder';
            const _checkbox = checkbox(`node` + _folderId);
            _node.appendChild(_checkbox);
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
            // _label.appendChild(document.createTextNode(item.title));
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


    const rename = (e) => {
        const _target = e.target.getElementsByTagName('input')[0];
        _target.disabled = false;
        const _targetSelection = _target.value.split('.')[0];
        _target.selectionStart = 0;
        _target.selectionEnd = _targetSelection.length;
        _target.focus();
    }
    const deleteItem = (e) => {
        e.target.style.display = 'none';
    }

    const contextMenuActions = [
        {
            name: 'rename',
            action: rename
        },
        {
            name: 'delete',
            action: deleteItem
        }
    ];
    //TODO: fix editable, fix target item(must be only #root li)
    let _contextTargetEvent = null;
    const _contextMenu = createNode('div');
    _contextMenu.id = 'contextMenu';
    const _menuList = ul(null, 'menu-list');

    for (const contextAction of contextMenuActions) {
        const _contextItem = li(contextAction.name);
        _contextItem.addEventListener('click', () => {
            contextAction.action(_contextTargetEvent);
        });
        _menuList.appendChild(_contextItem);
    }
    _contextMenu.appendChild(_menuList);
    document.body.appendChild(_contextMenu);


    const callContext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        _contextTargetEvent = e;
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
