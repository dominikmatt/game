"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serf_1 = require("./types/Serf");
const Laborer_1 = require("./types/Laborer");
const Hero_1 = require("./types/Hero");
;
const characterMapping = {
    serf: Serf_1.default,
    laborer: Laborer_1.default,
    hero: Hero_1.default,
};
/**
 * Create a new character with given data.
 */
exports.default = (key, player) => {
    const character = new characterMapping[key](player);
    character.update();
    return character;
};
//# sourceMappingURL=CharacterFactory.js.map