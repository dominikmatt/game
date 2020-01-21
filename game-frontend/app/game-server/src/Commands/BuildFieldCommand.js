"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Field_1 = require("../Field/Field");
/**
 * This command is executed when a player builds a new building.
 */
class BuildFieldCommand extends Command_1.default {
    getCommand() {
        return 'field.create';
    }
    execute(req) {
        // TOD: Create Building store.
        this.player.addField(new Field_1.default({
            position: {
                x: parseInt(req.position.x),
                z: parseInt(req.position.z)
            }
        }, this.player));
    }
}
exports.default = BuildFieldCommand;
//# sourceMappingURL=BuildFieldCommand.js.map