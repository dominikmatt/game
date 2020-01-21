"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../Character");
class Woodcutter extends Character_1.default {
    getType() {
        return 'woodcutter';
    }
    getBuildingType() {
        return 'woodcutters';
    }
    getNeedBuilding() {
        return true;
    }
    getCharacterData() {
        return {};
    }
    findJob() {
        if (null === this._building.nextJob) {
            return;
        }
        this._walkTarget = this._building.doorPosition;
        this._job = this._building.nextJob;
    }
}
exports.default = Woodcutter;
//# sourceMappingURL=Woodkutter.js.map