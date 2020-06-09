class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    // TODO
    const newNode = new BSTNode({ key: key, value: value, parent: null, left: null, right: null });
    
    if (this._root == undefined) {
      this._root = newNode;
      this._count ++;
      return;
    }

    var currNode = this._root;
    
    while (currNode) {
      if (newNode.key == currNode.key) {
        currNode.value = newNode.value;
        return;
      }

      var parent = null;

      if (newNode.key < currNode.key) {
        if (currNode.left) {
          parent = currNode;
          currNode = currNode.left;
        } else {
          currNode.left = newNode;
          this._count += 1;
          currNode.left.parent = parent;
          return;
        }
      } else if (newNode.key > currNode.key) {
        if (currNode.right) {
          parent = currNode;
          currNode = currNode.right;
        } else {
          currNode.right = newNode;
          this._count += 1;
          currNode.right.parent = parent;
          return;
        }
      }
    }
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key == node.key) { // equal
        return node.value;
      } else if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      }
    }
    return undefined;
  }

  delete(key) {
    // TODO (tests first!)
    let node = this._root;
    while (node) {
      if (key == node.key) { // equal

        // save node.value
        var returnedVal = node.value;

        // find largest node in left subtree
        let curr = node;
        if (node.left && node.right) {
          curr = node.left;
        } else if (!node.left && node.right) {
          curr = node.right;
        }
        
        while (curr.right) {
          curr = curr.right;
        }

        // replace node.value with largest node.value
        node.value = curr.value;
        node.key = curr.key;

        // remove node that was copied
        curr = undefined;

        // reduce count by 1
        this._count --;

        // return node.value 
        return returnedVal;
      } else if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      }
    }
    return undefined;
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;