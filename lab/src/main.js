// Ensure LabScene.js is loaded before this script runs
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [LabScene], // Reference LabScene directly
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
