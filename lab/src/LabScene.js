class LabScene extends Phaser.Scene {
    constructor() {
        super('LabScene');
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('beaker', 'assets/beaker.png');
        this.load.image('test-tube', 'assets/test-tube.png');
    }

    create() {


        this.add.image(400, 300, 'background');

        this.add.rectangle(0, 0, 800, 50, 0x333333).setOrigin(0, 0); // Dark background for the top bar
        this.add.text(10, 25, 'LabXplorer Chemistry Lab', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0, 0.5); // Center the text in the top bar

        this.beaker = this.add.image(100, 300, 'beaker').setInteractive();
        this.testTube = this.add.image(200, 300, 'test-tube').setInteractive();


        this.beaker.setScale(0.5)
        this.testTube.setScale(0.4)


        this.input.setDraggable(this.beaker);
        this.input.setDraggable(this.testTube);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject === this.beaker && dropZone === this.testTube) {
                this.mixChemicals();
            }
        });
    }

    mixChemicals() {
        console.log('Mixing chemicals!');
    }
}
