import { _decorator, Collider2D, Component, Node, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('MovingObject')
export class MovingObject extends Component {
    @property
    public speed: number = 200;

    @property
    public isReward: boolean = true;

    @property
    public isObstacle: boolean = true;

    @property
    public isMob: boolean = true;

    @property(Sprite)
    public nodeSprite: Sprite = null;

    // Tham chiếu đến spawner để gọi hàm trả về pool
    private spawner: any = null;
    private screenExitX: number = 0;

    private uiTransform: UITransform = null; // Lưu trữ UITransform để truy cập nhanh

    protected onLoad(): void {
        this.uiTransform = this.node.getComponent(UITransform);
        // Lưu ý: screenExitX sẽ được tính lại trong setSpawner hoặc khi active
        // vì kích thước có thể thay đổi tùy thuộc vào SpriteFrame
    }

    public setSpawner(spawner: any): void {
        this.spawner = spawner;
    }

    // Phương thức mới để gán SpriteFrame
    public setSpriteFrame(spriteFrame: SpriteFrame) {
        const sprite = this.nodeSprite;
        if (sprite) {
            sprite.spriteFrame = spriteFrame;
        }
    }
    protected update(dt: number): void {
        const currentPos = this.node.position;
        const newPos = new Vec3(currentPos.x - Constants.speed * dt, currentPos.y, currentPos.z);
        this.node.setPosition(newPos);

        const uiTransform = this.node.getComponent(UITransform);
        if (!uiTransform) return;

        // Lấy tọa độ thế giới của vật phẩm
        const worldPos = this.node.worldPosition;
        // Chiều rộng của vật phẩm
        const objectWidth = uiTransform.width;
        
        // Vị trí cạnh phải của vật phẩm trong tọa độ thế giới
        const rightEdgeOfObject = worldPos.x + objectWidth / 2;

        // Kiểm tra nếu cạnh phải của vật phẩm đã vượt qua cạnh trái của màn hình
        // Giả sử màn hình của bạn bắt đầu tại x = 0
        if (rightEdgeOfObject < 0) {
            if (this.spawner) {
                this.spawner.returnObjectToPool(this.node);
            }
        }
        this.node.getComponent(Collider2D).apply();
    }
}


