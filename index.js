// Rng Code

const button = document.getElementById("CoolButton");
const auraSlot = document.getElementById("AuraSlot");
let Debounce = true

const rarities = {
    "Common": 50,
    "Uncommon": 30,
    "Rare": 15,
    "Super Rare": 4,
    "Epic": 0.5,
    "Legendary": 0.3,
    "Mythic": 0.1,
    "Godlike": 0.05,
    "Forgotten": 0.03,
    "Impossible": 0.02,
    "Maddie(RIP)": 0.01,
};

const raritypercentages = {
    "Common": '50% Chance',
    "Uncommon": '30% Chance',
    "Rare": '15% Chance',
    "Super Rare": '4% Chance',
    "Epic": '0.5% Chance',
    "Legendary": '0.3% Chance',
    "Mythic": '0.1% Chance',
    "Godlike": '0.05% Chance',
    "Forgotten": '0.03% Chance',
    "Impossible": '0.02% Chance',
    "Maddie(RIP)": '0.01% Chance',
};

const rarityColors = {
    "Common": "white",
    "Uncommon": "lightgreen",
    "Rare": "lightblue",
    "Super Rare": "yellow",
    "Epic": "orange",
    "Legendary": "gold",
    "Mythic": "red",
    "Godlike": "cyan",
    "Forgotten": "pink",
    "Impossible": "black",
    "Maddie(RIP)": "lightbrown",
};

// Function to roll for a rarity
function rollRarity() {
    const randomNum = Math.random() * 100; // Generate a random number between 0 and 100
    let cumulativeChance = 0;

    for (const rarity in rarities) {
        cumulativeChance += rarities[rarity]; // Add the chance of the current rarity
        if (randomNum <= cumulativeChance) {
            return rarity; // Return the corresponding rarity
        }
    }

    return "No Rarity Found"; // Fallback in case no rarity matches
}

// Create a wait function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Loop with a wait to display multiple rolls
async function loopWithWait() {
    for (let i = 10 + 1; i > 0; i--) {
        let rarity = rollRarity();
        if (auraSlot) {
            auraSlot.style.transform = "scale(1.25)"; // Scale up the size

            auraSlot.style.transition = "transform 0.1s ease-in-out"; // Smooth transition
            await wait(50); // Wait for the transition to complete

            auraSlot.style.textShadow = `3px 3px 5px ${rarityColors[rarity]}`; /* Adds a shadow effect to the text */
            auraSlot.style.color = rarityColors[rarity]; // Change color based on rarity
            auraSlot.style.transform = "scale(1)"; // Scale back to normal size
            auraSlot.innerText = rarity; // Display the rarity in the AuraSlot element
        }
        await wait(100); // Wait for 0.1 second (100 milliseconds)
    }
    let rarity = rollRarity();

    auraSlot.style.transform = "scale(1.35)"; // Scale up the size
    auraSlot.style.transition = "transform 0.1s ease-in-out"; // Smooth transition

    await wait(100); // Wait for the transition to complete

    auraSlot.style.transform = "scale(1)"; // Scale back to normal size
    auraSlot.style.textShadow = `3px 3px 5px ${rarityColors[rarity]}`; /* Adds a shadow effect to the text */
    auraSlot.style.color = rarityColors[rarity]; // Change color based on rarity
    auraSlot.innerText = `You Got: ${rarity}, ${raritypercentages[rarity]}`; // Display the rarity in the AuraSlot element
}

async function Wait() {
    await wait(750);
}
// Add a click event listener to the button
if (button) {
    button.addEventListener("click", function () {
        if (Debounce == false) {
            return; // Prevent multiple clicks if debounce is false
        }
        Debounce = false; // Set debounce to false to prevent multiple clicks
        loopWithWait().then(() => {
            // No need to call wait here
            Wait().then(() => {
                Debounce = true; // Reset debounce to true after the loop finishes
            });
        });
    });
} else {
    console.error("Button element not found!");
}
