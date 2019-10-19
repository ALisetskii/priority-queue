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
		
		if (this.parentNodes.includes(this.root)){
			this.parentNodes.shift();
		}
		let temproot=this.root;
		this.root = null;
		return temproot;
	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {

	}

	isEmpty() {
		return (!this.root && !this.parentNodes.length)
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
		} else {
			this.parentNodes[0].appendChild(node);
		}
		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}


	}

	shiftNodeUp(node) {
		if (node.parent) {
			let nodeIndex = this.parentNodes.indexOf(node);
			let nodeParentIndex = this.parentNodes.indexOf(node.parent);
			if (node.priority > node.parent.priority) {

				this.parentNodes[nodeIndex] = node.parent;
				this.parentNodes[nodeParentIndex] = node;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (!(node) || !(node.left)) {
			let Child=null;

		if (node.left && node.left.priority > node.priority) {
			Child = node.left
			}

		if ((node.right) && (!Child && node.right.priority > node.priority)) {
				Child = node.right
				}
				

	}
}

module.exports = MaxHeap;
