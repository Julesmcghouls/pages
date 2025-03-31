function searchMonster(monsterIndex) {
    monsterResult.innerHTML = "<p>Searching...</p>";

    axios.get(`https://www.dnd5eapi.co/api/monsters/${monsterIndex}`)
        .then((response) => {
            const monsterData = response.data;

            let armorClass = monsterData.armor_class.map(ac => `${ac.type}: ${ac.value}`).join(", ");
            let speed = Object.entries(monsterData.speed).map(([key, value]) => `${key}: ${value}`).join(", ");
            let proficiencies = monsterData.proficiencies.map(prof => `<li>${prof.proficiency.name}: +${prof.value}</li>`).join("");
            let damageVulnerabilities = monsterData.damage_vulnerabilities.length ? monsterData.damage_vulnerabilities.join(", ") : "None";
            let damageResistances = monsterData.damage_resistances.length ? monsterData.damage_resistances.join(", ") : "None";
            let damageImmunities = monsterData.damage_immunities.length ? monsterData.damage_immunities.join(", ") : "None";
            let conditionImmunities = monsterData.condition_immunities.length ? monsterData.condition_immunities.map(ci => ci.name).join(", ") : "None";

            let actions = monsterData.actions ? monsterData.actions.map(action => `
                <li><strong>${action.name}:</strong> ${action.desc}</li>
            `).join("") : "<li>None</li>";

            let specialAbilities = monsterData.special_abilities ? monsterData.special_abilities.map(ability => `
                <li><strong>${ability.name}:</strong> ${ability.desc}</li>
            `).join("") : "<li>None</li>";

            let output = `
                <div class="monster-card">
                    <h2>${monsterData.name}</h2>
                    <p><strong>Size:</strong> ${monsterData.size}</p>
                    <p><strong>Type:</strong> ${monsterData.type}</p>
                    <p><strong>Alignment:</strong> ${monsterData.alignment}</p>
                    <p><strong>Armor Class:</strong> ${armorClass}</p>
                    <p><strong>Hit Points:</strong> ${monsterData.hit_points} (${monsterData.hit_points_roll})</p>
                    <p><strong>Hit Dice:</strong> ${monsterData.hit_dice}</p>
                    <p><strong>Speed:</strong> ${speed}</p>

                    <h3>Abilities</h3>
                    <ul class="stat-list">
                        <li>STR: ${monsterData.strength}</li>
                        <li>DEX: ${monsterData.dexterity}</li>
                        <li>CON: ${monsterData.constitution}</li>
                        <li>INT: ${monsterData.intelligence}</li>
                        <li>WIS: ${monsterData.wisdom}</li>
                        <li>CHA: ${monsterData.charisma}</li>
                    </ul>

                    <h3>Saving Throws & Proficiencies</h3>
                    <ul>${proficiencies}</ul>

                    <h3>Damage & Condition Info</h3>
                    <p><strong>Vulnerabilities:</strong> ${damageVulnerabilities}</p>
                    <p><strong>Resistances:</strong> ${damageResistances}</p>
                    <p><strong>Immunities:</strong> ${damageImmunities}</p>
                    <p><strong>Condition Immunities:</strong> ${conditionImmunities}</p>

                    <h3>Actions</h3>
                    <ul>${actions}</ul>

                    <h3>Special Abilities</h3>
                    <ul>${specialAbilities}</ul>
                </div>
            `;
            monsterResult.innerHTML = output;
        })
        .catch(() => {
            monsterResult.innerHTML = "<p>Monster not found.</p>";
        });
}
