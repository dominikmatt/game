import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";

export default class Butchers extends EconomyBuilding implements BuildingInterface {
    readonly _matrix: number[][] = [
        [0,1,1,1],
        [1,1,1,1],
        [1,1,1,2],
    ];

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);
    }

    protected getBuildingData() {
        return {};
    }
}