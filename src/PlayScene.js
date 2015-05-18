/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var PlayScene = cc.Scene.extend({
    space: null,
    onEnter: function () {
        this._super();
        this.initPhysics();
        this.gameLayer = new cc.Layer();
        
        
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(this.space),0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        
//        this.addChild(new BackgroundLayer);
//        this.addChild(new AnimationLayer(this.space));
        this.addChild(new StatusLayer,0,TagOfLayer.Status);
        
        this.scheduleUpdate();
    },
    initPhysics: function () {
        //1. new space object
        this.space = new cp.Space();
        //2 setup the Gravity
        this.space.gravity = cp.v(0, -350);

        //3 Set up walls

        var wallBottom = new cp.SegmentShape(this.space.staticBody,
                cp.v(0, g_groundHeight), // start point
                cp.v(4294967295, g_groundHeight), // MAX INT 
                0); // thickness of wall
        this.space.addStaticShape(wallBottom);

    },
    update: function (dt) {
        //chipmunk step
        this.space.step(dt);
        
        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        
        this.gameLayer.setPosition(cc.p(-eyeX,0));
    },
});
