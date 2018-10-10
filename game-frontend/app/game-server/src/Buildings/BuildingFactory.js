"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = require("./types/Storehouse");
const Schoolhouse_1 = require("./types/Schoolhouse");
;
const buildingMapping = {
    storehouse: Storehouse_1.default,
    schoolhouse: Schoolhouse_1.default
};
/**
 * Create a new building with given data.
 *
 * @param {string} key
 * @param {PositionComponent} position
 * @param player
 * @param alreadyBuilt
 */
exports.default = (key, position, player, alreadyBuilt = false) => {
    const building = new buildingMapping[key](player, position, alreadyBuilt);
    building.update();
    return building;
};
//# sourceMappingURL=BuildingFactory.js.map