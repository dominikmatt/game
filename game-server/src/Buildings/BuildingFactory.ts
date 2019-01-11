import Storehouse from "./types/Storehouse";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Building from "./Building";
import Player from "../Player";
import Schoolhouse from "./types/Schoolhouse";
import Woodcutters from "./types/Woodcutters";
import Bakery from "./types/Bakery";
import Brewery from "./types/Brewery";
import Butchers from "./types/Butchers";
import Farm from "./types/Farm";
import Inn from "./types/Inn";
import Mill from "./types/Mill";
import Mine from "./types/Mine";
import Quarry from "./types/Quarry";
import Sawmill from "./types/Sawmill";
import Smithy from "./types/Smithy";

interface BuildingMapping {
    [key:string]: any;
};

const buildingMapping: BuildingMapping = {
    storehouse: Storehouse,
    schoolhouse: Schoolhouse,
    woodcutters: Woodcutters,
    bakery: Bakery,
    brewery: Brewery,
    butchers: Butchers,
    farm: Farm,
    inn: Inn,
    mill: Mill,
    mine: Mine,
    quarry: Quarry,
    sawmill: Sawmill,
    smithy: Smithy,
};

/**
 * Create a new building with given data.
 *
 * @param {string} key
 * @param {PositionComponent} position
 * @param player
 * @param alreadyBuilt
 */
export default (key: string, position: PositionInterface, player: Player, alreadyBuilt: boolean = false) => {
    const building: Building = new buildingMapping[key](player, position, alreadyBuilt);

    building.update();

    return building;
}