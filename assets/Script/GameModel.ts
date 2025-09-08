import { _decorator, Collider2D, Component, Node, RigidBody2D, sp, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({
        tooltip: 'Tốc độ di chuyển của background'
    })
    public speed: number = 100;

    // Background Width
    private bgWidth: number = 0;
    
    public get BgWidth() : number {
        return this.bgWidth;
    }
    
    public set BgWidth(bgWidth : number) {
        this.bgWidth = bgWidth;
    }

    @property(Node)
    private bgNode: Node;

    public get BgNode() : Node {
        return this.bgNode;
    }
    
    public set BgNode(bgNode : Node) {
        this.bgNode = bgNode;
    }

    @property(Node)
    private menuNode: Node;

    public get MenuNode() : Node {
        return this.menuNode;
    }
    
    public set MenuNode(menuNode : Node) {
        this.menuNode = menuNode;
    }

    @property(Node)
    private gameOverNode: Node;

    public get GameOverNode() : Node {
        return this.gameOverNode;
    }
    
    public set GameOverNode(gameOverNode : Node) {
        this.gameOverNode = gameOverNode;
    }

    @property(Node)
    private btnStartGameNode: Node;

    public get BtnStartGameNode() : Node {
        return this.btnStartGameNode;
    }
    
    public set BtnStartGameNode(btnStartGameNode : Node) {
        this.btnStartGameNode = btnStartGameNode;
    }

    @property({ tooltip: 'Số điểm tăng mỗi giây' })
    public pointsPerSecond: number = 1;

    @property(RigidBody2D)
    private playerRb2d: RigidBody2D;
    
    public get PlayerRb2d() : RigidBody2D {
        return this.playerRb2d
    }
    
    public set PlayerRb2d(playerRb2d : RigidBody2D) {
        this.playerRb2d = playerRb2d;
    }
    
    @property(Collider2D)
    private playerCollider: Collider2D;
    
    public get PlayerCollider() : Collider2D {
        return this.playerCollider
    }
    
    public set PlayerCollider(playerCollider : Collider2D) {
        this.playerCollider = playerCollider;
    }

    @property(sp.Skeleton)
    private playerSpineAnim: sp.Skeleton;
    
    public get PlayerSpineAnim() : sp.Skeleton {
        return this.playerSpineAnim
    }
    
    public set PlayerSpineAnim(playerSpineAnim : sp.Skeleton) {
        this.playerSpineAnim = playerSpineAnim;
    }

    @property(Node)
    private playerNode: Node;
    
    public get PlayerNode() : Node {
        return this.playerNode
    }
    
    public set PlayerNode(playerNode : Node) {
        this.playerNode = playerNode;
    }
}


