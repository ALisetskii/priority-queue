class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
		} else if (!this.right) {
			this.right = node;
		}
		if (node) node.parent = this;
	}

	removeChild(node) {
		if (node == this.left) {
			this.left = null;
			node.parent = null;
		} else if (node == this.right) {
			this.right = null;
			node.parent = null;
		} else if (node.parent != this) {
			throw ("node.removeChild");
		}
	}

	remove() {
		if (!this.parent) {
			return;
		} else {
			this.parent.removeChild(this)
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		// связь его c его детьми
		if (this.right) {
			this.right.parent = this.parent;
		}
		if (this.left) {
			this.left.parent = this.parent;
		}                        //+
		// связь его родителя с другим ребенком
		if (this == this.parent.right) {   // если он правый
			if (this.parent.left) {        //   и у родителя есть левый
				this.parent.left.parent = this;  // то родитель левого он
			}
			[this.parent.left, this.left] = [this.left, this.parent.left]; //  меняем местами левый родителя и его левый
			this.parent.right = this.right;  // правый родителя - его правый
			this.right = this.parent;   //  его правый - его родитель
		}
		if (this == this.parent.left) {    // если он левый
			if (this.parent.right) {
				this.parent.right.parent = this;
			}
			[this.parent.right, this.right] = [this.right, this.parent.right];
			this.parent.left = this.left;
			this.left = this.parent;
		}                       //+
		// связь  его с бывшим дедом
		if (this.parent.parent) {	// если у его родителя есть родитель

			if (this.parent == this.parent.parent.left) {  //  если его родитель левый то левый его родителя теперь он
				this.parent.parent.left = this;
			}
			if (this.parent == this.parent.parent.right) { //правый
				this.parent.parent.right = this;
			}
		}
		//+
		// связь его с бывшим родителем

		//this.parent.parent = this; // родитель его бывшего родителя - он
		//this.parent = this.parent.parent;//  его родитель - родитель его бывшего родител

		[this.parent.parent, this.parent] = [this, this.parent.parent];
	}					//+

}

module.exports = Node;
