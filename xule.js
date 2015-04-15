var THREE = require("threejs"),
    modules = [],
    keys = {};

// X is for Xule
module.exports = function x() {
    var args = [].slice.call(arguments),
        type = args[0],
        children = args[2] ? args[2] : args[1],
        attrs = children ? args[1] : {};

    return {
        type : type,
        children : children,
        attrs : attrs
    };
};

function fixedStep() {
    // Fixed logic ticking, 100 tick
    setTimeout(fixedStep, 10);
    modules.forEach(function(module) {
        if(module.fixedStep) {
            module.fixedStep(module._ctrl);
        }
    });
}

function build(module, render) {

}

function step() {
    for(var i = 0; i < modules.length; i++) {
        if(module[i].step) {
            module[i].step();
        }

        // before the render
        build(module[i], module[i].render());

        if(module[i].camera) {
            module[i].renderer(module[i].scene, module[i].camera);
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
};

x.game = function(root, module) {
    if (!root) throw new Error("Please ensure the DOM element exists before rendering a scene to it.");


    if(!module.renderer) {
        module.renderer = new THREE.WebGlRenderer();
        module.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    if(!module.scene) {
        module.scene = new THREE.Scene();
    }

    modules.push(module);
    root.appendChild(renderer.domElement);
    renderer.domElement.addEventListener("keydown", keyDown);
    renderer.domElement.addEventListener("keyup", keyUp);

    module._ctrl = {
        renderer : renderer,
        scene : scene
    };

    module._ctrl = module.controller.call(module._ctrl) || module._ctrl;
};

// Step step
fixedStep();
step();

