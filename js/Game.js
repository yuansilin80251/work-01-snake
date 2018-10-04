//匿名函数--游戏对象
(function () {
    var that = null;  //为了保存Game的实例对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;    //把当前的this对象（Game）保存到that变量
    }
    Game.prototype.init = function () {
        //初始化游戏
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake.init(this.map,this.food);
        this.bindKey();    //调用按键操作小蛇运动方向的方法
    };
    Game.prototype.runSnake = function (map,food) {
        //添加定时器，小蛇自动移动
        var time = setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX = map.offsetWidth/this.snake.width;//map最大x距离
            var maxY = map.offsetHeight/this.snake.height;//map最大y距离
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //如果小蛇撞墙时
            if(headX < 0 || headX >= maxX){
                clearInterval(time);
                alert("Game Over!");
            }
            if (headY < 0 || headY >= maxY){
                clearInterval(time);
                alert("Game Over!");
            }
        }.bind(that),300);
    };
    //为游戏添加按键操作原型方法
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown",function (e) {
            switch (e.keyCode){
                case 37:this.snake.direction = "left";
                break;
                case 38:this.snake.direction = "top";
                break;
                case 39:this.snake.direction = "right";
                break;
                case 40:this.snake.direction = "left";
                break;
            }
        }.bind(that),false);
    };
    window.Game = Game;
}());