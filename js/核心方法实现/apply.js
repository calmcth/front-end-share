// 实现一个apply函数


// apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.  
// Function.apply(obj,args)方法能接收两个参数  
// obj：这个对象将代替Function类里this对象  
// args：这个是数组，它将作为参数传给Function（args-->arguments）  

Function.prototype.myapply = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('not funciton')
    }
    // 兼容传入null的情况
    context = context || window;
    // 将原函数添加到目标对象属性上
    context.fn = this;
     // 实现参数传入，将当前函数中的参数传入目标函数
    let result
    if (arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
      result = context.fn()
    }
    //去除属性
    delete context.fn
    return result
  }