/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var BackgroundLayer = cc.Layer.extend({
    map00:null,
    map01:null,
    mapWidth: 0,
    mapIndex: 0,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
//        var winsize = cc.director.getWinSize();

        //Create background image and put it in middle screen

//        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
//        var spriteBG = new cc.Sprite(res.background_png);
//        spriteBG.setPosition(centerPos);
//        this.addChild(spriteBG);

        this.map00 = new cc.TMXTiledMap(res.map00_tmx);
        this.addChild(this.map00);
        this.mapWidth = this.map00.getContentSize().width;
        this.map01 = new cc.TMXTiledMap(res.map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);
        
    },
    checkAndReload: function (eyeX) {
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapWidth == newMapIndex) {
            return false;
        }
        if (0 == newMapIndex % 2) {
            //change mapSecond
            this.map01.setPosition(this.mapWidth * (newMapIndex + 1));
        } else {
            //change mapFirst
            this.map00.setPosition(this.mapWidth * (newMapIndex + 1));
        }
        this.mapIndex = newMapIndex;
        return true;
    },
    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
    }
});
