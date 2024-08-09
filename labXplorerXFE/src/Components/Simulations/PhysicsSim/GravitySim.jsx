import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GravitySim = () => {
  const gameRef = useRef(null);
  const playerRef = useRef(null);
  const textRef = useRef(null);
  const timerRef = useRef(0); // Timer reference
  const isPausedRef = useRef(true); // Start with the simulation paused

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-game-container",
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game; // Store game instance in ref

    function preload() {
      this.load.image("sky", "/assets/gravity/space.jpg");
      this.load.image("star", "/assets/gravity/star.png");
      this.load.image("ground", "/assets/chemistry/background.jpg");
    }

    function create() {
      // Background
      this.add.image(400, 300, "sky").setScale(3);

      // Platforms
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 968, "ground").setScale(0.3).refreshBody();

      // Player
      const player = this.physics.add.sprite(200, 200, "star").setScale(0.1);
      player.setBounce(0.2); // Optional: add bounce effect
      player.setCollideWorldBounds(true); // Prevents player from leaving the screen

      // Collider between player and ground
      this.physics.add.collider(player, platforms, () => {
        if (!isPausedRef.current) {
          // Pause the timer when touching the ground
          isPausedRef.current = true;
        }
      });

      // Store the player reference for resetting position
      playerRef.current = player;

      // Display gravity, distance, and time text
      const gravityText = this.add.text(
        10,
        10,
        `Gravity: ${(this.physics.world.gravity.y / 100).toFixed(1)} m/s²`,
        { fontSize: "16px", fill: "#ffffff" }
      );
      const distanceText = this.add.text(10, 30, `Distance: 0 m`, {
        fontSize: "16px",
        fill: "#ffffff",
      });
      const timeText = this.add.text(10, 50, `Time: 0 s`, {
        fontSize: "16px",
        fill: "#ffffff",
      }); // Add time text

      // Store text references for updating
      textRef.current = { gravityText, distanceText, timeText };

      // Pause the simulation and player's movement initially
      gameRef.current.scene.pause();
      if (playerRef.current) {
        playerRef.current.body.moves = false; // Pause the player's movement
      }
      // Store the game instance in a global variable for access in event listeners
      window.gameInstance = this;
    }

    function update(time, delta) {
      if (playerRef.current) {
        // Update gravity text
        textRef.current.gravityText.setText(
          `Gravity: ${(this.physics.world.gravity.y / 100).toFixed(1)} m/s²`
        );

        // Calculate and update distance text (in meters)
        const distance = (
          Math.abs(playerRef.current.y - 968 + 523) / 100
        ).toFixed(2);
        textRef.current.distanceText.setText(`Distance: ${distance} m`);

        // Update the timer only if it is not paused
        if (!isPausedRef.current) {
          timerRef.current += delta / 1000; // Convert delta time from milliseconds to seconds
        }
        textRef.current.timeText.setText(
          `Time: ${timerRef.current.toFixed(1)} s`
        );

        // Position the text elements near the star
        textRef.current.gravityText.setPosition(
          playerRef.current.x + 50,
          playerRef.current.y - 20
        );
        textRef.current.distanceText.setPosition(
          playerRef.current.x + 50,
          playerRef.current.y
        );
        textRef.current.timeText.setPosition(
          playerRef.current.x + 50,
          playerRef.current.y + 20
        );
      }
    }

    return () => {
      // Cleanup game instance on component unmount
      game.destroy(true);
    };
  }, []);

  const increaseGravity = () => {
    if (window.gameInstance) {
      window.gameInstance.physics.world.gravity.y += 10;
    }
  };

  const decreaseGravity = () => {
    if (window.gameInstance) {
      window.gameInstance.physics.world.gravity.y = Math.max(
        window.gameInstance.physics.world.gravity.y - 10,
        0
      );
    }
  };

  const resetPosition = () => {
    if (playerRef.current) {
      // Reset player position to initial coordinates
      playerRef.current.setPosition(200, 200);
    }
    // Reset timer and text
    timerRef.current = 0;
    textRef.current.timeText.setText(`Time: 0 s`);
    isPausedRef.current = true; // Pause the timer
    if (gameRef.current) {
      gameRef.current.scene.pause(); // Pause the simulation
      if (playerRef.current) {
        playerRef.current.body.moves = false; // Pause the player's movement
      }
    }
  };

  const pauseSimulation = () => {
    if (gameRef.current) {
      gameRef.current.scene.pause();
      if (playerRef.current) {
        playerRef.current.body.moves = false; // Pause the player's movement
      }
      // Pause the timer
      isPausedRef.current = true;
    }
  };

  const resumeSimulation = () => {
    if (gameRef.current) {
      gameRef.current.scene.resume();
      if (playerRef.current) {
        playerRef.current.body.moves = true; // Resume the player's movement
      }
      // Resume the timer
      isPausedRef.current = false;
    }
  };

  return (
    <div className="overflow-y-auto flex">
      <div id="phaser-game-container"></div>
      <div className="flex flex-col justify-center">
        <button onClick={increaseGravity} style={buttonStyle}>
          Increase Gravity
        </button>
        <button onClick={decreaseGravity} style={buttonStyle}>
          Decrease Gravity
        </button>
        <button onClick={resetPosition} style={buttonStyle}>
          Reset Position
        </button>
        <button onClick={pauseSimulation} style={buttonStyle}>
          Pause
        </button>
        <button onClick={resumeSimulation} style={buttonStyle}>
          Resume
        </button>
      </div>
    </div>
  );
};

// Simple styling for the buttons
const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default GravitySim;
