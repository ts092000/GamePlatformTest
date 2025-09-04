import { _decorator, Component, Node, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(Sprite)
    private bgSprite: Sprite
    
    public get BgSprite() : Sprite {
        return this.bgSprite
    }

    public set BgSprite(bgSprite : Sprite) {
        this.bgSprite = bgSprite;
    }

    @property(UITransform)
    private bg1UITransform: UITransform;

    public get Bg1UITransform() : UITransform {
        return this.bg1UITransform;
    }
    
    public set Bg1UITransform(bg1UITransform : UITransform) {
        this.bg1UITransform = bg1UITransform;
    }

    @property(UITransform)
    private bg2UITransform: UITransform;

    public get Bg2UITransform() : UITransform {
        return this.bg2UITransform;
    }
    
    public set Bg2UITransform(bg2UITransform : UITransform) {
        this.bg2UITransform = bg2UITransform;
    }
}


