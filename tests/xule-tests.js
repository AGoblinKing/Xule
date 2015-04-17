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
        ctrl.camera = { x : 0, y: 0, z: 0};

        ctrl.meshes = [];
        for(var i = 0; i < 100; i++) {
            ctrl.meshes.push({
                x : r(-10, 10),
                y : r(-10, 10),
                z : r(-10, 10)
            });
        }
    },
    fixedStep : function(ctrl) {
        ctrl.meshes.map(function(mesh) {
            mesh.x += r(-1, 1) * .1;
            mesh.y += r(-1, 1) * .1;
            mesh.z += r(-1, 1) * .1;
        });
    },
    // stepLocal, stepRemote
    step : function(ctrl) {
        if(x.key("W")) {
            ctrl.player.x++;
        }
        if(x.key("X")) {
            ctrl.camera.x += Math.PI / 180;
        }
        if(x.key("Z")) {
            ctrl.camera.z += Math.PI / 180;
        }
        if(x.key("C")) {
            ctrl.camera.y += Math.PI / 180;
        }
    },
    render : function(ctrl) {
        // map changes from data back
        return x("object", [
            x("camera", {
                x : 3,
                rx : ctrl.camera.x,
                ry : ctrl.camera.y,
                rz : ctrl.camera.z,
                aspect : window.innerWidth / window.innerHeight
            }),
            x("light.point", {
                x : 5,
                y : 10
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
                        color : 0x00FF00,
                        shading : 1
                    }
                });
            })
        ]);
    }
});
