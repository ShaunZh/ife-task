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
function getNext(ele) {
    var next = ele.nextSibling;
    while(next && (next.nodeName === "#text")) {
        next = getNext(next);
    }
    return next;
}

function moveupNext(ele, move) {
    while(ele) {
        ele.style.top = parseInt(ele.style.top) + move + 'px';
        ele = getNext(ele);
    }
}

function dragOver(e) {                                       // 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
    e.preventDefault();
}

function drag() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    var drags = document.getElementsByClassName("drag");
    var dragingEle = {element: 0, parentEle: 0,curPos: 0, startX:0, startY: 0};
    var boxImf = [{},{}];
    var cursorX, cursorY;               //当点击时，获得鼠标的位置
    var dragFlag = false;

function insertElement(element) {
        //对象不在任何一个box内部
        if ((parseInt(dragingEle.element.style.top) >= 0) && (parseInt(dragingEle.element.style.top) <= 400)) {
            var insertBox, insertPos;
            var insertLeftPos, boxDrags;
            if (dragingEle.parentEle.id === "box1") {
                if ((parseInt(dragingEle.element.style.left) > 0) && (parseInt(dragingEle.element.style.left) < 150)) {
                    insertBox = 'box1';
                    insertLeftPos = -1;
                } else if ((parseInt(dragingEle.element.style.left) > 300) && (parseInt(dragingEle.element.style.left) < 600)) {
                    insertBox = 'box2';
                    insertLeftPos = 455;
                }
            } else if (dragingEle.parentEle.id === "box2") {
                if ((parseInt(dragingEle.element.style.left) > 0) && (parseInt(dragingEle.element.style.left) < 150)) {
                    insertBox = 'box2';
                     insertLeftPos = -1;
                } else if ((parseInt(dragingEle.element.style.left) > -450) && (parseInt(dragingEle.element.style.left) < -300)) {
                    insertBox = 'box1';
                    insertLeftPos = -450;
                }
            }
            // 找到了插入的位置
            if ((insertBox !== undefined)) {
                insertPos = Math.ceil(parseInt(element.style.top) / 40);
                if (insertPos >= document.getElementById(insertBox)) {
                    insertPos = document.getElementById(insertBox).getElementsByTagName('li').length;
                }
                // 在此处将元素插入位置
                element.style.left = insertLeftPos+ 'px';
                element.style.top = insertPos  * 40 + 'px';
                console.log(element.style.left);
                console.log(element.style.top);
                boxDrags = document.getElementById(insertBox).getElementsByTagName("li");
                moveupNext(getNext(boxDrags[insertPos - 1]), 40);
            } else {        //没有找到插入的位置，将元素放入原位置

                var myDrag = dragingEle.parentEle.getElementsByClassName("drag")[Math.ceil(dragingEle.curPos)];
                console.log(myDrag);
                console.log(dragingEle.curPos);
                moveupNext(myDrag, 40);


                 var block = document.getElementsByClassName('dragging')[0];  // 将被拖拽滑块加到新容器
                block.style.left = parseInt(dragingEle.startX) + 'px';;
                block.style.top = parseInt(dragingEle.startY) + 'px';
                block.className = 'drag';
                dragingEle.parentEle.insertBefore(block, myDrag);
                console.log(dragingEle.parentEle);
                // element.style.left = parseInt(dragingEle.startX) + 'px';
                // element.style.top = parseInt(dragingEle.startY) + 'px';
            }
        }
    }
    function stopDrag(e) {
        if (dragFlag === true) {
            var event = EventUtil.getEvent(e);
            var element = dragingEle.element;
            dragFlag = false;
            insertElement(element);
         //   dragingEle.element.className = "drag";
        }
    }
function dragging(e) {
        var event = EventUtil.getEvent(e);
        var x = event.clientX;
        var y = event.clientY;
        if (dragFlag === true) {

            var element = dragingEle.element;

            element.style.left = dragingEle.startX + (x - cursorX) + 'px';
            element.style.top  = dragingEle.startY + (y - cursorY) + 'px';
            if (dragingEle.element.className !== "dragging") {
                dragingEle.element.className = "dragging";
                moveupNext(dragingEle.element, -40);
            }
            event.preventDefault();
        }
    }
function startDrag(e) {
        var event = EventUtil.getEvent(e);
        var dragingEleLeftPos = event.target.offsetLeft;                //获得点击块相对于父包裹块的位置
        var dragingEleTopPos  = event.target.offsetTop;

        console.log("x偏移 = " + parseInt(event.target.style.left));
        console.log("y偏移 = " + dragingEleTopPos);

        dragingEle.element = event.target;                                              // 取得移动的对象
        dragingEle.parentEle = event.target.parentNode;                         // 取得点击块的父元素
        dragingEle.curPos = (Math.ceil(dragingEleTopPos) + 1) / 40;     // 取得点击块在父包裹块中的位置
        dragingEle.startX = dragingEleLeftPos;
        dragingEle.startY = dragingEleTopPos;

        cursorX = event.clientX;                                // 鼠标位置
        cursorY = event.clientY;
        //moveupNext(getNext(this), -40);                           // 将下一个元素上移
        dragFlag = true;
        console.log(cursorX);
        console.log(cursorY);
    }
    console.log(drags.length);
    for (var i = 0; i < drags.length; i++) {
        drags[i].style.top = (i % 5) * 40 + 'px';
        drags[i].style.left = -1 + 'px';
        EventUtil.addHandler(drags[i], "mousedown", startDrag);
    }
    EventUtil.addHandler(document, "mousemove", dragging);
    EventUtil.addHandler(document, "mouseup" , stopDrag);
 }

window.onload = drag();
