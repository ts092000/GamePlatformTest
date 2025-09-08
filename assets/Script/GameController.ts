import { _decorator, Collider2D, Component, Contact2DType, director, Input, input, IPhysics2DContact, Node, randomRange, randomRangeInt, Vec2, Vec3 } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { ObjectSpawner } from './Object/ObjectSpawner';
import { Constants } from './Data/Constants';
import { MovingObject } from './Object/MovingObject';
const { ccclass, property } = _decorator;

// Khai báo các trạng thái của game
export enum GameState {
    MENU,
    PLAYING,
    GAMEOVER,
}

@ccclass('GameController')
export class GameController extends Component {
    @property(GameModel)
    private GameModel: GameModel;

    @property(GameView)
    private GameView: GameView;

    @property(ObjectSpawner)
    private ObjectSpawner: ObjectSpawner;

    // Thuộc tính để lưu trữ trạng thái hiện tại của game
    private currentState: GameState = GameState.MENU;

    private score: number = 0;
    private tempscore: number = 0;
    private processScoreStage: number = 0;

    @property
    public jumpForce: number = 300;

    protected onLoad(): void {
        this.changeState(GameState.MENU);
        if (this.GameView.Bg1UITransform) {
            this.GameModel.BgWidth = this.GameView.Bg1UITransform.width;
        }
        this.GameView.Bg1Sprite.spriteFrame = this.GameView.Bg2Sprite.spriteFrame = this.GameView.BgSf[randomRangeInt(0, 2)];
    }

    protected start(): void {
        // this.GameModel.BgWidth = this.GameView.BgSprite.spriteFrame.originalSize.width;
        
    }

    protected update(dt: number): void {
        //Move background to the left
        this.GameModel.BgNode.translate(new Vec3(-Constants.speed * dt, 0, 0));

        //Loop background
        if (this.GameModel.BgNode.position.x <= -this.GameModel.BgWidth) {
            this.GameModel.BgNode.setPosition(this.GameModel.BgNode.position.x 
                + this.GameModel.BgWidth, this.GameModel.BgNode.position.y, 
                this.GameModel.BgNode.position.y);
        }
    }

    public changeState(newState: GameState) {
        // Tắt tất cả UI trước
        this.GameModel.MenuNode.active = false;
        this.GameModel.GameOverNode.active = false;
        // this.gameOverUI.active = false;

        // Cập nhật trạng thái
        this.currentState = newState;

        switch (this.currentState) {
            case GameState.MENU:
                this.handleMenuState();
                break;
            case GameState.PLAYING:
                this.handlePlayingState();
                break;
            case GameState.GAMEOVER:
                this.handleGameOverState();
                break;
        }
    }

    private handleMenuState(): void {
        this.GameModel.MenuNode.active = true;
        this.GameModel.GameOverNode.active = false;
    }

    private handlePlayingState(): void {
        Constants.speed = 500;
        this.tempscore = Constants.scoreGameProcess[this.processScoreStage];
        this.GameView.ScorePlayinghLabel.string = `0`;
        this.schedule(this.addScorePerSecond, 1);
        this.ObjectSpawner.initializePool(this.ObjectSpawner.obstaclePrefab, this.ObjectSpawner.obstaclePool);
        this.ObjectSpawner.initializePool(this.ObjectSpawner.rewardPrefab, this.ObjectSpawner.rewardPool);
        this.ObjectSpawner.initializePool(this.ObjectSpawner.mobPrefab, this.ObjectSpawner.mobPool);
        this.ObjectSpawner.nextSpawnTime = randomRange(this.ObjectSpawner.minSpawnInterval, this.ObjectSpawner.maxSpawnInterval);
        this.GameModel.MenuNode.active = false;
        this.GameModel.GameOverNode.active = false;
    }

    private handleGameOverState(): void {
        this.unschedule(this.addScorePerSecond);
        this.GameModel.MenuNode.active = false;
        this.GameModel.GameOverNode.active = true;
        input.off(Input.EventType.TOUCH_START, this.onJump, this);
    }
    
    // Phương thức để gọi từ các button trong UI
    private onStartGame(): void {
        this.GameView.FadeNode.active = true;
        this.GameView.FadeAnim.play();
        this.GameModel.BtnStartGameNode.active = false;
        this.GameModel.PlayerCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        input.on(Input.EventType.TOUCH_START, this.onJump, this);
        this.changeState(GameState.PLAYING);
    }

    private onRestartGame(): void {
        this.GameView.FadeNode.active = true;
        this.GameView.FadeAnim.play();
        this.GameModel.BtnStartGameNode.active = false;
        this.changeState(GameState.PLAYING);
    }

    private onBackToMenu(): void {
        this.GameView.FadeNode.active = true;
        this.GameView.FadeAnim.play();
        this.GameModel.BtnStartGameNode.active = true;
        this.changeState(GameState.MENU);
    }

    private addScorePerSecond(): void {
        // Cộng thêm điểm
        this.score += this.GameModel.pointsPerSecond;
        // Cập nhật giao diện điểm
        this.updateScoreUI();
        if (this.score > 0 && this.score >= this.tempscore) {
            this.processScoreStage += 1;
            Constants.speed += 150;
            this.tempscore = Constants.scoreGameProcess[this.processScoreStage];
            this.GameModel.pointsPerSecond += 1;
            console.log('process')
        }
    }

    // Phương thức để cập nhật UI
    private updateScoreUI() {
        if (this.GameView.ScorePlayinghLabel) {
            this.GameView.ScorePlayinghLabel.string = `${this.score}`;
        }
    }

    // Phương thức công khai để các script khác có thể thêm điểm
    public addScore(points: number) {
        this.score += points;
        this.updateScoreUI();
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
            if (!otherCollider) return;
            const otherNode = otherCollider.node;
    
            if (otherCollider.tag === 1) {
                this.addScore(1)
                const movingObject = otherNode.getComponent(MovingObject);
                if (movingObject) {
                    movingObject.setSpawner(this.node.parent.getComponent('ObjectSpawner'));
                    this.ObjectSpawner.returnObjectToPool(otherNode);
                    console.log('an');
                }
            } else if (otherCollider.tag === 2) {
                console.log('Game Over!');
                this.handleGameOverState();
                director.pause();
            } else if (otherCollider.tag === 3 && this.GameModel.PlayerRb2d.gravityScale === 3) {
                // input.off(Input.EventType.TOUCH_START, this.onJump, this);
                this.GameModel.PlayerNode.setPosition(new Vec3(-570, -420));
                this.GameModel.PlayerSpineAnim.setAnimation(0, 'run', true);
                console.log('va cham');
                this.GameModel.PlayerRb2d.gravityScale = 0;
                setTimeout(() => {
                    input.on(Input.EventType.TOUCH_START, this.onJump, this);
                }, 150);
            }
        }
    
    private onJump(): void {
        this.GameModel.PlayerCollider.apply();
        setTimeout(() => {
            this.GameModel.PlayerRb2d.gravityScale = 3;
        }, 150);
        this.GameModel.PlayerRb2d.linearVelocity = new Vec2(this.GameModel.PlayerRb2d.linearVelocity.x, this.jumpForce);
        this.GameModel.PlayerSpineAnim.setAnimation(0, 'jump2', false);
        input.off(Input.EventType.TOUCH_START, this.onJump, this);
        console.log('nhay')
    }
}


