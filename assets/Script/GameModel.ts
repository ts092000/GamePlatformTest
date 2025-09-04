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
}


