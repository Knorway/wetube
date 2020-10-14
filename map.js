// ###################################################################### map 1

const array = {
	value: [1, 2, 3, 4, 5],
	map(callback) {
		let newList = [];
		for (let i = 0; i < this.value.length; i++) {
			const result = callback(this.value[i], i);
			newList.push(result);
		}
		return newList;
	},
};

const test = array.map((e) => {
	return e * e;
});

console.log(test);
console.log(array.value);

// ###################################################################### map 2

function NewArray(list) {
	this.value = list;
}

NewArray.create = function (list) {
	return new NewArray(list);
};

NewArray.prototype.map = function (callback) {
	let newList = [];
	for (let i = 0; i < this.value.length; i++) {
		const result = callback(this.value[i], i);
		newList.push(result);
	}
	return newList;
};

const array2 = new NewArray([1, 2, 3, 4, 5]);
const a = array2.map((e) => e * e);

console.log(a);
console.log(array2.value);

const go = NewArray.create([5, 6, 7, 8, 9]);
console.log(go.map((e) => e * e));

// ###################################################################### map 3

const abcd = (function () {
	function NewArray() {}

	NewArray.prototype.map = function (callback) {
		let newList = [];
		for (let i = 0; i < this.value.length; i++) {
			const result = callback(this.value[i], i);
			newList.push(result);
		}
		return newList;
	};
	NewArray.create = function (list) {
		this.value = list;
		return new NewArray();
	};
	return new NewArray();
})();

abcd.value = [1, 2, 3, 4, 5];
console.log(abcd.map((e) => e * e * e));

const abcc = NewArray.create([5, 5, 5, 5, 6]);
console.log(abcc.map((e) => e * 2));
