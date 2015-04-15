var test = require("test"),
    x = require("../xule.js");

x.game(document.body, {
    //renderer
    //scene
    controller : function() {
        var ctrl = this;

        // if anything updates, apply it
        ctrl.player = {
            x : 5,
            geom : {
                type : "box",
                params : [1, 1, 1]
            },
            mat : 0x00FF00
        };
    },
    // stepLocal, stepRemote
    step : function(ctrl) {
        if(x.key("w")) {
            ctrl.player.x++;
        }
    },
    render : function(ctrl) {
        // map changes from data back
        return x("object", [
            x("camera", {
                x : 3,
                lookAt : "player"
            }),
            x("mesh", {
                key : "player",
                x : ctrl.player.x,
                geometry : ctrl.player.geom,
                material : ctrl.player.mat
            })
        ]);
    }
});
