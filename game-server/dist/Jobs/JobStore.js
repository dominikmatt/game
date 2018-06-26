"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JobStore {
    constructor(player) {
        this._player = player;
    }
    addJob(job) {
        this._player.db.sadd(`jobs:${job.getType()}`, job.id);
        this._player.db.hset(`job:${job.id}`, '_id', job.id);
        this._player.db.hset(`job:${job.id}`, 'type', job.getType());
        this._player.db.hset(`job:${job.id}`, 'player', this._player.token);
        job.addToDb();
        // Remove job from ram.
        job = null;
    }
    getFreeJobByType(jobType) {
        return new Promise((resolve, reject) => {
            this._player.db.spop(`jobs:${jobType}`)
                .then((id) => {
                const key = `job:${id}`;
                this._player.db.hgetall(key)
                    .then((data) => {
                    resolve(data);
                });
                this._player.db.del(key);
            })
                .catch((error) => {
                throw new Error(error);
            });
        });
    }
    update() {
    }
}
exports.default = JobStore;
//# sourceMappingURL=jobStore.js.map