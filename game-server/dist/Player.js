"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildBuildingCommand_1 = __importDefault(require("./Commands/BuildBuildingCommand"));
const JobStore_1 = __importDefault(require("./Jobs/JobStore"));
const Redis_1 = __importDefault(require("./Redis"));
const Core_1 = __importDefault(require("./Core"));
const GetMapDataCommand_1 = __importDefault(require("./Commands/GetMapDataCommand"));
const CreateCharacterCommand_1 = __importDefault(require("./Commands/CreateCharacterCommand"));
const BuildingManager_1 = __importDefault(require("./Buildings/BuildingManager"));
const PanelBuildingSelected_1 = __importDefault(require("./Commands/PanelBuildingSelected"));
class Player {
    constructor(name, token, playerId) {
        this._buildings = [];
        this._characters = [];
        this._name = name;
        this._token = token;
        this._db = new Redis_1.default(Object.keys(Core_1.default.players).length + 1);
        this._jobStore = new JobStore_1.default(this);
        this._buildingManager = new BuildingManager_1.default(this);
        this._playerId = playerId;
        this._index = this._playerId - 1;
        this._db.flushdb()
            .then(() => console.log('database cleared for player ', this._playerId))
            .catch((error) => {
            throw new Error(error);
        });
        Core_1.default.db.hset(`players:${this._token}`, 'isMaster', Object.keys(Core_1.default.players).length === 0);
    }
    initializeTown() {
        const startup = require('./Map/maps/slishou/startup')[this._index];
        startup.player = this;
        startup.placeHouses();
    }
    /**
     * Bin websocket event listeners.
     */
    listenWs() {
        new BuildBuildingCommand_1.default(this);
        new GetMapDataCommand_1.default(this);
        new CreateCharacterCommand_1.default(this);
        new PanelBuildingSelected_1.default(this);
    }
    update() {
        this._buildings.forEach((building) => {
            building.update();
        });
        this._characters.forEach((character, index) => {
            character.update();
        });
        this._jobStore.update();
    }
    /**
     * Add a new building to the buildings list.
     *
     * @param {Building} building
     */
    addBuilding(building) {
        this._buildings.push(building);
        return building;
    }
    getBuildingById(buildingId) {
        const buildings = this._buildings.filter((building) => {
            return buildingId === building.id;
        });
        if (0 < buildings.length) {
            return buildings[0];
        }
        return null;
    }
    getBuildingByType(buildingType, hasCharacter = false, isBuilt = true) {
        const buildings = this._buildings.filter((building) => {
            return buildingType === building.getType()
                && (null === building.character || true === hasCharacter)
                && (true === building.completelyBuilt || false === isBuilt);
        });
        if (0 < buildings.length) {
            return buildings[0];
        }
        return null;
    }
    /**
     * Add a new building to the buildings list.
     */
    addCharacter(character) {
        this._characters.push(character);
        return character;
    }
    get name() {
        return this._name;
    }
    get token() {
        return this._token;
    }
    get wsSocket() {
        return this._wsSocket;
    }
    set wsSocket(value) {
        this._wsSocket = value;
    }
    set panel(value) {
        this._panel = value;
    }
    get panel() {
        return this._panel;
    }
    get jobStore() {
        return this._jobStore;
    }
    get db() {
        return this._db;
    }
    get buildings() {
        return this._buildings;
    }
    get buildingManager() {
        return this._buildingManager;
    }
    get playerId() {
        return this._playerId;
    }
}
exports.default = Player;
;
//# sourceMappingURL=Player.js.map