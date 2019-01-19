import MapStartupInterface from "../../../Interfaces/MapStartup";
import Player from "../../../Player";
import CharacterFactory from "../../../Characters/CharacterFactory";
import BuildingFactory from "../../../Buildings/BuildingFactory";
import Serf from "../../../Characters/types/Serf";
import Storehouse from "../../../Buildings/types/Storehouse";
import Schoolhouse from "../../../Buildings/types/Schoolhouse";

class Player1 implements MapStartupInterface{
    private _player: Player;

    public constructor() {

    }

    public placeHouses() {
        this._player.addCharacter(CharacterFactory('serf', 'start', this._player));
        const storehouse: Storehouse = this._player.addBuilding(BuildingFactory('storehouse', {x: 8, z: 3}, this._player, true));

        this._player.addBuilding(BuildingFactory('schoolhouse', {x: 8, z: 8}, this._player, true));

        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
        });
    }

    set player(value: Player) {
        this._player = value;
    }
};

class Player2 implements MapStartupInterface{
    private _player: Player;

    public constructor() {

    }

    public placeHouses() {
        this._player.addCharacter(CharacterFactory('serf', 'start', this._player));
        const storehouse: Storehouse = this._player.addBuilding(BuildingFactory('storehouse', {x: 90, z: 3}, this._player, true));

        this._player.addBuilding(BuildingFactory('schoolhouse', {x: 90, z: 8}, this._player, true));

        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
        });
    }
    set player(value: Player) {
        this._player = value;
    }
};

module.exports = [
    new Player1(),
    new Player2()
];