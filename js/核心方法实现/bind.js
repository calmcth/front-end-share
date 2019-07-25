// 实现一个bind函数

// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
// 之后的一序列参数将会在传递的实参前传入作为它的参数。
let window = global

Function.prototype.mybind = function (context) {
    if(typeof this !== 'function'){
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
    }
    context = context || window;
    
    let _this = this;
    let arg = [...arguments].splice(1)
    // 构造函数
    let fNOP= function(){};

    let fbound = function () {
        if(this instanceof fNOP){
             // 当作为构造函数时，this 指向绑定的函数
            return new _this(...arg, ...arguments);
        }else{
            // 当作为普通函数时，this 指向 window
            return _this.apply(context, arg.concat(...arguments))
        }
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fNOP.prototype= this.prototype;

    fbound.prototype= new fNOP();

    return fbound;

}

 // 测试代码

var value = 0;
var obj = {
   value : 1,
}
function show(name,age){
    console.log(this.value);
    console.log(name + " " + age);
}
var newShow = show.mybind(obj,'abc',18);
newShow();  //返回 1  abc 18
var newShow = show.mybind(null,'abc',18);
newShow();   //返回 0 abc 18 在node底下执行因为没有window所以会返回  undefined abc 18

new newShow();  // 返回 undefined abc 18