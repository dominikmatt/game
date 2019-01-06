"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
class Camera {
    constructor(scene, canvas) {
        this.moveState = {
            forward: false,
            left: false,
            backward: false,
            right: false,
        };
        this._changeRotation = false;
        this._canvas = canvas;
        this._camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());
        //Set the ellipsoid around the camera (e.g. your player's size)
        this._camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.bindDOMEvents();
    }
    bindDOMEvents() {
        document.addEventListener('keydown', this.onKeyPressHandler.bind(this));
        document.addEventListener('keyup', this.onKeyUpHandler.bind(this));
        document.addEventListener('mousewheel', this.onMousewheelHandler.bind(this));
        this._canvas.addEventListener('mousemove', this.onMousemoveHandler.bind(this));
    }
    /**
     * Rotates the camera when mouse is moving and the Crontol-Key is pressed.
     */
    onMousemoveHandler(event) {
        if (false === this._changeRotation) {
            return;
        }
        this._camera.rotation.y += event.movementX / 7;
        this._camera.rotation.x += event.movementY / 7;
        if (1.5 < this._camera.rotation.x) {
            this._camera.rotation.x = 1.5;
        }
        else if (0.25 > this._camera.rotation.x) {
            this._camera.rotation.x = 0.25;
        }
    }
    /**
     * Enable rotation control when Control-Key has been pressed.
     */
    onKeyPressHandler(event) {
        if ('Control' === event.key) {
            this._changeRotation = true;
        }
        this.setMoveState(event.key, true);
    }
    /**
     * Disable rotation control when Control-Key has been pressed.
     */
    onKeyUpHandler(event) {
        if ('Control' === event.key) {
            this._changeRotation = false;
        }
        this.setMoveState(event.key, false);
    }
    onMousewheelHandler(event) {
        this.zoomCamera(event.wheelDelta);
    }
    /**
     * Zoom in or out when mousewheel has been wheeled.
     */
    zoomCamera(wheelDelta) {
        if (0 < wheelDelta) {
            this._camera.position.y += 0.5;
        }
        else {
            this._camera.position.y -= 0.5;
        }
        if (2.5 > this._camera.position.y) {
            this._camera.position.y = 2.5;
        }
        else if (20 < this._camera.position.y) {
            this._camera.position.y = 20;
        }
    }
    setMoveState(key, isMoving) {
        switch (key) {
            case 'w':
                this.moveState.forward = isMoving;
                break;
            case 'a':
                this.moveState.left = isMoving;
                break;
            case 's':
                this.moveState.backward = isMoving;
                break;
            case 'd':
                this.moveState.right = isMoving;
                break;
        }
    }
    /**
     * Update camera.
     */
    update() {
        let movement;
        let x = 0;
        let z = 0;
        if (!this.moveState.backward && !this.moveState.forward && !this.moveState.left && !this.moveState.right) {
            return;
        }
        if (this.moveState.right) {
            x = 0.4;
        }
        else if (this.moveState.left) {
            x = -0.4;
        }
        if (this.moveState.forward) {
            z = 0.4;
        }
        else if (this.moveState.backward) {
            z = -0.4;
        }
        movement = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(x, 0, z), BABYLON.Matrix.RotationY(this._camera.rotation.y));
        this._camera.position.addInPlace(movement);
    }
}
exports.default = Camera;
//# sourceMappingURL=Camera.js.map