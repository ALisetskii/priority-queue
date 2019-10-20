const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}

	}


	detachRoot() {
		if (!this.isEmpty()) {
			if (this.parentNodes.includes(this.root)) {
				this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
			}
			let detachedRoot = this.root;
			this.root = null;
			return detachedRoot;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.isEmpty()) {
			let LastInsertedNode = this.parentNodes.pop();
			if (!LastInsertedNode) {
				LastInsertedNode = detached;
			}

			this.root = LastInsertedNode;

			if (LastInsertedNode.parent == detached) {
				this.parentNodes.unshift(LastInsertedNode);
			} else if (LastInsertedNode.parent && LastInsertedNode.parent.right == LastInsertedNode) {
				this.parentNodes.unshift(LastInsertedNode.parent);
			}

			LastInsertedNode.remove();

			if (detached.left) LastInsertedNode.appendChild(detached.left);

			if (detached.right) LastInsertedNode.appendChild(detached.right);
		}
	}

	size() {
		function countNodes(node) {
			if (node == null) return 0;
			return countNodes(node.left) + countNodes(node.right) + 1;
		}
		return countNodes(this.root);
	}



	isEmpty() {
		return this.root == null && this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.parentNodes.push(node);
		if (!this.root) {
			this.root = node;
			return;
		} else if (!this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node);
		} else if (!this.parentNodes[0].right) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.shift();
		}


	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}
		if (node.priority > node.parent.priority) {
			let nodeIndex = this.parentNodes.indexOf(node);
			let nodeParentIndex = this.parentNodes.indexOf(node.parent);

			if (nodeParentIndex !== -1) this.parentNodes[nodeParentIndex] = node;
			if (nodeIndex !== -1) this.parentNodes[nodeIndex] = node.parent;

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		let child;
		if (node && node.left) {   // выбираем потомка


			if (node.left.priority > node.priority) {
				child = node.left;
			}
			if (node.right && node.right.priority > node.left.priority) {
				child = node.right;
			}
		}
		if (!child) return
		let nodeIndex = this.parentNodes.indexOf(node);
		let childIndex = this.parentNodes.indexOf(child);
		if (node.priority < child.priority) {
			if (this.root === node) this.root = child;
			if (childIndex != -1) {
				if (nodeIndex != -1) {
					this.parentNodes[childIndex] = node;
					this.parentNodes[nodeIndex] = child;
				} else {
					this.parentNodes[childIndex] = node;
				}
			}
			child.swapWithParent();
			this.shiftNodeDown(node);
		}


	}
}

module.exports = MaxHeap;
