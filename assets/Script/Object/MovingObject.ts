import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingObject')
export class MovingObject extends Component {
    @property
    public speed: number = 200;

    // Tham chiếu đến spawner để gọi hàm trả về pool
    private spawner: any = null;
    private screenExitX: number = 0;

    public setSpawner(spawner: any) {
        this.spawner = spawner;
        // Tính toán vị trí X mà vật phẩm cần vượt qua để biến mất
        // Đây là vị trí của cạnh trái của vật phẩm
        const uiTransform = this.node.getComponent(UITransform);
        if (uiTransform) {
            this.screenExitX = -this.node.position.x - uiTransform.width;
        }
    }

    protected update(dt: number): void {
        const currentPos = this.node.position;
        const newPos = new Vec3(currentPos.x - this.speed * dt, currentPos.y, currentPos.z);
        this.node.setPosition(newPos);

        // Kiểm tra khi cạnh phải của vật phẩm ra khỏi màn hình
        // So sánh vị trí x của nó với vị trí x của màn hình bên trái
        if (newPos.x < this.screenExitX) {
            if (this.spawner) {
                // Trả đối tượng về pool để tái sử dụng
                this.spawner.returnObjectToPool(this.node);
            }
        }
    }
}


