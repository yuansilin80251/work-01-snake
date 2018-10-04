//匿名函数--蛇身
(function () {
    var elements = [];
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || "right";
        this.body = [
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"}
        ];
    }
    //为原型添加方法--初始化
    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = obj.color;
            div.style.left = this.width*obj.x + "px";
            div.style.top = this.height*obj.y + "px";
            elements.push(div);
        }
    };
    //为原型添加方法--小蛇运动
    Snake.prototype.move = function (food, map) {
        //改变小蛇身体的坐标位置
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //判断有没有吃到食物
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        if(headX == food.x && headY == food.y){
            var last = this.body[this.body.length - 1];
            //假设吃到食物，即if条件成立了
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            food.init(map);
        }
    };
    //删除小蛇-函数
    function remove() {
        //需要删除三个地方：.map中的每个小蛇div元素；elements数组中的每个元素；从蛇尾向蛇头方向删除div
        var i = elements.length - 1;
        for (;i>=0;i--){
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Snake = Snake;
}());