import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(GameModel)
    private GameModel: GameModel;

    @property(GameView)
    private GameView: GameView;

    protected onLoad(): void {
        if (this.GameView.Bg1UITransform) {
            this.GameModel.BgWidth = this.GameView.Bg1UITransform.width;
        }
        console.log(this.GameModel.BgWidth);
    }

    protected start(): void {
        // this.GameModel.BgWidth = this.GameView.BgSprite.spriteFrame.originalSize.width;
    }

    protected update(dt: number): void {
        //Move background to the left
        this.GameModel.BgNode.translate(new Vec3(-this.GameModel.speed * dt, 0, 0));

        //Loop background
        if (this.GameModel.BgNode.position.x <= -this.GameModel.BgWidth) {
            this.GameModel.BgNode.setPosition(this.GameModel.BgNode.position.x 
                + this.GameModel.BgWidth, this.GameModel.BgNode.position.y, 
                this.GameModel.BgNode.position.y);
        }
    }
}


