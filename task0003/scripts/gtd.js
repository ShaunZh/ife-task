// 思路： 1. 对于所有的任务，都将其添加一个task的类
window.onload = function() {
    var category,               // 获得分类数量
     allTaskNum;                // 任务数量

    // 获得任务数量
    function getAllTaskNum() {
        var categorys = document.getElementsByClassName('taskWrap');
        var taskNum = 0;
        for (var i = 0; i < categorys.length; i++) {
            taskNum += categorys[i].getElementsByTagName('li').length;
        }
        return taskNum;
    }

    function refreshTaskNum(element) {
        var ele = document.getElementsByClassName('allTaskNum')[0];
        ele.innerHTML = '(' + getAllTaskNum().toString() + ')';
    }
    // 取得总分类的任务数量
    function categoryGetTaskNum(element) {
        var taskNum = element.getElementsByTagName('li').length;
        var numEle = element.getElementsByTagName('h3')[0].getElementsByTagName('span')[0];
        var text = document.createTextNode('(' + taskNum.toString() + ')');
        numEle.appendChild(text);
    }
    // 取得task下子分类的任务数量
    function taskGetTaskNum(element) {
        var taskNum = element.getElementsByTagName('li').length;
        var numEle = element.getElementsByTagName('span')[0];
        var text = document.createTextNode('(' + taskNum.toString() + ')');
        numEle.appendChild(text);
    }

    // 分类列表点击事件
    // function categoryOperate() {
    //     var mainNav = document.getElementById('mainnav');
    //     var dts = mainNav.getElementsByTagName('dt');
    //     for (var i = 0; i < dts.length; i++) {
    //         EventUtil.addHandler(dts[i], 'click', function(e) {
    //             var dls = dts[i].getElementsByTagName('dl');
    //             for (var j = 0; j < dls.length; j++) {
    //                 if (dls[j].style.display === 'none') {
    //                     dls[j].style.display = 'block';
    //                 } else {
    //                     dls[j].style.display = 'none';
    //                 }
    //             }
    //         });
    //     }
    // }
    // 遮蔽罩
    function overLayer(display){
        var e = document.getElementsByClassName('overLayer')[0];
        var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
        var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        e.style.width = _scrollWidth + 'px';
        e.style.height = _scrollHeight + 'px';
        e.style.display = display;
    }
    // 打开添加分类对话框
    function openAddFolderDlg() {
        EventUtil.addHandler(document.getElementsByClassName('addFolder')[0], 'click', function(){
            overLayer('block');
            document.getElementsByClassName('pop')[0].style.display = 'block';
        });
    }
    // 取消添加分类对话框
    function closeAddFolderDlg() {
        var cancelE = document.getElementsByClassName('cancel');
        for (var i = 0; i < cancelE.length; i++) {
            EventUtil.addHandler(cancelE[i], 'click', function(){
                overLayer('none');
                document.getElementsByClassName('pop')[0].style.display = 'none';
            });
        }
    }
    // 按确认键添加分类
    function addFolder(){
        EventUtil.addHandler(document.getElementsByClassName('btn1')[0], 'click', function(e){
            // 获得新分类名称
            var newFolderName = document.getElementsByClassName('newFolder')[0].value;
            // 错误提示元素
            var errorHint = document.getElementsByClassName('errorHint')[0];
            // 输入的分类名称为空
            if (newFolderName.length <= 0) {
                var text = document.createTextNode("新分类名称不能为空");
                errorHint.appendChild(text);
                errorHint.style.display = 'block';
                console.log(text);
            } else {        // 输入的分类名称正确
                // 获得分类列表的父元素
                var categorySelect = document.getElementsByClassName('categorySelect')[0];
                // 获得分类列表的选项
                var options = categorySelect.getElementsByTagName('option');
                var folder = document.getElementsByClassName('itemWrap')[0];
                // 获得分类
                var lis = folder.getElementsByClassName('category');
                // 没有选择分类为：无
                if (categorySelect.value === '0') {
                    //  添加分类
                    categorySelect.innerHTML += "<option value=" + options.length.toString() + "\">"+newFolderName+"</option>"
                    folder.innerHTML += "<li class=\"category\">"
                                                    +         "<h3>"
                                                    +            "<img class=\"ico-folder\" src=\"img\/folder.ico\"\/>"
                                                    +            "<span>"+newFolderName+"<\/span>"
                                                    +           "<i class=\"delete\" >"
                                                    +                    "<img src=\"img\/delete.ico\">"
                                                    +            "<\i>"
                                                    +        "<\/h3>"
                                                    +        "<ul class=\"taskWrap\">"
                                                   +        "<\/ul>"
                                                    +    "<\/li>"
                    console.log(folder);
                    categoryGetTaskNum(lis[lis.length - 1]);
                } else {        // 添加子分类
                var taskWrap =  lis[parseInt(categorySelect.value) - 1].getElementsByClassName('taskWrap')[0];
                    console.log(taskWrap);
                    taskWrap.innerHTML   +=  "<li>"
                                                        +                "<img class=\"ico-file\" src=\"img\/file.ico\" \/>"
                                                        +                "<span>"+newFolderName+"<\/span>"
                                                        +               "<i class=\"delete\" >"
                                                        +                    "<img src=\"img\/delete.ico\">"
                                                        +                "<\/i>"
                                                        +       "<\/li>";

                    taskGetTaskNum(taskWrap.getElementsByTagName('li')[taskWrap.getElementsByTagName('li').length - 1]);
                 }
                overLayer('none');
                document.getElementsByClassName('pop')[0].style.display = 'none';
                refreshTaskNum();
                dispDeleteIco();
                deleteOperate();
            }
        });
    }
    // 当鼠标滑过任务名时，显示删除图案
    function dispDeleteIco() {
        // 为任务添加删除图标
        var e = document.getElementsByClassName("taskWrap");
        for (var i = 0; i < e.length; i++) {
            var lis = e[i].getElementsByTagName('li');
            for (var j = 0; j < lis.length; j++) {
                EventUtil.addHandler(lis[j], 'mouseenter', function(event){
                     if (this.getElementsByClassName('delete').length != 0) {
                         this.getElementsByClassName('delete')[0].style.display = 'block';
                     }

                });
                EventUtil.addHandler(lis[j], 'mouseleave', function(event) {
                    if (this.getElementsByClassName('delete').length != 0) {
                        this.getElementsByClassName('delete')[0].style.display = 'none';
                    }
                });
            }
        }
        // 为分类添加删除图标
        var category = document.getElementsByClassName("category");
        for (var i = 0; i < category.length; i++) {
            var h3 = category[i].getElementsByTagName('h3')[0];
            EventUtil.addHandler(h3, 'mouseenter', function(event) {
                if (this.getElementsByClassName('delete').length != 0) {
                    this.getElementsByClassName('delete')[0].style.display = 'block';
                }
            });
            EventUtil.addHandler(h3, 'mouseleave', function(event) {
                if (this.getElementsByClassName('delete').length != 0) {
                    this.getElementsByClassName('delete')[0].style.display = 'none';
                }
            });

        }
    }
    function deleteOperate(){
        var deletes = document.getElementsByClassName('delete');
        for (var i = 0; i < deletes.length; i++) {
            EventUtil.addHandler(deletes[i], 'click', function(e) {
            var flag = confirm("删除文件后不能恢复，请确认是否删除","");
            if (flag === true) {
                removeElement(this.parentNode);
            }
          });
        }

    }

   // deleteOperate();
    openAddFolderDlg();
    closeAddFolderDlg();
    addFolder();
    refreshTaskNum();

}
