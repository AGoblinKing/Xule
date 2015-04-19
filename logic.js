var THREE = require("three"),
    u = require("./util"),
    defs = {
        vector : {"x":0, "y":0, "z":0 },
        quaternion : {"qx":0, qw:0, qy:0, qz:0 },
        euler : {rx:0, ry:0, rz:0 }
    },
    keys = {};

function ensure(props, obj) {
    obj = obj || {};
    return Object.keys(props).reduce(function(obj, key) {
        obj[key] = obj[key] !== undefined ? obj[key] : props[key];
        return obj;
    }, obj);
}

function flap(type, fn, target, apply) {
    return Object.keys(type).reduce(function(target, key) {
        target[key] = fn(target[key], apply[key]);
        return target;
    }, target);
}

function add(v1, v2) {
    return v1 + v2;
}

function keyDown(e) {
    keys[e.keyCode] = true;
    keys[String.fromCharCode(e.keyCode)] = true;
}

function keyUp(e) {
    keys[e.keyCode] = false;
    keys[String.fromCharCode(e.keyCode)] = false;
}

module.exports = {
    ensure : ensure,
    add : add,
    defs : defs,
    flap : flap,
    fn : function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return fn.apply(null, args);
    },
    doKey : function(obj, fn) {
        Object.keys(obj).forEach(function(key) {
            keys[key] && fn(key);
        });
    },
    key : function(key) {
        return keys[key];
    },
    pos : ensure.bind(null, defs.vector),
    quaternion : ensure.bind(null, defs.quaternion),
    euler : ensure.bind(null, defs.euler),
    axisX : ensure(defs.vector, { x : 1 }),
    axisY : ensure(defs.vector, { y : 1 }),
    axisZ : ensure(defs.vector, { z : 1 }),
    copy : function(props, source, target) {
        props = isArray(props) ? props : [ props ];
        props.forEach(function(prop) {
            Object.keys(prop).forEach(function(key) {
                source[key] = target[key];
            });
        });
        return source;
    },
    translateOnAxis : (function() {
        var v1 = new THREE.Vector3(),
            euler = new THREE.Euler(),
            quat = new THREE.Quaternion();

        return function(obj, axis, distance) {
            ensure(defs.vector, obj);
            ensure(defs.euler, obj);
            euler.set(obj.rx, obj.ry, obj.rz);
            quat.setFromEuler(euler);

            v1.copy(axis).applyQuaternion(quat);

            return flap(defs.vector, add, obj, v1.multiplyScalar(distance));
        }
    }())
};

// global listeners
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

