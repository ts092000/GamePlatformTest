import { _decorator, Component, Node, UITransform } from 'cc';
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
}


