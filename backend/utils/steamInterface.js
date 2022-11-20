const axios = require('axios');
const fs = require('fs');
const {ItemClass, IconClass, UnitClass} = require("./objects");

async function fetchInventory(steamID, currentInventory, currentUnits, user) {
    let res;
    try {
        res = await axios.get(`https://steamcommunity.com/inventory/${steamID}/730/2?l=english&count=5000`);

        // isolate useful data from assets
        let assets = res.data.assets.map(a => Object.assign({}, {
            amount: parseInt(a.amount),
            classID: a.classid
        }));

        // isolate useful data from descriptions
        let descriptions = res.data.descriptions.map(d => Object.assign({}, {
            classID: d.classid,
            name: d.market_hash_name,
            marketable: d.marketable,
            icon: d.icon_url,
            unit: d.fraudwarnings,
            type: d.type
        }));

        // natural join assets and descriptions
        res = assets.map(a => {
            let desc = descriptions.filter(d => d.classID === a.classID)[0];
            return Object.assign({}, desc, a);
        });

        // reduce items by amount
        res = res.map(r => {
            let duplicates = res.filter(item => item.name === r.name);
            if (duplicates[0].name === "Storage Unit") {
                r.unit = r.unit[0].split("'")[2];
                return r;
            }
            if (duplicates.length === 1) {
                return r;
            }
            return Object.assign({}, {
                name: r.name,
                marketable: r.marketable,
                amount: duplicates.reduce((acc, d) => acc + d.amount, 0),
                icon: r.icon
            });
        });
        let unitNames = res.filter(r => r.name === "Storage Unit").map(r => r.unit);
        unitNames = incrementDuplicates(unitNames);

        res = removeDuplicateObjects(res);

        // filter marketable items
        let newInventory = res.filter(r => r.marketable === 1);

        // unmarketable Items / collectibles
        let collectibles = res.filter(r => r.marketable === 0).filter(r => r.type !== undefined).filter(r => r.type.includes("Collectible"));

        // find Items no longer in Inventory
        let missingItems = currentInventory.filter(item => newInventory.filter(i => item.name === i.name).length === 0);
        let missingUnits = currentUnits.filter(item => unitNames.filter(i => item.name === i).length === 0);

        const items = newInventory.map(item => new ItemClass(item.name, item.amount, null, "Inventory", user));
        const icons = newInventory.map(item => new IconClass(item.name, item.icon));
        collectibles.forEach(item => {
            items.push(new ItemClass(item.name, null, null, "Collectible", user));
            icons.push(new IconClass(item.name, item.icon));
        });
        unitNames = unitNames.map(unit => new UnitClass(unit, user));
        return {
            items: items,
            icons: icons,
            units: unitNames,
            // collectibles: collectibles,
            deleteItems: missingItems,
            deleteUnits: missingUnits,
        }
    } catch (error) {
        return { success: false, error: error };
    }
}

function incrementDuplicates(array) {
    let map = {};
    let count = array.map(function(val) {
        return map[val] = (typeof map[val] === "undefined") ? 1 : map[val] + 1;
    });

    return array.map(function(val, index) {
        if (map[val] === 1) {
            return val;
        } else {
            return val + ' (' + count[index] + ')';
        }
    });
}

function removeDuplicateObjects(array) {
    // Source: https://stackoverflow.com/a/55866155
    return [...new Set(array.map(s => JSON.stringify(s)))].map(s => JSON.parse(s));
}

function removeDuplicatedByProperty(array, prop) {
    // Source: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
    // made some formatting changes and variable property
    return Array.from(new Set(array.map(a => a[prop]))).map(name => array.find(a => a[prop] === name))
}

function SteamProfileURL(steamID) {
    return `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamID}`
}

module.exports = {
    fetchInventory,
    removeDuplicateObjects,
    removeDuplicatedByProperty,
    SteamProfileURL
}