arr = [12,13,45,12,13,78,45,69,18,45];

// 思想: 双重 for 循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组；因为它的时间复杂度是O(n^2)，如果数组长度很大，效率会很低。
// 第一种   双层for循环去重
function arrayHeavy(arr){
	for (let i = 0,len = arr.length; i < len; i++) {
		for (let j = i+1; j < len; j++) {
			if (arr[i] = arr[j]) {
				arr.splice(j,1);
				// splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
				len--;
				j--;
			}
		}
	}
	return arr;
}


// 思想: 利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
// 第二种    Array.filter() 加 indexOf
function arrayHeavy(a,b){
	let arr = a.concat(b);
	return arr.filter((item,index)=>{
		return arr.indexOf(item) === index;
	})
}


// 思想: 调用了数组的排序方法 sort()，V8引擎 的 sort() 方法在数组长度小于等于10的情况下，会使用插入排序，大于10的情况下会使用快速排序。然后根据排序后的结果进行遍历及相邻元素比对(其实就是一行冒泡排序比较)，如果相等则跳过该元素，直到遍历结束。
// 第三种     Array.sort() 加一行遍历冒泡(相邻元素去重)
function arrayHeavy(arr){
	var res = [];
	var sortedArray = arr.concat().sort();
	var seen;
	for (var i = 0,len = sortedArray.length; i < len; i++) {
		// 如果是第一个元素或者相邻的元素不相同
		if(!i || seen !== sortedArray[i]){
			res.push(sortedArray[i]);
		}
		seen = sortedArray[i];
	}
	return res;
}
// 思想: ES6 提供了新的数据结构 Set，Set 结构的一个特性就是成员值都是唯一的，没有重复的值。(同时请大家注意这个简化过程)
// 第四种     ES6 中的 Set 去重
function arrayHeavy(arr){
	return Array.from(new Set(arr));
};
// 简化为
function arrayHeavy(arr){
	return [...new Set(arr)];
}
// 还可以简化为
let unique = (arr) => [...new Set(arr)]

// 这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的,但是最后请注意这里obj[typeof item + item] = true没有直接使用obj[item],是因为 123 和 '123' 是不同的，直接使用前面的方法会判断为同一个值，因为对象的键值只能是字符串，所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题。
// 第五种 Object键值对
function arrayHeavy(arr){
	var obj ={};
	return arr.filter(function(item,index,arr){
		return obj.hasOwnProperty(typeof item + item) ? false :(obj[typeof item + item] = true)
	})
}


// 类型的相等问题
let str1 = '123';
let str2 = new String('123');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false