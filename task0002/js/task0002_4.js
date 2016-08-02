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

//去除重复的字符串
function unique(arr) {
    var hobbyArr = [];

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

    return hobbyArr;
}



function search() {
    var suggestData = ['Simon', 'Erik', 'Kener', "Shaun", "Shalok", "Kobi"];
    var inputText = document.getElementById("inputText");   // 输入文本的input元素对象
    var textStr;                // 保存文本字符串
    var matchListUl, matchList, matchListWrap;
    var curSelList = -1, lastSelList;               // 当前选中的列表
    var maxList = 0;                        // 最大列表项
    var inputTextBackup, isUpdateList = false;
    matchListWrap = document.createElement("div");
    matchListWrap.setAttribute("id", "matchListWrap");
    matchListUl = document.createElement("ul");
    matchListWrap.appendChild(matchListUl);
    insertAfter(matchListWrap, inputText);
// 字符串筛选，将str1与baseStr中的字符串比较，返回匹配的字符串数组
    function strFilter(str1, baseStr) {
        var matchArr = [];
        var len = str1.length;
        if (len > 0) {
            for (var i = 0; i < baseStr.length; i++) {
                var getStr = baseStr[i].slice(0, len);
                if (str1.localeCompare(getStr) === 0) {
                    matchArr.push(baseStr[i]);
                }
            }
        }

        return matchArr;
    }
function deleteNode(element) {
        // 如果ul的子节点大于0，说明之前已经有匹配的列表项，先将其删除，然后再重新添加
        if (element.childNodes.length > 0) {
            // 移除matchListUl下的所有子节点
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }
    // 根据str数组，显示列表项
    function dispMatchList(str) {
        deleteNode(matchListUl);
        if (str.length > 0) {
            var i = 0;
            while (i < str.length) {
                var li = document.createElement("li");
                var liText = document.createTextNode(str[i]);
                li.setAttribute("data-index", i);
                li.appendChild(liText);
                matchListUl.appendChild(li);
                i++;
            }
            maxList = i;
        }
    }
function dispSelList(curList) {
        if (isUpdateList === true) {
            isUpdateList = false;
            for (var i = 0; i < matchListUl.childNodes.length; i++) {
                if (matchListUl.childNodes[i].getAttribute("class") === "select") {
                    matchListUl.childNodes[i].removeAttribute("class");
                }
            }
            if (curList >= 0) {
                console.log("显示");
                matchListUl.childNodes[curList].setAttribute("class", "select");
            }


        }
    }
function keyInput() {
        EventUtil.addHandler(inputText, "keyup", function(event) {
            event = EventUtil.getEvent(event);
            // 当按了 字母键和小键盘上的数字键，则将其判断为正确的字符输入
            if (((event.keyCode >= 65) && (event.keyCode <= 90)) ||
                ((event.keyCode >= 48) && (event.keyCode <= 57)) ||
                ((event.keyCode >= 96) && (event.keyCode <= 111)) ||
                (event.keyCode == 8)) {
                console.log("筛选");
                inputTextBackup = inputText.value;
                // 对输入的字符进行筛选
                var matchStr = strFilter(inputText.value, suggestData);
                // 显示匹配的字符串
                dispMatchList(matchStr);
                // 鼠标操作
                mouseOperate();
} else if (event.keyCode === 13) {              // 回车键
                // 将选中的字符串显示到文本框
                if (curSelList >= 0) {
                    inputText.value = matchListUl.childNodes[curSelList].textContent;
                    matchListWrap.style.display = "none";
                }
            } else if ((event.keyCode === 38) || (event.keyCode === 40)) {
                if (event.keyCode === 38) { // 上箭头
                    if (curSelList <= -1) {
                        curSelList = maxList;
                    }
                    curSelList--;

                } else {                    // 下箭头
                    curSelList++;
                    if (curSelList >= maxList) {
                        curSelList = -1;
                    }
}
                isUpdateList = true;
                if (curSelList >= 0) {
                    inputText.value = matchListUl.childNodes[curSelList].textContent;
                } else {
                    inputText.value = inputTextBackup;
                }
                // 刷新列表
                dispSelList(curSelList);
            }

        });

    }
// 鼠标操作
    function mouseOperate() {
        for (var i = 0 ; i < matchListUl.childNodes.length; i++) {
            // 鼠标移入事件
            EventUtil.addHandler(matchListUl.childNodes[i], "mouseover", function(event) {
                curSelList = this.getAttribute("data-index");
                isUpdateList = true;
                console.log("移入");
                // 刷新列表
                dispSelList(curSelList);
            });
            // 鼠标移开事件
            EventUtil.addHandler(matchListUl.childNodes[i], "mouseout", function(event) {
                this.removeAttribute("class");
            });
            // 鼠标点击事件
            EventUtil.addHandler(matchListUl.childNodes[i], "click", function(event) {
                console.log(this);
                inputText.value = this.textContent;
                matchListWrap.style.display = "none";
            });
        }
    EventUtil.addHandler(inputText, "click", function(event) {
            matchListWrap.style.display = "";
            console.log("显示");
        });
        EventUtil.addHandler(document, "click", function(event){
            if ((EventUtil.getTarget(event).id != "matchListWrap") && (EventUtil.getTarget(event).id != "inputText")) {
                console.log(EventUtil.getTarget(event).id);
                matchListWrap.style.display = "none";
                console.log("隐藏");
            }
        });

    }
    keyInput();

}


window.onload = search();
