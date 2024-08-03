import React,{useEffect} from 'react'

const ChemistryLab = () => {
    useEffect(() => {
        // Phaser game configuration
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container', // Ensure this ID matches your container
            width: window.innerWidth*0.5,
            height: window.innerHeight*0.85,
            scene: {
                preload,
                create,
                update
            },
            scale: {
                mode: Phaser.Scale.RESIZE, // Enable dynamic resizing
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

        // Create the Phaser game instance
        const game = new Phaser.Game(config);

        // Define the scene methods
        function preload() {
            this.load.image('background', '../assets/chemistry/background.jpg');
            this.load.image('beaker', '../assets/chemistry/beaker.png');
            this.load.image('test-tube', '../assets/chemistry/test-tube.png');
        }

        function create() {
            // Add background
            this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

            // Add interactive game objects
            this.beaker = this.add.image(100, 300, 'beaker').setInteractive();
            this.testTube = this.add.image(300, 300, 'test-tube').setInteractive();

            this.add.rectangle(0, 0, this.scale.width, 50, 0x333333).setOrigin(0, 0); // Dark background for the top bar
            this.add.text(5, 10, 'LabXplorer Chemistry Lab', {
                font: '32px Playfair Display', // Use the font family name you specified
                fontStyle: 'italic', // Make text italic
                fill: '#ffffff', // Text color
                stroke: '#000000', // Optional: text stroke for extra styling
                strokeThickness: 2 // Optional: stroke thickness
            }).setOrigin(0, 0);

            this.beaker.setScale(0.5);
            this.testTube.setScale(0.25);

            // Enable dragging
            this.input.setDraggable(this.beaker);
            this.input.setDraggable(this.testTube);

            // Handle dragging
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            // Handle dropping
            this.input.on('drop', (pointer, gameObject, dropZone) => {
                if (gameObject === this.beaker && dropZone === this.testTube) {
                    this.mixChemicals();
                }
            });
        }

        function update() {
            // Update logic
        }

        function mixChemicals() {
            console.log('Mixing chemicals!');
        }

        // Cleanup the game instance when the component is unmounted
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
export default ChemistryLab