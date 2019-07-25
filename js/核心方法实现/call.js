// 实现一个call函数 context 为目标函数

// call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
// 实现步骤
// 1.改变this指向
// 2.给定参数执行函数。
// 3.this 参数可以传 null，当为 null 的时候，视为指向 window
// 4.函数是可以有返回值的！

Function.prototype.myCall = function(context){
    // 判断当前是否为函数
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }
    //兼容传入null的情况
    context = context || window
    //将原函数添加到目标对象属性上
    context.fn = this
    // 实现参数传入，将当前函数中的参数除去第一个将剩余的传入目标函数
    let arg = [...arguments].splice(1)
    //执行属性方法
    let result = context.fn(...arg)
    //去除属性
    delete context.fn
    return result
}