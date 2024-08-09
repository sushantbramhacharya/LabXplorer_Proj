// src/OhmsLawSimulator.js
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';

const OhmsLawSimulator = () => {
  const [voltage, setVoltage] = useState(5); // Default voltage
  const [resistance, setResistance] = useState(10); // Default resistance
  const gameRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Phaser configuration
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload,
        create,
        update
      }
    };

    // Initialize Phaser game
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Store scene reference
    game.events.on('ready', () => {
      sceneRef.current = game.scene.scenes[0];
    });

    function preload() {
      // Load assets if needed
    }

    function create() {
      // Create graphics object
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(2, 0x0000ff, 1);

      // Draw static elements
      this.graphics.strokeRect(100, 100, 600, 400);

      // Add a bulb (circle) with initial dynamic brightness
      this.bulb = this.add.circle(400, 300, 50, 0xffff00).setOrigin(0.5);

      // Label for the bulb
      this.add.text(370, 280, 'Bulb', { fontSize: '16px', fill: '#ffffff' });

      // Display the voltage, resistance, and current values
      this.voltageText = this.add.text(200, 150, `Voltage (V): ${voltage}V`, { fontSize: '20px', fill: '#ffffff' });
      this.resistanceText = this.add.text(200, 180, `Resistance (R): ${resistance}Ω`, { fontSize: '20px', fill: '#ffffff' });
      this.currentText = this.add.text(200, 210, `Current (I): ${calculateCurrent.call(this)}A`, { fontSize: '20px', fill: '#ffffff' });

      // Store initial values
      this.voltage = voltage;
      this.resistance = resistance;
    }

    function update() {
      if (this.voltage !== undefined && this.resistance !== undefined) {
        // Update bulb brightness
        const current = calculateCurrent.call(this);
        const brightness = Math.min(current / 2, 1); // Adjust this factor as needed
        this.bulb.setAlpha(brightness);

        // Update text values
        this.voltageText.setText(`Voltage (V): ${this.voltage}V`);
        this.resistanceText.setText(`Resistance (R): ${this.resistance}Ω`);
        this.currentText.setText(`Current (I): ${current.toFixed(2)}A`);
      }
    }

    function calculateCurrent() {
      return this.voltage / this.resistance;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  // Update Phaser scene values directly without re-render
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.voltage = voltage;
      sceneRef.current.resistance = resistance;
      sceneRef.current.events.emit('update'); // Trigger Phaser update
    }
  }, [voltage, resistance]);

  return (
    <div>
      <div>
        <label htmlFor="voltage">Voltage (V): </label>
        <input 
          id="voltage" 
          type="number" 
          value={voltage} 
          onChange={(e) => setVoltage(Number(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="resistance">Resistance (R): </label>
        <input 
          id="resistance" 
          type="number" 
          value={resistance} 
          onChange={(e) => setResistance(Number(e.target.value))} 
        />
      </div>
      <div id="phaser-game" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default OhmsLawSimulator;
