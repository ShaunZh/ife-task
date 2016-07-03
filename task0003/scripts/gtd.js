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
    fucntion addCategory() {

    }
    refreshTaskNum();
    categoryGetTaskNum(document.getElementsByClassName('cate_default')[0]);
}

