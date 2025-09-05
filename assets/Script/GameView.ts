import { _decorator, Animation, Component, Label, Node, Sprite, SpriteFrame, UITransform } from 'cc';
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

    @property(Sprite)
    private bg1Sprite: Sprite;

    public get Bg1Sprite() : Sprite {
        return this.bg1Sprite;
    }
    
    public set Bg1Sprite(bg1Sprite : Sprite) {
        this.bg1Sprite = bg1Sprite;
    }

    @property(Sprite)
    private bg2Sprite: Sprite;

    public get Bg2Sprite() : Sprite {
        return this.bg2Sprite;
    }
    
    public set Bg2Sprite(bg2Sprite : Sprite) {
        this.bg2Sprite = bg2Sprite;
    }

    @property([SpriteFrame])
    private bgSf: SpriteFrame[] = [];

    public get BgSf() : SpriteFrame[] {
        return this.bgSf;
    }
    
    public set BgSf(bgSf : SpriteFrame[]) {
        this.bgSf = bgSf;
    }

    @property(Node)
    private fadeNode: Node;

    public get FadeNode() : Node {
        return this.fadeNode;
    }
    
    public set FadeNode(fadeNode : Node) {
        this.fadeNode = fadeNode;
    }

    @property(Animation)
    private fadeAnim: Animation;

    public get FadeAnim() : Animation {
        return this.fadeAnim;
    }
    
    public set FadeAnim(fadeAnim : Animation) {
        this.fadeAnim = fadeAnim;
    }

    @property(Label)
    private scorePlayinghLabel: Label;

    public get ScorePlayinghLabel() : Label {
        return this.scorePlayinghLabel;
    }
    
    public set ScorePlayinghLabel(scorePlayinghLabel : Label) {
        this.scorePlayinghLabel = scorePlayinghLabel;
    }
}


