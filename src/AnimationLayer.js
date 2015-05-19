

var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    body: null,
    shape: null,
    ctor: function (space) {


        this._super();
        this.space = space;

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(true);
        this.addChild(this._debugNode, 10);

        this.init();

    },
    init: function () {
        this._super();

        //create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);

        // initialize runningAction

        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }



        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

        this.sprite = new cc.PhysicsSprite("#runner0.png");
        var contentSize = this.sprite.getContentSize();

        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));

        this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);

        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));

        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);

        this.space.addShape(this.shape);
        this.sprite.setBody(this.body);

        this.sprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.sprite);





    },
    update: function (dt) {
        var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
        statusLayer.updateMeter(this.sprite.getPositionX() - g_runnerStartX);
        
//        var vel = 
        
    },
    getEyeX: function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    },
});

