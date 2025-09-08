import { _decorator, Animation, Component, instantiate, Node, Prefab, randomRange, randomRangeInt, Sprite, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { MovingObject } from './MovingObject';
import { GameView } from '../GameView';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('ObjectSpawner')
export class ObjectSpawner extends Component {
    @property(Prefab)
    public obstaclePrefab: Prefab = null;

    @property(Prefab)
    public rewardPrefab: Prefab = null;

    @property(Prefab)
    public mobPrefab: Prefab = null;

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

    @property([SpriteFrame])
    public rewardSpriteFrame: SpriteFrame[] = [];

    @property([SpriteFrame])
    public obstacleSpriteFrame: SpriteFrame[] = [];

    @property([SpriteFrame])
    public mobSpriteFrame: SpriteFrame[] = [];

    private timeSinceLastSpawn: number = 0;
    public nextSpawnTime: number = 0;
    public obstaclePool: Node[] = [];
    public rewardPool: Node[] = [];
    public mobPool: Node[] = [];

    protected onLoad(): void {
        // this.initializePool(this.obstaclePrefab, this.obstaclePool);
        // this.initializePool(this.rewardPrefab, this.rewardPool);
        // this.initializePool(this.mobPrefab, this.mobPool);
        // this.nextSpawnTime = randomRange(this.minSpawnInterval, this.maxSpawnInterval);
    }

    public initializePool(prefab: Prefab, pool: Node[]) {
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
        // Chọn ngẫu nhiên loại đối tượng để sinh ra: 0 = Obstacle, 1 = Reward, 2 = Mob
        const objectType = randomRangeInt(0, 3);
        let objectPool: Node[] = [];
        let spriteFrames: SpriteFrame[] = [];

        switch (objectType) {
            case 0:
                objectPool = this.obstaclePool;
                spriteFrames = this.obstacleSpriteFrame;
                break;
            case 1:
                objectPool = this.rewardPool;
                spriteFrames = this.rewardSpriteFrame;
                break;
            case 2:
                objectPool = this.mobPool;
                spriteFrames = this.mobSpriteFrame;
                console.log(this.mobSpriteFrame)
                break;
        }

        if (spriteFrames.length === 0) {
            console.warn('Không có SpriteFrame để sinh vật thể!');
            return;
        }

        // Tìm một đối tượng không hoạt động trong pool
        const newObject = objectPool.find(obj => !obj.active);

        if (!newObject) {
            console.warn('Object Pool đã hết, cần tăng poolSize!');
            return;
        }

        // Chọn một SpriteFrame ngẫu nhiên
        const randomSpriteNumber = Math.floor(Math.random() * spriteFrames.length);
        const randomSpriteFrame = spriteFrames[randomSpriteNumber];

        // Gán SpriteFrame cho vật phẩm
        const movingScript = newObject.getComponent(MovingObject);
        if (movingScript) {
            movingScript.setSpriteFrame(randomSpriteFrame);
            movingScript.setSpawner(this); // Đặt spawner sau khi setSpriteFrame
            const contentSize = newObject.getComponent(UITransform);
            // if (newObject.getComponent(MovingObject).isObstacle) {
            //     if (randomSpriteFrame === spriteFrames[1]) {
            //         contentSize.setContentSize(285, 155);
            //     } else {
            //         contentSize.setContentSize(150, 155);
            //     }
            // }
        } else {
            // Nếu không có MovingObject script, gán trực tiếp cho Sprite component
            const spriteComp = newObject.getComponent(Sprite);
            if (spriteComp) {
                spriteComp.spriteFrame = randomSpriteFrame;
            }
        }
        
        // Vị trí xuất hiện ở bên phải màn hình
        const xPos = randomRange(this.GameView.Bg1UITransform.width / 2 - 1000, this.GameView.Bg1UITransform.width / 2 - 800); 
        console.log(xPos)
        const yPos = randomRange(-this.verticalRange, this.verticalRange);
        
        // Kích hoạt đối tượng và đặt vị trí
        newObject.active = true;
        if (objectType === 2) {
            newObject.setPosition(xPos, Constants.randomPosYMob[randomRangeInt(0, 2)], 0);
            newObject.getComponent(Animation).defaultClip = newObject.getComponent(Animation).clips[randomSpriteNumber];
            newObject.getComponent(Animation).play();
        } else {
            newObject.setPosition(xPos, newObject.position.y, 0);
        }

        // const movingScript = newObject.getComponent(MovingObject);
        // if (movingScript) {
        //     movingScript.setSpawner(this);
        // }
    }

    public returnObjectToPool(objectNode: Node): void {
        objectNode.active = false;
    }
}


