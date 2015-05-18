/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var StatusLayer = cc.Layer.extend({
    labelCoin: null,
    labelMeter: null,
    coins: 0,
    ctor: function () {
        this._super();
        this.init();

    },
    init: function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelCoin = new cc.LabelTTF("Coins: 0", "Helvetica", 20);
        this.labelCoin.setColor(cc.color(0, 0, 0)); // black
        this.labelCoin.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCoin);

        this.labelMeter = new cc.LabelTTF("0M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);

    }
});
