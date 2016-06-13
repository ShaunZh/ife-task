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

//检测日期是否有效
function check(date){
    return (new Date(date).getDate()==date.substring(date.length-2));
}

function displayTime(startTime, stopTime, time) {
    var dispEle = document.getElementById("displayTime");
    var day , hour, minute, second;

    day = parseInt((stopTime - startTime) / 1000 / 60 / 60 / 24);

    hour = parseInt((stopTime - startTime - (day * 24 * 1000 * 60 * 60)) / 1000 / 60 / 60);
    minute = parseInt((stopTime - startTime - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60)) / 1000 / 60);
    second = parseInt((stopTime - startTime - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60) - (minute * 1000 * 60)) / 1000);
    return ("距离"+time.substring(0, 4)+"年"+time.substring(5, 7)+"月"+time.substring(8, 10)+"日"+"还有"+day+"天"+hour+"小时"+minute+"分"+second+"秒");
}
function getTime(){
    var secondStart = Date.now(), secondStop;
    var inputTime = document.getElementById("time").value;
    var newSecond ;

    if (check(inputTime)) {

        secondStop = Date.UTC(parseInt(inputTime.substring(0, 4)), parseInt(inputTime.substring(5, 7)) - 1, parseInt(inputTime.substring(8, 10)));
        // 提示：请输入一个将来的时间
        if (secondStop < secondStart) {
            if (document.getElementsByClassName("error")[0].childNodes.length) {
                document.getElementsByClassName("error")[0].firstChild.nodeValue = "请输入一个将来的时间";
            }
            else {
                var errorText = document.createTextNode("请输入一个将来的时间");
            }   document.getElementsByClassName("error")[0].appendChild(errorText);
        }
                else {
            // 显示距离结束还有多长时间
            var refreshTimeEle = document.createTextNode("");
            document.getElementsByClassName("distance")[0].appendChild(refreshTimeEle);
            newSecond = secondStop;
            refreshHandle = setInterval(function(){
                document.getElementsByClassName("distance")[0].firstChild.nodeValue = displayTime(secondStart, newSecond, inputTime);
                newSecond -= 1000;
                } ,1000);
        }
    } else {
        // 提示： 请输入一个有效的时间
        if (document.getElementsByClassName("error")[0].childNodes.length) {
                document.getElementsByClassName("error")[0].firstChild.nodeValue = "请按照格式:YYYY-MM-DD输入日期";
            }
            else {
                var errorText = document.createTextNode("请按照格式:YYYY-MM-DD输入日期");
                document.getElementsByClassName("error")[0].appendChild(errorText);
            }
    }
}
function resetFunc() {
    if (refreshHandle) {
         clearInterval(refreshHandle);
    }
    if (document.getElementsByClassName("distance")[0].childNodes.length) {
        document.getElementsByClassName("distance")[0].firstChild.nodeValue  = "";
    }
     document.getElementById("time").value = "";
     if (document.getElementsByClassName("error")[0].childNodes.length) {
         document.getElementsByClassName("error")[0].firstChild.nodeValue  = "";
     }

}
var refresh, refreshHandle;
var submit = document.getElementById("submit");
EventUtil.addHandler(submit, "click", getTime);

var reset = document.getElementById("reset");
EventUtil.addHandler(reset, "click", resetFunc);
