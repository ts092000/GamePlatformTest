import { _decorator, Component, instantiate, Node, Prefab, randomRange, Vec3 } from 'cc';
import { MovingObject } from './MovingObject';
import { GameView } from '../GameView';
const { ccclass, property } = _decorator;

@ccclass('ObjectSpawner')
export class ObjectSpawner extends Component {
    @property(Prefab)
    public obstaclePrefab: Prefab = null;

    @property(Prefab)
    public rewardPrefab: Prefab = null;

    @property({ tooltip: 'Kích thước ban đầu của Object Pool' })
    public poolSize: number = 10;

    @property({ tooltip: 'Khoảng thời gian sinh vật tối thiểu' })
    public minSpawnInterval: number = 2;

    @property({ tooltip: 'Khoảng thời gian sinh vật tối đa' })
    public maxSpawnInterval: number = 4;

    @property({ tooltip: 'Phạm vi random vị trí Y' })
    public verticalRange: number = 350;

    @property(GameView)
    private GameView: GameView;

    private timeSinceLastSpawn: number = 0;
    private nextSpawnTime: number = 0;
    private obstaclePool: Node[] = [];
    private rewardPool: Node[] = [];

    protected onLoad(): void {
        this.initializePool(this.obstaclePrefab, this.obstaclePool);
        this.initializePool(this.rewardPrefab, this.rewardPool);
        this.nextSpawnTime = randomRange(this.minSpawnInterval, this.maxSpawnInterval);
    }

    private initializePool(prefab: Prefab, pool: Node[]) {
        if (!prefab) {
            return;
        }

        for (let i = 0; i < this.poolSize; i++) {
            const newObject = instantiate(prefab) as Node;
            this.node.addChild(newObject);
            newObject.active = false;
            pool.push(newObject);
        }
    }

    protected update(dt: number): void {
        this.timeSinceLastSpawn += dt;
        if (this.timeSinceLastSpawn >= this.nextSpawnTime) {
            this.spawnNewObject();
            this.timeSinceLastSpawn = 0;
            this.nextSpawnTime = randomRange(this.minSpawnInterval, this.maxSpawnInterval);
        }
    }

    protected spawnNewObject(): void {
        const isObstacle = Math.random() < 0.5;
        const objectPool = isObstacle ? this.obstaclePool : this.rewardPool;

        // Tìm một đối tượng không hoạt động trong pool
        const newObject = objectPool.find(obj => !obj.active);

        if (!newObject) {
            console.warn('Object Pool đã hết, cần tăng poolSize!');
            return;
        }
        
        // Vị trí xuất hiện ở bên phải màn hình
        const xPos = this.GameView.Bg1UITransform.width / 2 + 100; 
        const yPos = randomRange(-this.verticalRange, this.verticalRange);
        
        // Kích hoạt đối tượng và đặt vị trí
        newObject.active = true;
        newObject.setPosition(xPos, newObject.position.y, 0);

        const movingScript = newObject.getComponent(MovingObject);
        if (movingScript) {
            movingScript.setSpawner(this);
        }
    }

    public returnObjectToPool(objectNode: Node): void {
        objectNode.active = false;
    }
}


