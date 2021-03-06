/* eslint-disable no-unreachable */
class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree    
        if(this.key == null) {
            this.key = key;
            this.value = value;
        }
        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
             /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
               if(this.left == null) {
                   this.left = new BinarySearchTree(key, value, this);
               }
               /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
               else {
                   this.left.insert(key, value);
               }
        }
        /* Similarly, if the new key is greater than the node's key 
        then you do the same thing, but on the right-hand side */
        else {
            if(this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    //average time complexity O(log(n)
    find(key) {
        // If the item is found at the root then return that value
        if(this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key error');
        }
    }

    remove(key) {
        if(this.key == key) {
            if(this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key error');
        }
    }

    _replaceWith(node) {
        if(this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if ( this == this.parent.right) {
                this.parent.right = node;
            }
            if(node) {
                node.parent = this.parent;
            }
        }
        else {
            if(node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if(!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

//#4. 
//This function will calculate the combined values of all the nodes in the tree.
//If the tree does not exist it will return 0
//Otherwise, it recursively call itself and add's to the value of each node in every branch.
//It goes down both the left and right branches.
//Runtime is linear O(n), the bigger the tree, the longer it will take
//If we passed our numberBST the result will be 37
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}

//#5 Height of a BST
//Runtime is linear O(n) because we go through both sides of the tree
function treeHeight(t){
    let left = 0;
    let right = 0;

    if(!t) 
        return 0;
    else {
        //computing the depth of each subtree
        left = treeHeight(t.left);
        right = treeHeight(t.right);
        //use the larger one
        if(left > right) {
            return left + 1;
        }
        else {
            return right + 1;
        }
    }  
}

//#6 is it BST?
function isItBST(t) {
    if(t.left) {
        if(t.left.key < t.key) {
            return isItBST(t.left);
        } else {
            return false;
        }
    }
    
    if(t.right) {
        if(t.right.key < t.key) {
            return isItBST(t.right);
        } else {
            return false;
        }
    }
    return true;
}

//#7 3rd largest node
function thirdLargest(tree){
    let arr = [];
    const tData = (t) => {
        if(!t) return;
        arr.push(t.key);
        tData(t.left);
        tData(t.right);
    };
    tData(tree);
    arr.sort();
    return arr[arr.length-3];
}

//#8 isBalanced 
// function isBalanced (t){

//     if(t === null){
//         return true;
//     }

//     if(heightCheck(t) === -1){
//         return false;
//     } 
//     else {
//         return isBalanced(t.left) && isBalanced(t.right);
//     }

// }

// function heightCheck(t) {
//     if(t === null){
//         return 0;
//     }
//     let lh = heightCheck(t.left);
//     let rh = heightCheck(t.right);
//     let heightDiff = lh-rh;
//     if(Math.abs(heightDiff) > 1){
//         return -1;
//     } else {
//         return Math.max(lh, rh) + 1;
//     }
// }

function isBalanced(t) {
    let left = treeHeight(t.left);
    console.log('left' + left);
    let right = treeHeight(t.right);
    console.log('right' + right);
    
    if(Math.abs(right-left) < 1){
        console.log(true);
        return true;
    }
    else if(Math.abs(right-left) >= 1){
        console.log(false);
        return false;
    }

}

//9# Are they the same BSTs?
//true
// const Array1 = [3, 5, 4, 6, 1, 0, 2];
// const Array2 =  [3, 1, 5, 2, 4, 6, 0];
//false
const Array3 = [3, 5, 4, 6, 1, 0, 2];
const Array4 =  [5,7, 9, 2, 8, 4, 6, 3];

function areTheSame(array1, array2) {
    if(array1.length !== array2.length) {
        return false;
    }

    let arr1 = array1.sort(function (a, b) {return a-b;});
    let arr2 = array2.sort(function (a, b) {return a-b;});

    for(let i = 0; i<array1.length; i++) {
        if(arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
areTheSame(Array3, Array4);

function main() {
    let numberBST = new BinarySearchTree();
    numberBST.insert(3,3);
    numberBST.insert(1,1);
    numberBST.insert(4,4);
    numberBST.insert(6,6);
    numberBST.insert(9,9);
    numberBST.insert(2,2);
    numberBST.insert(5,5);
    numberBST.insert(7,7);
    // console.log(numberBST);
    // console.log(tree(numberBST)); //result will be 37
    // numberBST.remove(3,3);
    // console.log(numberBST);
    // console.log(treeHeight(numberBST)); //height will be 2
    // console.log(isItBST(numberBST));
    // console.log(thirdLargest(numberBST)); //6
    // console.log(isBalanced(numberBST));

    let stringBST = new BinarySearchTree();
    stringBST.insert('E','E');
    stringBST.insert('A','A');
    stringBST.insert('S','S');
    stringBST.insert('Y','Y');
    stringBST.insert('Q','Q');
    stringBST.insert('U','U');
    stringBST.insert('E','E');
    stringBST.insert('S','S');
    stringBST.insert('T','T');
    stringBST.insert('I','I');
    stringBST.insert('O','O');
    stringBST.insert('N','N');
    // console.log(stringBST);
    // console.log(isItBST(stringBST));
}
// main();


//use to check for n0.8 [3, 5, 4, 6, 1, 0, 2
function main2() {
    let numberBST = new BinarySearchTree();
    numberBST.insert(3,3);
    numberBST.insert(5,5);
    numberBST.insert(4,4);
    numberBST.insert(6,6);
    numberBST.insert(1,1);
    // numberBST.insert(8,8);
    numberBST.insert(0,0);
    numberBST.insert(2,2);
    console.log(isBalanced(numberBST));
}
main2();