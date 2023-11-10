class Node {
    constructor(value = null) {
        this.right = null
        this.value = value
        this.left = null
    }
}

class BSTTree {
    constructor(arr) {
        arr.sort((a, b) => a - b);
        this.root = this.buildTree(arr, 0, arr.length - 1)
    }


    buildTree(arr, start, end) {
        if (start > end) return null
        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid])
        root.left = this.buildTree(arr, start, mid - 1)
        root.right = this.buildTree(arr, mid + 1, end)
        return root
    }

    delete(value) {
        this.root = this.deleteItem(this.root, value);
    }

    _getSuccesor(root) {
        root = root.right
        while (root !== null && root.left !== null) {
            root = root.left
        }
        return root
    }

    deleteItem(root, value) {
        if (root === null) {
            return root
        }

        if (value > root.value) {
            root.right = this.deleteItem(root.right, value)
        } else if (value < root.value) {
            root.left = this.deleteItem(root.left, value)
        } else {
            if (root.left === null) {
                return root.right
            }
            if (root.right === null) {
                return root.left
            }

            const succ = this._getSuccesor(root)
            root.value = succ.value
            root.right = this.deleteItem(root.right, succ.value)

        }
        return root


    }

    find(value) {
        let current = this.root
        while (current !== null) {

            if (current.value === value) {
                return true
            }
            if (current.value < value && current.right !== null) {
                current = current.right
            } else if (current.value > value && current.left !== null) {
                current = current.left
            } else break;

        }
        return false
    }

    levelOrderTraversal(callback) {
        if (!callback) {
            throw new Error('callback missing')
        }
        if (!this.root) {
            return
        }

        let queue = []
        queue.push(this.root)
        while (queue.length !== 0) {
            callback(queue[0])
            if (queue[0].left !== null) {

                queue.push(queue[0].left)
            }
            if (queue[0].right !== null) {
                queue.push(queue[0].right)
            }
            queue.shift()
        }
    }

    preorder(callback, root = this.root) {
        if (!callback) {
            throw new Error('callback missing')
        }
        if (!root) {
            return
        }
        callback(root)
        this.preorder(callback, root.left)
        this.preorder(callback, root.right)

    }

    height(x) {
        function findHeight(node) {
            if (!node) return null;
            if (node.value === x) {
                // compute height from this node
                const leftHeight = node.left ? findHeight(node.left) ?? -1 : -1;
                const rightHeight = node.right ? findHeight(node.right) ?? -1 : -1;
                return Math.max(leftHeight, rightHeight) + 1;
            }
            // keep searching
            return findHeight(node.left) ?? findHeight(node.right);
        }
        return findHeight(this.root);
    }

    // DEPTH: number of edges from root to the node
    depth(x) {
        function findDepth(node, current = 0) {
            if (!node) return null;
            if (node.value === x) return current;
            return findDepth(node.left, current + 1) ?? findDepth(node.right, current + 1);
        }
        return findDepth(this.root);
    }

    check(node = this.root) {
        if (!node) return { balanced: true, height: -1 };

        const left = this.check(node.left);
        const right = this.check(node.right);

        const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
        const height = 1 + Math.max(left.height, right.height);

        return { balanced, height };
    }

    inorder(callback, root = this.root) {

        if (!callback) {
            throw new Error('callback missing')
        }
        if (!root) {
            return
        }
        this.inorder(callback, root.left)
        callback(root)
        this.inorder(callback, root.right)

    }
    postorder(callback, root = this.root) {

        if (!callback) {
            throw new Error('callback missing')
        }
        if (!root) {
            return
        }
        this.postorder(callback, root.left)
        this.postorder(callback, root.right)
        callback(root)

    }


    insert(value) {
        const temp = new Node(value)
        if (this.root === null) {
            this.root = temp
            return true
        }

        let current = this.root
        while (current !== null) {
            if (current.value === value) {
                return false
            }
            else if (current.value > value && current.left !== null) {
                current = current.left
            } else if (current.value < value && current.right !== null) {
                current = current.right
            } else break;

        }

        if (current.value > value) {
            current.left = temp
        } else {
            current.right = temp
        }
        return true

    }

    rebalance() {
        const temptree = []
        this.preorder((node) => temptree.push(node.value))
        temptree.sort((a, b) => a - b)
        this.root = this.buildTree(temptree, 0, temptree.length - 1)

    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

function ranadomHundarr() {
    let arr = []
    for (let i = 0; i < 100; i++) {
        arr.push(Math.floor(Math.random() * 100))
    }
    return arr
}


let test = new BSTTree(ranadomHundarr())


let arrr = []
function printcallback(node) {

    arrr.push(node.value)
}

test.levelOrderTraversal(printcallback)
console.log(arrr)
arrr = []

test.preorder(printcallback)
console.log(arrr)
arrr = []

test.inorder(printcallback)
console.log(arrr)
arrr = []

test.postorder(printcallback)
console.log(arrr)
arrr = []

console.log(test.check())
test.insert(101);
test.insert(102);
test.insert(103);
test.insert(104);
test.insert(105);

prettyPrint(test.root)
console.log(test.check())
test.rebalance()
console.log(test.check())

prettyPrint(test.root)
