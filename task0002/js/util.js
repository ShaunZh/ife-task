// 任务2.1
//判断对象arr是否为一个数组
function isArray(arr)
{
    return arr instanceof Array;
}

//判断对象是否为一个函数
function isFunction(fn) {
    return typeof test == 'function';
}

//使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、object对象。不会包含函数、正则对象等
//需要了解对象的基本概念，其组成部分
//步骤一：判断复制属性的类型
//步骤二：判断属性是否可使用for in递归，如果可以，则可能需要使用递归
function cloneObject(obj, newobj) {
    var newobj = newobj||{};
    for (var i in obj){
        if (typeof obj[i] == "object"){
            newobj[i] = (obj[i] === Array)?[]:{};
            cloneObject(obj[i], newobj[i]);
        }else {
            newobj[i] = obj[i];
        }
    }
    return newobj;
}

var srcObj = {
    a:1,
    b:{
        b1:["hello", "hi"],
        b2:"javascript"
    }
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj, tarObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);
console.log(tarObj.b.b1[0]);
 //////////////////学习数组、字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newarr = [], index = 0, reIndexArr = [], reIndex = 0;

    for (var i = 0; i < arr.length; i++){
        for (var j = i + 1; j < arr.length; j++){
            if (arr[i] === arr[j]){
                reIndexArr[reIndex++] = j;

            }
        }
    }

    for (var i = 0; i < arr.length; i++){
        var isRe = false;
        for (j = 0; j < reIndexArr.length; j++){
            if (i === reIndexArr[j]){
                isRe = true;
                continue;
            }
        }
        if (!isRe){
            newarr[index++] = arr[i];
        }
    }
    return newarr;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3, "a", "ddd", "adfasdf", "a", "adfasdf", 123, 3, 4, 9];
var b = uniqArray(a);
console.log(b);


/////////////////////////// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    return str.trim()
}

var str2 = "    adfadf      adf    "
console.log(simpleTrim(str2));



// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    if (!element.className){
        element.className = newClassName;
    }else {
        element.className += " ";
        element.className += newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (!element.className){
        return false;
    }else{
         var classBt = element.className;
         var arr1 = classBt.split(" ");
         for (i in arr1){
            if (arr1[i] == oldClassName){
                arr1.remove(i);
            }
         }
         element.className = arr1;
    }

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    if (siblingNode.parentNode == element.parentNode){
        return true;
    }else{
        return false;
    }
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var distance = {left:0, top: 0};
    distance.left = element.style.left + "px";
    distance.top = element.style.top + "px";
    return distance;
}
// your implement


// task 3.2
// 实现一个简单的Query
function $(selector) {
    var ele = document;
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                ele = ele.getElementById(sele[i].substring(1));
                break;
            case '.':
                ele = ele.getElementsByClassName(sele[i].substring(1))[0];
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                var temp = ele.getElementsByTagName('*');
                var tLen = temp.length;
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key] === value) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key]) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                break;
            default :
                ele = ele.getElementsByTagName(sele[i])[0];
                break;
        }
    }

    if (!ele) {
        ele = null;
    }

    return ele;
}
