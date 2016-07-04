// 思路： 1. 对于所有的任务，都将其添加一个task的类

window.onload = function() {
    var category,               // 获得分类数量
     allTaskNum;             // 任务数量
    // 获得任务数量
    function getTaskNum() {
        return document.getElementsByClassName('task').length;
    }

    function refreshTaskNum() {
        var ele = document.getElementsByClassName('allTaskNum')[0];
        var text = document.createTextNode('(' + getTaskNum().toString() + ')');
        ele.appendChild(text);
    }
    function categoryGetTaskNum(element) {
        var taskNum = element.getElementsByTagName('dl').length;
        var numEle = element.getElementsByClassName('num')[0];
        var text = document.createTextNode('(' + taskNum.toString() + ')');
        numEle.appendChild(text);
    }
    // 分类列表点击事件
    function categoryOperate() {
        var mainNav = document.getElementById('mainnav');
        var dts = mainNav.getElementsByTagName('dt');
        for (var i = 0; i < dts.length; i++) {
            EventUtil.addHandler(dts[i], 'click', function(e) {
                var dls = dts[i].getElementsByTagName('dl');
                for (var j = 0; j < dls.length; j++) {
                    if (dls[j].style.display === 'none') {
                        dls[j].style.display = 'block';
                    } else {
                        dls[j].style.display = 'none';
                    }
                }
            });
        }
    }
    // 遮蔽罩
    function overLayer(display){
        var e = document.getElementsByClassName('overLayer')[0];
        var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
        var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        e.style.width = _scrollWidth + 'px';
        e.style.height = _scrollHeight + 'px';
        e.style.display = display;
    }
    overLayer('block');
    // refreshTaskNum();
    // categoryGetTaskNum(document.getElementsByClassName('cate_default')[0]);
}

