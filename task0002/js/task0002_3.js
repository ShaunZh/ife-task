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


// 顺序，循环与否，时间
var order = 0, circle = 0, time = 0, curPos = 0;


function startMove(elem, li, stopPos) {
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var startPos = xpos / 600;
    // dire表示方向，0：向后移动，1：向前移动
    var dire = (startPos < stopPos)?0:1;
    var dist = Math.abs(stopPos - startPos);                   //距离
    var moveDist ;

    if (!elem.style.left) {
              elem.style.left = "0px";
    }
    if (!elem.style.top) {
              elem.style.top = "0px";
    }
    if (dist) {
            //clearInterval(timeHandle);
            moveDist = dist * 600;                                //需要移动的距离
            timeHandle = setInterval(function() {
                if (moveDist > 0) {
                    if (dire == 0) {
                       xpos= xpos - 100;
                    }else {
                        xpos= xpos +100;
                    }
                }
                else {
                    elem.style.left = xpos + "px";
                    clearInterval(timeHandle);
                }
                moveDist -= 100;
                elem.style.left = xpos + "px";
                console.log(elem.style.left);

            }, 100)
    }
}
function preparePage() {
    var contains = document.getElementsByClassName("contains")[0];
    var links = document.getElementsByTagName("li");
    var dispPos = document.getElementById("img-wrap");
    //dispPos.style.left = 0 + 'px';
    console.log(dispPos.style.left);
    for(var i = 0; i < links.length; i++) {
                  links[i].onclick = function() {
                    startMove(dispPos, links[i], this.dataset.index);
              }
    }

 }
function startPlay() {
    if(!document.getElementById){
              return false;
    }
    var dispPos = document.getElementById("img-wrap");


}


 window.onload = preparePage();
