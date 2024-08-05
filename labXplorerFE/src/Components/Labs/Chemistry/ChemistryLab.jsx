import React, { useEffect } from 'react';
import Phaser from 'phaser';

const ChemistryLab = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.85,
            scene: {
                preload,
                create,
                update
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };

        const game = new Phaser.Game(config);

        function preload() {
            this.load.image('background', '/assets/chemistry/background.jpg');
            this.load.image('beaker', '/assets/chemistry/beaker.png');
            this.load.image('test-tube', '/assets/chemistry/test-tube.png');
        }

        function create() {
            this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

            this.beaker = this.add.image(100, 300, 'beaker').setInteractive();
            this.testTube = this.add.image(300, 300, 'test-tube').setInteractive();

            this.testTubeDropZone = this.add.zone(this.testTube.x, this.testTube.y, this.testTube.width, this.testTube.height)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .setData({ type: 'dropZone' });

            this.add.rectangle(0, 0, this.scale.width, 50, 0x333333).setOrigin(0, 0);
            this.add.text(5, 10, 'LabXplorer Chemistry Lab', {
                font: '32px Playfair Display',
                fontStyle: 'italic',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0, 0);

            this.beaker.setScale(0.5);
            this.testTube.setScale(0.25);

            this.input.setDraggable(this.beaker);
            this.input.setDraggable(this.testTube);

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('drop', (pointer, gameObject, dropZone) => {
                if (gameObject === this.beaker && dropZone === this.testTubeDropZone) {
                    this.mixChemicals();
                }
            });

            this.input.on('dragenter', (pointer, gameObject, dropZone) => {
                if (dropZone === this.testTubeDropZone) {
                    this.testTube.setTint(0x44ff44);
                }
            });

            this.input.on('dragleave', (pointer, gameObject, dropZone) => {
                if (dropZone === this.testTubeDropZone) {
                    this.testTube.clearTint();
                }
            });
        }

        function update() {}

        function mixChemicals() {
            console.log('Mixing chemicals!');
        }

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div>
            <div id="phaser-game-container"></div>
        </div>
    );
}

export default ChemistryLab;
