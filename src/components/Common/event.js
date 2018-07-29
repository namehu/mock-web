/* eslint-disable  no-param-reassign */
/* eslint-disable  no-lonely-if */
/* eslint-disable  no-plusplus */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  func-names */
/* eslint-disable  guard-for-in */
// 跨浏览器事件绑定
function addEvent(obj, type, fn) {
  if (typeof obj.addEventListener !== 'undefined') {
    obj.addEventListener(type, fn, false);
  } else {
    // 创建一个可以保存事件的哈希表
    if (!obj.events) {
      obj.events = {};
    }
    // 第一次执行
    if (!obj.events[type]) {
      // 创建一个可以保存事件处理函数的数组
      obj.events[type] = [];
      // 存蓄第一个事件处理函数
      // 如果绑定的事件以及存在，我们就把事件处理函数放入数组中
      if (!obj.events[`on${type}`]) {
        obj.events[type].push(fn);
      }
    } else {
      // 从第二个事件处理函数开始存储
      // 同一函数进行屏蔽，如果没有同一元素的同一事件的同一个事件处理程序注册，那么就添加进来
      if (!addEvent.equal(obj.events[type], fn)) {
        obj.events[type][addEvent.ID++] = fn;
      }
    }
    // 执行所有的事件处理函数
    obj[`on${type}`] = addEvent.exec;
  }
}
// 将IE 的event对象配对
addEvent.fixEvent = function (event) {
  addEvent.fixEvent.preventDefault = addEvent.fixEvent.preventDefault;
  addEvent.fixEvent.stopPropagation = addEvent.fixEvent.stopPropagation;
  return event;
};
// IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
  this.returnValue = false;
};
// IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
  this.cancelBubble = true;
};

// 同一注册函数进行屏蔽
addEvent.equal = function (es, fn) {
  for (const i in es) {
    if (es[i] === fn) {
      return true;
    }
  }
  return false;
};
// 执行事件处理函数
addEvent.exec = function () {
  const e = addEvent.fixEvent(window.event);
  const es = this.events[e.type];
  for (const i in es) {
    es[i].call(this, e);
  }
};

// 为每个事件添加一个计数器
addEvent.ID = 1;
// 跨浏览器事件解除
function removeEvent(obj, type, fn) {
  if (typeof obj.removeEventListener !== 'undefined') {
    obj.removeEventListener(type, fn, false);
  } else {
    for (const i in obj.events[type]) {
      if (obj.events[type][i] === fn) {
        delete obj.events[type][i];
      }
    }
  }
}

export default {
  removeEvent,
  addEvent,
};
