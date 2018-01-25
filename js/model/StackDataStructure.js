function StackDataStructure(array, maxsize) {
	this.stackControl = array;
	this.MAX_SIZE = maxsize ;
}

StackDataStructure.prototype.isEmpty = function() {
	return this.stackControl.length === 0;
}

StackDataStructure.prototype.canPush = function () {
	return this.stackControl.length < this.MAX_SIZE;
}

StackDataStructure.prototype.push = function (element) {
	if (!this.canPush()) {
		throw new CustomError("Stack Overflow");
	}
	this.stackControl.push(element);
	return this.stackControl;
}

StackDataStructure.prototype.pop = function () {
	if (this.isEmpty()) {
		throw new CustomError("Stack Underflow");
	}
	return this.stackControl.pop();
}

