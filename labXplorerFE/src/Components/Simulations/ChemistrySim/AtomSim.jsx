// src/AtomSimulator.js
import React, { useState, useEffect } from "react";
import Phaser from "phaser";

const elements = [
  {
    name: "Hydrogen",
    radius: 50,
    color: 0xff0000,
    electrons: [1],
    protons: 1,
    neutrons: 0,
  },
  {
    name: "Helium",
    radius: 70,
    color: 0x00ff00,
    electrons: [2],
    protons: 2,
    neutrons: 2,
  },
  {
    name: "Lithium",
    radius: 90,
    color: 0x0000ff,
    electrons: [2, 1],
    protons: 3,
    neutrons: 4,
  },
  {
    name: "Beryllium",
    radius: 110,
    color: 0xffff00,
    electrons: [2, 2],
    protons: 4,
    neutrons: 5,
  },
  {
    name: "Boron",
    radius: 130,
    color: 0xff00ff,
    electrons: [2, 3],
    protons: 5,
    neutrons: 6,
  },
  {
    name: "Carbon",
    radius: 150,
    color: 0x00ffff,
    electrons: [2, 4],
    protons: 6,
    neutrons: 6,
  },
  {
    name: "Nitrogen",
    radius: 170,
    color: 0x808080,
    electrons: [2, 5],
    protons: 7,
    neutrons: 7,
  },
  {
    name: "Oxygen",
    radius: 190,
    color: 0x800000,
    electrons: [2, 6],
    protons: 8,
    neutrons: 8,
  },
  {
    name: "Fluorine",
    radius: 210,
    color: 0x008000,
    electrons: [2, 7],
    protons: 9,
    neutrons: 10,
  },
  {
    name: "Neon",
    radius: 230,
    color: 0x000080,
    electrons: [2, 8],
    protons: 10,
    neutrons: 10,
  },
  {
    name: "Sodium",
    radius: 250,
    color: 0x800080,
    electrons: [2, 8, 1],
    protons: 11,
    neutrons: 12,
  },
  {
    name: "Magnesium",
    radius: 270,
    color: 0x808000,
    electrons: [2, 8, 2],
    protons: 12,
    neutrons: 12,
  },
  {
    name: "Aluminum",
    radius: 290,
    color: 0xc0c0c0,
    electrons: [2, 8, 3],
    protons: 13,
    neutrons: 14,
  },
  {
    name: "Silicon",
    radius: 310,
    color: 0x800000,
    electrons: [2, 8, 4],
    protons: 14,
    neutrons: 14,
  },
  {
    name: "Phosphorus",
    radius: 330,
    color: 0x008080,
    electrons: [2, 8, 5],
    protons: 15,
    neutrons: 16,
  },
  {
    name: "Sulfur",
    radius: 350,
    color: 0xffc0cb,
    electrons: [2, 8, 6],
    protons: 16,
    neutrons: 16,
  },
  {
    name: "Chlorine",
    radius: 370,
    color: 0x00ff00,
    electrons: [2, 8, 7],
    protons: 17,
    neutrons: 18,
  },
  {
    name: "Argon",
    radius: 390,
    color: 0x0000ff,
    electrons: [2, 8, 8],
    protons: 18,
    neutrons: 22,
  },
  {
    name: "Potassium",
    radius: 410,
    color: 0xff0000,
    electrons: [2, 8, 8, 1],
    protons: 19,
    neutrons: 20,
  },
  {
    name: "Calcium",
    radius: 430,
    color: 0x00ffff,
    electrons: [2, 8, 8, 2],
    protons: 20,
    neutrons: 20,
  },
];

const AtomSimulator = () => {
  const [selectedElement, setSelectedElement] = useState(elements[0]);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    let atomSprites = [];

    function preload() {
      // Load assets if needed
    }

    function create() {
      if (!selectedElement) return;

      // Create nucleus
      this.nucleus = this.add.circle(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        20,
        0xffff00
      ); // Yellow nucleus

      // Display protons and neutrons in the nucleus
      this.protonsText = this.add
        .text(
          this.cameras.main.centerX,
          this.cameras.main.centerY - 10,
          `p${selectedElement.protons || 0}`,
          { fontSize: "16px", fill: "#000000" }
        )
        .setOrigin(0.5);

      this.neutronsText = this.add
        .text(
          this.cameras.main.centerX,
          this.cameras.main.centerY + 10,
          `n${selectedElement.neutrons || 0}`,
          { fontSize: "16px", fill: "#000000" }
        )
        .setOrigin(0.5);

      // Create orbits and atoms based on selected element
      atomSprites = [];
      let orbitRadius = 50;

      selectedElement.electrons.forEach((numElectrons, index) => {
        // Adjust orbit radius for each orbit
        orbitRadius += 50;

        for (let i = 0; i < numElectrons; i++) {
          const angle = ((2 * Math.PI) / numElectrons) * i;
          const x = this.cameras.main.centerX + orbitRadius * Math.cos(angle);
          const y = this.cameras.main.centerY + orbitRadius * Math.sin(angle);
          const atom = this.add.circle(x, y, 10, selectedElement.color);
          atomSprites.push({
            sprite: atom,
            angleOffset: angle,
            radius: orbitRadius,
          });
        }

        // Orbit Paths
        this.add.circle(
          this.cameras.main.centerX,
          this.cameras.main.centerY,
          orbitRadius,
          0xffffff, // White color for the orbit
          0.1 // Light transparency for the orbit
        );
      });

      // Update the atoms every frame
      this.time.addEvent({
        delay: 50,
        callback: updateAtoms,
        callbackScope: this,
        loop: true,
      });
    }

    function updateAtoms() {
      if (!selectedElement) return;

      const time = this.time.now / 1000; // Get time in seconds
      atomSprites.forEach((atom) => {
        const angle = time + atom.angleOffset;
        const x = this.cameras.main.centerX + atom.radius * Math.cos(angle);
        const y = this.cameras.main.centerY + atom.radius * Math.sin(angle);
        atom.sprite.setPosition(x, y);
      });
    }

    function update() {
      // Update logic if needed
    }

    return () => {
      game.destroy(true);
    };
  }, [selectedElement]);

  const handleChange = (event) => {
    const element = elements.find((e) => e.name === event.target.value);
    setSelectedElement(element);
  };

  return (
    <div>
      <div>
      <h1 className='text-center text-2xl p-3 italic'>Atomic Orbital Simulator</h1>
        <label htmlFor="element-select " className="text-xl mb-2">Select Element: </label>
        <select
          id="element-select"
          className="text-xl mb-2"
          onChange={handleChange}
          value={selectedElement?.name || ""}
        >
          {elements.map((element) => (
            <option key={element.name} value={element.name}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
      <div id="phaser-game" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default AtomSimulator;
