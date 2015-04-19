"use strict";

// because wtf
module.exports = {
    isObject : function isObject(quest) {
        return Object.prototype.toString.call(quest) === "[object Object]";
    },
    isArray : function isArray(quest) {
        return Object.prototype.toString.call(quest) === "[object Array]";
    }
};
