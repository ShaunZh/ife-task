var EventUtil = {
    addHandler:function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler:function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.deattachEvent) {
            element.deattachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
        getEvent: function(event) {
        return event ? event : window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};


function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.lastChild.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//////////////第一阶段football,basketball,run,swim
//在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，
//允许用户用半角逗号来作为不同爱好的分隔。当点击按钮时，把用户输入的兴趣
//爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，
//在按钮下方创建一个段落显示处理后的爱好。
function getHobby() {

    var hobbyStr = document.getElementById("hobby").value;
    var arr = [], hobbyArr = [];
    var temp ;
    arr = hobbyStr.split(',');

    //去除重复的字符串
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].trim();       //去除空格
        arr[i] = temp;
        for (var j = i + 1; j < arr.length; j++){
            if (temp.localeCompare(hobbyArr[j]) === 0) {
                arr[j] = "";            //去除相同的字符
            }
        }
    }

    //获得处理后的字符
    for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i].length > 0) {
            hobbyArr.push(arr[i])
        }
    }
        console.log(hobbyArr.length);
    if (hobbyArr.length > 0) {
        var ele = document.createElement("textarea");
        var text = hobbyArr.join(' ');
        var textNode = document.createTextNode(text);
        var nullDiv = document.createElement("div");    //添加一个空div用于换行
        ele.appendChild(textNode);
        nullDiv.appendChild(ele);
        insertAfter(nullDiv,document.getElementById("get"));
    }
}


function getHobby2() {
    var hobbyStr = document.getElementById("hobby2").value;
    var arr = [], hobbyArr = [];
    var temp ;
    // 换行，回车，顿号，分号，半角空格，全角空格,中文逗号，英文逗号
    arr = hobbyStr.split(/\n|\r|\u3001|\uFF1B|\u0020|\u3000|\uFF0C|\u002C/gim);

    //去除重复的字符串
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].trim();       //去除空格
        arr[i] = temp;
        for (var j = i + 1; j < arr.length; j++){
            if (temp.localeCompare(hobbyArr[j]) === 0) {
                arr[j] = "";            //去除相同的字符
            }
        }
    }

    //获得处理后的字符
    for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i].length > 0) {
            hobbyArr.push(arr[i])
        }
    }
        console.log("第二个按钮");
    if (hobbyArr.length > 0) {
        var ele = document.createElement("textarea");
        var text = hobbyArr.join(' ');
        var textNode = document.createTextNode(text);
        var nullDiv = document.createElement("div");    //添加一个空div用于换行
        ele.appendChild(textNode);
        nullDiv.appendChild(ele);
        insertAfter(nullDiv,document.getElementById("get2"));
    }
}

function getHobby2() {
    var hobbyStr = document.getElementById("hobby2").value;
    var arr = [], hobbyArr = [];
    var temp ;
    // 换行，回车，顿号，分号，半角空格，全角空格,中文逗号，英文逗号
    arr = hobbyStr.split(/\n|\r|\u3001|\uFF1B|\u0020|\u3000|\uFF0C|\u002C/gim);
        //去除重复的字符串
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].trim();       //去除空格
        arr[i] = temp;
        for (var j = i + 1; j < arr.length; j++){
            if (temp.localeCompare(hobbyArr[j]) === 0) {
                arr[j] = "";            //去除相同的字符
            }
        }
    }

    //获得处理后的字符
    for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i].length > 0) {
            hobbyArr.push(arr[i])
        }
    }

    console.log("第二个按钮");
    if (hobbyArr.length > 0) {
        var ele = document.createElement("textarea");
        var text = hobbyArr.join(' ');
        var textNode = document.createTextNode(text);
        var nullDiv = document.createElement("div");    //添加一个空div用于换行
        ele.appendChild(textNode);
        nullDiv.appendChild(ele);
        insertAfter(nullDiv,document.getElementById("get2"));
    }
}

var button = document.getElementById("get");
EventUtil.addHandler(button, "click", getHobby);

var button2 = document.getElementById("get2");
EventUtil.addHandler(button2, "click", getHobby2);




