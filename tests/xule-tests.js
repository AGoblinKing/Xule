var test = require("./test"),
    x = require("../xule.js");

function r(min, max) {
    return Math.round(min + Math.random() * (max-min));
}

x.game(document.body, {
    //renderer
    //scene
    controller : function() {
        var ctrl = this;

        // if anything updates, apply it
        ctrl.player = {
            x : 5
        };
        ctrl.camera = { x : 0, y: 0, z: 30, rx: 0, rz: 0, ry: 0};

        ctrl.meshes = [];
        for(var i = 0; i < 1000; i++) {
            ctrl.meshes.push({
                x : r(-10, 10),
                y : r(-10, 10),
                z : r(-10, 10),
                mat : 0x0000FF
            });
        }
    },
    fixedStep : function(ctrl) {
        ctrl.meshes.map(function(mesh) {
            mesh.x += r(-1, 1) * .2;
            mesh.y += r(-1, 1) * .2;
            mesh.z += r(-1, 1) * .2;
        });
    },
    // stepLocal, stepRemote
    step : function(ctrl) {

        if(x.key("X")) {
            ctrl.camera.rx += Math.PI / 180;
        }
        if(x.key("Z")) {
            ctrl.camera.rz += Math.PI / 180;
        }
        if(x.key("C")) {
            ctrl.camera.ry += Math.PI / 180;
        }

        if(x.key("W")) {
            ctrl.camera.z -= .1;
        }
        if(x.key("A")) {
            ctrl.camera.x -= .1;
        }
        if(x.key("S")) {
            ctrl.camera.z += .1;
        }
        if(x.key("D")) {
            ctrl.camera.x += .1;
        }
    },
    render : function(ctrl) {
        // map changes from data back
        return x("object", [
            x("camera", {
                x : ctrl.camera.x,
                y : ctrl.camera.y,
                z : ctrl.camera.z,
                rx : ctrl.camera.rx,
                ry : ctrl.camera.ry,
                rz : ctrl.camera.rz,
                aspect : window.innerWidth / window.innerHeight
            }),
            x("light.point", {
                x : 5,
                y : 10
            }),
            x("light.point", {
                x : -5,
                y : -10
            }),
            x("light.point", {
                x : 5,
                y : -10
            }),
            ctrl.meshes.map(function(box) {
                return x("mesh", {
                    x : box.x,
                    y : box.y,
                    z : box.z,
                    geometry : {
                        type : "box",
                        width : 1,
                        height : 1,
                        depth : 1
                    },
                    material : {
                        type: "lambert",
                        color : box.mat,
                        shading : 1
                    }
                });
            })
        ]);
    }
});
