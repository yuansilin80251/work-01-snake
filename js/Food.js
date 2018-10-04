//匿名函数，用来写food模块
(function () {
    var elements = [];      //用来保存所有的食物
    //定义关于食物的构造函数：包含宽度、高度、x坐标值、y坐标值、颜色等参数
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }
    //为原型添加初始化的方法
    Food.prototype.init = function (map) {
        //先删除食物
        remove();
        //在map中创建并添加div元素
        var div = document.createElement("div");
        map.appendChild(div);
        //为div设置样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth/this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight/this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div加入到elements数组中，即所有的食物中
        elements.push(div);
    };

        //删除食物函数
        function remove() {
            for(var i = 0;i < elements.length;i++){
                var ele = elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i,1);
            }
        }
        window.Food = Food;
}());