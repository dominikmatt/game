import game from "./Game";
import * as BABYLON from "babylonjs";

let instance: AssetsManager = null;

const assetsPath: string = 'assets/models/';

interface MesehsStore {
    [propName: string]: BABYLON.AbstractMesh[];
}

export class AssetsManager {
    private _assetsManager: BABYLON.AssetsManager;
    private _meshesStore: MesehsStore = {};

    public static getInstance(): AssetsManager {
        if (null === instance) {
            instance = new AssetsManager();
        }

        return instance;
    }

    initialize() {
        return new Promise((resolve) => {
        this._assetsManager = new BABYLON.AssetsManager(game.gameScene.scene);

        this._assetsManager.onProgress = function(remainingCount, totalCount, lastFinishedTask) {
            game.gameScene.engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        };


        this._assetsManager.onTaskErrorObservable.add(function(task) {
            console.log('task failed', task.errorObject.message, task.errorObject.exception);
        });

        this._assetsManager.onFinish = resolve;

        this.loadAssets('terrain', 'maps/slishou', 'slishou1.babylon');
        this.loadAssets('tree', 'terrain', 'tree001.babylon');
        this.loadAssets('stone', 'terrain', 'stone.babylon');
        this.loadAssets('acre', 'fields', 'acre.babylon');
        this.loadAssets('armourSmithy', 'buildings', 'armourSmithy.babylon');
        this.loadAssets('armouryWorkshop', 'buildings', 'armouryWorkshop.babylon');
        this.loadAssets('bakery', 'buildings', 'bakery.babylon');
        this.loadAssets('barracks', 'buildings', 'barracks.babylon');
        this.loadAssets('butchers', 'buildings', 'butchers.babylon');
        this.loadAssets('charcoalBurning', 'buildings', 'charcoalBurning.babylon');
        this.loadAssets('farm', 'buildings', 'farm.babylon');
        this.loadAssets('goldSmithy', 'buildings', 'goldSmithy.babylon');
        this.loadAssets('inn', 'buildings', 'inn.babylon');
        this.loadAssets('mill', 'buildings', 'mill.babylon');
        this.loadAssets('mine', 'buildings', 'mine.babylon');
        this.loadAssets('quarry', 'buildings', 'quarry.babylon');
        this.loadAssets('sawmill', 'buildings', 'sawmill.babylon');
        this.loadAssets('schoolhouse', 'buildings', 'schoolhouse.babylon');
        this.loadAssets('smithy', 'buildings', 'smithy.babylon');
        this.loadAssets('storehouse', 'buildings', 'storehouse.babylon');
        this.loadAssets('swineFarm', 'buildings', 'swineFarm.babylon');
        this.loadAssets('tannery', 'buildings', 'tannery.babylon');
        this.loadAssets('tower', 'buildings', 'tower.babylon');
        this.loadAssets('vineyard', 'buildings', 'vineyard.babylon');
        this.loadAssets('weaponSmithy', 'buildings', 'weaponSmithy.babylon');
        this.loadAssets('weaponsWorkshop', 'buildings', 'weaponsWorkshop.babylon');
        this.loadAssets('woodcutters', 'buildings', 'woodcutters.babylon');
        this.loadAssets('character', 'characters/viking', 'viking.babylon');

        this._assetsManager.load();
        });
    }

    loadAssets(name: string, path: string, filename: string) {
        const meshTask = this._assetsManager.addMeshTask(
            `${name}-task`,
            '',
            `${assetsPath}${path}/`,
            filename
        );

        meshTask.onError = function (task, message, exception) {
            console.log(message, exception);
        };

        meshTask.onSuccess = (task) => {
            task.loadedMeshes.forEach((mesh: BABYLON.Mesh) => {
                mesh.isVisible = false;
            });
            this._meshesStore[name] = task.loadedMeshes;
        }
    }

    getBuildingMeshByName(name: string, key: string): BABYLON.Mesh | null {
        let banner: BABYLON.Mesh = null;
        let mainMesh: BABYLON.Mesh = null;

        if (this._meshesStore[name]) {
            this._meshesStore[name].forEach((mesh: BABYLON.Mesh) => {
                if ('banner' === mesh.id) {
                    banner = (<BABYLON.Mesh>mesh).clone(`${name}-${key}-banner`);
                } else {
                    mainMesh = (<BABYLON.Mesh>mesh).clone(`${name}-${key}-main`);
                }
            });

            if (banner && mainMesh) {
                banner.parent = mainMesh;
            }

            return mainMesh;
        }
    }

    getCharacterMeshByName(name: string, key: string): BABYLON.Mesh | null {
        if (this._meshesStore[name]) {
            const mesh = (<BABYLON.Mesh>this._meshesStore[name][0]).clone(`${name}-${key}`);
            mesh.skeleton = this._meshesStore[name][0].skeleton.clone('skeleton', `${name}-skeleton-${key}`);
            return mesh;
        }

        return null;
    }

    getTreeMeshByName(name: string, instanceName: string): BABYLON.InstancedMesh | null {
        if (this._meshesStore[name]) {
            const tree = (<BABYLON.Mesh>this._meshesStore[name][0]);

            tree.scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
            tree.position = BABYLON.Vector3.Zero();

            return (<BABYLON.Mesh>this._meshesStore[name][0]).createInstance(instanceName);
        }

        return null;
    }

    getStoneMeshByName(name: string, instanceName: string): BABYLON.InstancedMesh | null {
        if (this._meshesStore[name]) {
            const stone = (<BABYLON.Mesh>this._meshesStore[name][0]);

            stone.position = BABYLON.Vector3.Zero();

            return (<BABYLON.Mesh>this._meshesStore[name][0]).createInstance(instanceName);
        }

        return null;
    }

    getFieldMeshByName(name: string, instanceName: string): BABYLON.InstancedMesh | null {
        if (this._meshesStore[name]) {
            const stone = (<BABYLON.Mesh>this._meshesStore[name][0]);

            stone.position = BABYLON.Vector3.Zero();

            return (<BABYLON.Mesh>this._meshesStore[name][0]).createInstance(instanceName);
        }

        return null;
    }

    getTerrainMeshByName(name: string): BABYLON.Mesh | null {
        if (this._meshesStore[name]) {
            return <BABYLON.Mesh>this._meshesStore[name][0];
        }

        return null;
    }
}

const assetsManager: AssetsManager = AssetsManager.getInstance();

export default assetsManager;
