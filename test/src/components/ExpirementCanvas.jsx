import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const ExperimentCanvas = ({ setExperimentData, selectedTool }) => {
  const gameRef = useRef(null); // Reference to the Phaser game instance

  useEffect(() => {
    // Only create the Phaser game instance if it doesn't exist
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'phaser-container',
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
      };

      gameRef.current = new Phaser.Game(config);
    }

    function preload() {
      this.load.image('object', 'https://m.media-amazon.com/images/I/61uDkcA4vpL._AC_UF894,1000_QL80_.jpg');
    }

    function create() {
      const self = this;

      self.input.on('pointerdown', function (pointer) {
        if (selectedTool === 'object' || selectedTool === 'text') {
          const object = self.input.hitTestPointer(pointer)[0]; // Check if an object is clicked

          if (object && object instanceof Phaser.GameObjects.Image) {
            self.input.setDraggable(object);
          } else if (selectedTool === 'object') {
            // Create a new object if none is being dragged
            const newObject = self.add.image(pointer.x, pointer.y, 'object').setInteractive();
            newObject.setDisplaySize(100, 100);
            self.input.setDraggable(newObject);

            newObject.on('drag', function (pointer, dragX, dragY) {
              newObject.x = dragX;
              newObject.y = dragY;
            });

            newObject.on('pointerup', function () {
              setExperimentData(prevData => ({
                ...prevData,
                [newObject.getData('id')]: { x: newObject.x, y: newObject.y }
              }));
            });
          }
        }
      });

      self.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        if (selectedTool === 'move' && gameObject instanceof Phaser.GameObjects.Image) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        }
      });

      self.input.on('pointerup', function () {
        // Do nothing specific on pointer up
      });
    }

    function update() {
      // Handle any real-time updates or physics
    }

    return () => {
      // Ensure the game instance is destroyed properly if needed
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [selectedTool, setExperimentData]);

  return <div id="phaser-container" className="flex-1"></div>;
};

export default ExperimentCanvas;
