"use strict";
var THREE = require("three"),
    modules = [],
    keys = {};

// X is for Xule
var x = module.exports = function x() {
    var args = [].slice.call(arguments),
        type = args[0],
        children, attrs;

    // ugh
    if(isArray(args[1])) {
        children = args[1];
    } else if(isArray(args[2])) {
        children = args[2];
    } else {
        children = [];
    }

    if(isObject(args[1])) {
        attrs = args[1];
    } else if(isObject(args[2])) {
        attrs = args[2];
    } else {
        attrs = {};
    }

    return {
        type : type,
        children : children,
        attrs : attrs
    };
};

function isObject(quest) {
    return Object.prototype.toString.call(quest) === "[object Object]";
}

function isArray(quest) {
    return Object.prototype.toString.call(quest) === "[object Array]";
}

function apply(path, obj, value) {
    if(path.length === 1) {
        obj[path.shift()] = value;
    } else {
        apply(path, obj[path.shift()], value);
    }
}

function target(path) {
    return function(value, target) {
        apply(path.split("."), target, value);
    }
}

function cacheOr(cache, params, create) {
    var key = JSON.stringify(params);

    if(!cache[key]) {
        cache[key] = create(params);
    }

    return cache[key];
}
// strategies
var targets = {
    "light.point" : THREE.PointLight,
    scene : THREE.Scene,
    mesh : THREE.Mesh,
    object : THREE.Object3D,
    camera : THREE.PerspectiveCamera
}, attrs = {
    x : target("position.x"),
    y : target("position.y"),
    z : target("position.z"),
    rx : target("rotation.x"),
    ry : target("rotation.y"),
    rz : target("rotation.z"),
    sx : target("scale.x"),
    sy : target("scale.y"),
    sz : target("scale.z"),
    visible : target("visible"),
    castShadow : target("castShadow"),
    receiveShadow : target("receiveShadow"),
    qx : target("quaternion.x"),
    qy : target("quaternion.y"),
    qz : target("quaternion.z"),
    qw : target("quaternion.w"),
    aspect : target("aspect"),
    geometry : function(geo, target, render) {
        if(render.type !== geo.type) {
            target.geometry = cacheOr(geomCache, geo, geos[geo.type]);
        }
    },
    material : function(mat, target) {
        if(mat.type !== mat.type) {
            target.material = cacheOr(matsCache, mat, mats[mat.type]);
        }
    }
}, geos = {
    box : function(geo) {
        return new THREE.BoxGeometry(geo.width, geo.height, geo.depth,
                                     geo.widthSegements, geo.heightSegments, geo.depthSegments);
    }
}, mats = {
    lambert : function(material) {
        // yay params
        return new THREE.MeshLambertMaterial(material);
    },
    basic : function(material) {
        return new THREE.MeshBasicMaterial(material);
    }
}, geomCache = {}, matsCache = {};

function fixedStep() {
    // Fixed logic ticking, 100 tick no render for you
    setTimeout(fixedStep, 10);
    modules.forEach(function(module) {
        if(module.fixedStep) {
            module.fixedStep(module._ctrl);
        }
    });
}

function mapObj(obj, target, fn) {
    return Object.keys(obj).filter(function(key) {
        fn(key, obj[key], target._target, target);
    });
}

function handleAttr(key, value, target, render) {
    if(attrs[key]) {
        attrs[key](value, target, render);
    }
}

function build(module, render, cache, parent) {
    if(cache && render.type === cache.type) {
        // we're probably the same object.
        render._target = cache._target;
    } else {
        // new object!
        render._target = new targets[render.type]();

        // hack
        if(render.type === "camera") {
            module.camera = render._target;
        }
        parent.add(render._target);

        // Kill yourself old guard
        if(cache) {
            parent.remove(cache._target);
        } else {
            cache = { children : [] }; // simplify my life
        }
    }

    // don't really have to worry about diffing, blast away sir.
    mapObj(render.attrs, render, handleAttr);

    // we're dumb and just looking at indexes
    compare(module, render.children, cache.children, render._target);
    return render;
}

function compare(module, renders, caches, parent) {
    renders.forEach(function(child, i) {
        if(isArray(child)) {
            compare(module, child, (isArray(caches[i]) ? caches[i] : []), parent);
        } else {
            build(module, child, caches[i], parent);
        }
    });

    // ded children
    if(caches.length > renders.length) {
        caches.slice(renders.length).forEach(function(child) {
            parent.remove(child._target);
        });
    }
}

function step() {
    for(var i = 0; i < modules.length; i++) {
        if(modules[i].step) {
            modules[i].step(modules[i]._ctrl);
        }

        modules[i].cache = build(modules[i], modules[i].render(modules[i]._ctrl), modules[i].cache, modules[i].scene);

        window.cache = modules[i].cache;
        if(modules[i].camera) {
            modules[i].renderer.render(modules[i].scene, modules[i].camera);
        }
    }
    requestAnimationFrame(step);
}

x.key = function(key) {
    return keys[key];
};

function keyDown(e) {
    keys[e.keyCode] = true;
    keys[String.fromCharCode(e.keyCode)] = true;
};

function keyUp(e) {
    keys[e.keyCode] = false;
    keys[String.fromCharCode(e.keyCode)] = false;
};

x.game = function(root, module) {
    if (!root) throw new Error("Please ensure the DOM element exists before rendering a scene to it.")

    if(!module.renderer) {
        module.renderer = new THREE.WebGLRenderer();
        module.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    if(!module.scene) {
        module.scene = new THREE.Scene();
    }

    modules.push(module);
    root.appendChild(module.renderer.domElement);

    module._ctrl = {
        renderer : module.renderer,
        scene : module.scene
    };

    module._ctrl = module.controller.call(module._ctrl) || module._ctrl;
};

// should this even be in here?
x.lookAt = function(obj1, obj2) {

};

// global listeners
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);
// Step step
fixedStep();
step();
