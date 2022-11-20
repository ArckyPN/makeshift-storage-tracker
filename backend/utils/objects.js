function PriceClass(name, price, previousPrice) {
    this.name = name;
    this.price = price;
    this.previousPrice = previousPrice;
}

function ItemClass(name, quantity, buyPrice, unit, user) {
    this.name = name;
    this.quantity = quantity;
    this.buyPrice = buyPrice;
    this.unit = unit;
    this.user = user;
}

function IconClass(name, icon) {
    this.name = name;
    this.icon = icon;
}

function UnitClass(name, user) {
    this.name = name;
    this.user = user;
}

function SortieClass(user) {
    this.user = user;
    this.types = [
        {
            name: "Anasa Ayatan",
            amount: 0,
            rarity: "Common",
            subtypes: undefined
        },
        {
            name: "Riven Mod",
            amount: 0,
            rarity: "Common",
            subtypes: [
                {
                    name: "Kitgun",
                    amount: 0
                },
                {
                    name: "Melee",
                    amount: 0
                },
                {
                    name: "Pistol",
                    amount: 0
                },
                {
                    name: "Rifle",
                    amount: 0
                },
                {
                    name: "Shotgun",
                    amount: 0
                },
                {
                    name: "Zaw",
                    amount: 0
                }
            ]
        },
        {
            name: "4k Endo",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "Focus Lens",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "6k Kuva",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "3d Booster",
            amount: 0,
            rarity: "Uncommon",
            subtypes: [
                {
                    name: "Affinity",
                    amount: 0
                },
                {
                    name: "Credits",
                    amount: 0
                },
                {
                    name: "Mod",
                    amount: 0
                },
                {
                    name: "Resource",
                    amount: 0
                },
                {
                    name: "Resource Drop",
                    amount: 0
                }
            ]
        },
        {
            name: "Greater Lens",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "Warframe Exilus",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Forma",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Orokin Catalyst",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Orokin Reactor",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Legendary Core",
            amount: 0,
            rarity: "Legendary",
            subtypes: undefined
        }
    ]
}

function ArchonClass(user) {
    this.user = user;
    this.types = [
        {
            name: "Archon Shard",
            amount: 0,
            rarity: "Guaranteed",
            subtypes: [
                {
                    name: "Normal",
                    amount: 0
                },
                {
                    name: "Tauforged",
                    amount: 0
                }
            ]
        },
        {
            name: "Anasa Ayatan",
            amount: 0,
            rarity: "Common",
            subtypes: undefined
        },
        {
            name: "Riven Mod",
            amount: 0,
            rarity: "Common",
            subtypes: [
                {
                    name: "Kitgun",
                    amount: 0
                },
                {
                    name: "Melee",
                    amount: 0
                },
                {
                    name: "Pistol",
                    amount: 0
                },
                {
                    name: "Rifle",
                    amount: 0
                },
                {
                    name: "Shotgun",
                    amount: 0
                },
                {
                    name: "Zaw",
                    amount: 0
                }
            ]
        },
        {
            name: "8k Endo",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "12k Kuva",
            amount: 0,
            rarity: "Uncommon",
            subtypes: undefined
        },
        {
            name: "3d Booster",
            amount: 0,
            rarity: "Uncommon",
            subtypes: [
                {
                    name: "Affinity",
                    amount: 0
                },
                {
                    name: "Mod",
                    amount: 0
                },
                {
                    name: "Resource Drop",
                    amount: 0
                }
            ]
        },
        {
            name: "Warframe Exilus",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "3x Forma",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Orokin Catalyst",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Orokin Reactor",
            amount: 0,
            rarity: "Rare",
            subtypes: undefined
        },
        {
            name: "Legendary Core",
            amount: 0,
            rarity: "Legendary",
            subtypes: undefined
        }
    ]
}

module.exports = {
    PriceClass,
    ItemClass,
    IconClass,
    UnitClass,
    SortieClass,
    ArchonClass,
}