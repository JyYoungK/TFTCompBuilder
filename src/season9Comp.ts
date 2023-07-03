import { Season9TeamComp } from "./type";

export const season9ChampionList = [
  "Aatrox",
  "Ahri",
  "Akshan",
  "Aphelios",
  "Ashe",
  "Azir",
  "Belveth",
  "Cassiopeia",
  "Chogath",
  "Darius",
  "Ekko",
  "Galio",
  "Garen",
  "Gwen",
  "Heimerdinger",
  "Irelia",
  "Jarvan",
  "Jayce",
  "Jhin",
  "Jinx",
  "Kaisa",
  "Kalista",
  "Karma",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kled",
  "KSante",
  "Lissandra",
  "Lux",
  "Malzahar",
  "Maokai",
  "Nasus",
  "Poppy",
  "Renekton",
  "RekSai",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Sett",
  "Shen",
  "Sion",
  "Sona",
  "Soraka",
  "Swain",
  "Taliyah",
  "Taric",
  "Teemo",
  "Tristana",
  "Urgot",
  "Velkoz",
  "Viego",
  "Vi",
  "Warwick",
  "Yasuo",
  "Zed",
  "Zeri",
];

export const season9TeamCompData: Season9TeamComp[] = [
  {
    name: "Challengers",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Irelia", item: [] },
      { name: "Samira", item: [] },
      { name: "Warwick", item: [] },
      {
        name: "Kalista",
        item: ["GiantSlayer", "GuinsoosRageblade", "StatikkShiv"],
      },
      { name: "Kaisa", item: [] },
      { name: "Shen", item: [] },
      {
        name: "Yasuo",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      { name: "Aatrox", item: [] },
    ],
  },
  {
    name: "Warwick Juggernaut",
    tier: "S",
    speed: "Roll at 6 (Early Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Irelia", item: [] },
      { name: "Samira", item: [] },
      {
        name: "Warwick",
        item: ["GuinsoosRageblade", "Bloodthirster", "Quicksilver"],
      },
      {
        name: "Garen",
        item: [],
      },
      { name: "Darius", item: [] },
      { name: "Kaisa", item: ["ArchangelsStaff", "StatikkShiv"] },
      {
        name: "Yasuo",
        item: ["JuggernautEmblem"],
      },
      { name: "Aatrox", item: [] },
    ],
  },
  {
    name: "Ionian Challengers",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Irelia", item: [] },
      { name: "Sett", item: [] },
      { name: "Warwick", item: [] },
      { name: "Karma", item: [] },
      { name: "Kaisa", item: [] },
      {
        name: "Shen",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      {
        name: "Yasuo",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      { name: "Ahri", item: [] },
    ],
  },
  {
    name: "Challengers + Shadow",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Irelia", item: [] },
      { name: "Samira", item: [] },
      { name: "Warwick", item: [] },
      { name: "Kalista", item: [] },
      { name: "Kaisa", item: [] },
      { name: "Shen", item: [] },
      {
        name: "Yasuo",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      {
        name: "Gwen",
        item: ["HextechGunblade", "BlueBuff", "JeweledGauntlet"],
      },
    ],
  },
  {
    name: "Shadow Yasuo",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Irelia", item: [] },
      { name: "Maokai", item: [] },
      {
        name: "Kalista",
        item: ["JeweledGauntlet", "GuinsoosRageblade", "ArchangelsStaff"],
      },
      {
        name: "Gwen",
        item: [],
      },
      { name: "Kaisa", item: ["ZekesHerald", "ZekesHerald"] },
      { name: "Shen", item: [] },
      {
        name: "Yasuo",
        item: ["Bloodthirster", "TitansResolve", "ShadowisleEmblem"],
      },
      {
        name: "Ryze",
        item: [],
      },
    ],
  },
  {
    name: "Void",
    tier: "S",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Chogath", item: [] },
      {
        name: "Malzahar",
        item: [],
      },
      {
        name: "Kassadin",
        item: [],
      },
      { name: "RekSai", item: [] },
      { name: "Velkoz", item: [] },
      {
        name: "Kaisa",
        item: ["GuinsoosRageblade", "JeweledGauntlet", "HextechGunblade"],
      },
      {
        name: "Yasuo",
        item: ["VoidEmblem"],
      },
      {
        name: "Belveth",
        item: ["Bloodthirster", "InfinityEdge", "TitansResolve"],
      },
    ],
  },
  {
    name: "6 Ionia",
    tier: "A",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 1,
    loss: 1,
    champions: [
      { name: "Jhin", item: [] },
      { name: "Irelia", item: [] },
      { name: "Sett", item: [] },
      { name: "Taric", item: [] },
      {
        name: "Aphelios",
        item: ["GuinsoosRageblade", "LastWhisper"],
      },
      { name: "Shen", item: [] },
      {
        name: "Yasuo",
        item: ["Bloodthirster", "EdgeofNight", "TitansResolve"],
      },
      {
        name: "Ahri",
        item: ["ArchangelsStaff", "BlueBuff"],
      },
    ],
  },
  {
    name: "Invokers",
    tier: "B",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 2,
    champions: [
      { name: "Galio", item: [] },
      { name: "Soraka", item: [] },
      {
        name: "Lissandra",
        item: [],
      },
      { name: "Taric", item: ["Redemption", "IonicSpark", "WarmogsArmor"] },
      {
        name: "Karma",
        item: ["HextechGunblade", "JeweledGauntlet", "GiantSlayer"],
      },
      { name: "Shen", item: [] },
      { name: "Ryze", item: [] },
      { name: "Ahri", item: [] },
    ],
  },
  {
    name: "DeadEye",
    tier: "S",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      { name: "Ashe", item: [] },
      { name: "Akshan", item: [] },
      {
        name: "Lissandra",
        item: [],
      },
      { name: "Taric", item: [] },
      {
        name: "Sejuani",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      { name: "Shen", item: [] },
      {
        name: "Aphelios",
        item: ["GiantSlayer", "GuinsoosRageblade", "InfinityEdge"],
      },
      { name: "Urgot", item: [] },
    ],
  },
  {
    name: "Zeri",
    tier: "S",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 2,
    champions: [
      { name: "Jinx", item: [] },
      { name: "Jayce", item: [] },
      {
        name: "Lissandra",
        item: [],
      },
      {
        name: "Zeri",
        item: ["GiantSlayer", "GuinsoosRageblade", "InfinityEdge"],
      },
      {
        name: "Sejuani",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      { name: "Shen", item: [] },
      { name: "Senna", item: [] },
      { name: "Sion", item: [] },
    ],
  },
  {
    name: "Yordle Gunner",
    tier: "S",
    speed: "Roll at 6 (Early Game Comp)",
    position: "jpg location",
    win: 3,
    loss: 0,
    champions: [
      { name: "Poppy", item: [] },
      {
        name: "Tristana",
        item: ["GiantSlayer", "HextechGunblade", "LastWhisper"],
      },
      {
        name: "Maokai",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      { name: "Viego", item: [] },
      { name: "Jinx", item: [] },
      { name: "Jayce", item: [] },
      { name: "Zeri", item: [] },
      {
        name: "Heimerdinger",
        item: [],
      },
    ],
  },
  {
    name: "5 Yordles",
    tier: "A",
    speed: "Roll at 6 (Early Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      {
        name: "Poppy",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      {
        name: "Tristana",
        item: ["GiantSlayer", "HextechGunblade", "LastWhisper"],
      },
      { name: "Kled", item: [] },
      { name: "Teemo", item: [] },
      { name: "Sona", item: [] },
      { name: "Jarvan", item: [] },
      { name: "Shen", item: [] },
      {
        name: "Heimerdinger",
        item: [],
      },
    ],
  },
  {
    name: "Shadow Isle",
    tier: "A",
    speed: "Roll at 6 (Early Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Maokai",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      {
        name: "Viego",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      { name: "Zed", item: [] },
      { name: "Ekko", item: [] },
      { name: "Kalista", item: [] },
      {
        name: "Katarina",
        item: [],
      },
      { name: "Gwen", item: [] },
    ],
  },
  {
    name: "Shadow Isle 2",
    tier: "A",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Maokai", item: [] },
      { name: "Viego", item: [] },
      { name: "Zed", item: [] },
      { name: "Kled", item: [] },
      {
        name: "Gwen",
        item: ["HextechGunblade", "BlueBuff", "JeweledGauntlet"],
      },
      {
        name: "Aatrox",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      { name: "KSante", item: [] },
      { name: "Senna", item: [] },
    ],
  },
  {
    name: "Multicaster",
    tier: "S",
    speed: "Roll at 6 (Early Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Poppy",
        item: [],
      },
      { name: "Kled", item: [] },
      { name: "Taliyah", item: [] },
      {
        name: "Teemo",
        item: ["JeweledGauntlet", "HextechGunblade", "BlueBuff"],
      },
      { name: "Swain", item: ["Redemption", "SunfireCape", "WarmogsArmor"] },
      { name: "Galio", item: [] },
      { name: "Velkoz", item: [] },
      { name: "Sona", item: [] },
    ],
  },
  {
    name: "Strategist",
    tier: "B",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      { name: "Taliyah", item: [] },
      { name: "Teemo", item: [] },
      { name: "Swain", item: [] },
      { name: "Garen", item: [] },
      {
        name: "Azir",
        item: ["GuinsoosRageblade", "StatikkShiv", "JeweledGauntlet"],
      },
      { name: "Jarvan", item: [] },
      {
        name: "Nasus",
        item: ["Redemption", "SunfireCape", "WarmogsArmor"],
      },
      { name: "Lux", item: [] },
    ],
  },
  {
    name: "Shurima + Sorcerer",
    tier: "B",
    speed: "Roll at 8 (Late Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Teemo",
        item: [],
      },
      {
        name: "Swain",
        item: [],
      },
      { name: "Garen", item: [] },
      { name: "Lux", item: [] },
      {
        name: "Azir",
        item: ["Guardbreaker", "StatikkShiv", "JeweledGauntlet"],
      },
      { name: "Jarvan", item: [] },
      { name: "Nasus", item: ["Redemption", "SunfireCape", "WarmogsArmor"] },
      { name: "KSante", item: [] },
    ],
  },
  {
    name: "6 Shurima",
    tier: "B",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Renekton",
        item: [],
      },
      {
        name: "Cassiopeia",
        item: [],
      },
      { name: "Taliyah", item: [] },
      { name: "Akshan", item: [] },
      {
        name: "Azir",
        item: ["GuinsoosRageblade", "StatikkShiv", "JeweledGauntlet"],
      },
      { name: "Jarvan", item: [] },
      { name: "Nasus", item: ["Redemption", "SunfireCape", "WarmogsArmor"] },
      { name: "KSante", item: [] },
    ],
  },
  {
    name: "6 Sorcerers",
    tier: "A",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Malzahar",
        item: [],
      },
      { name: "Sona", item: [] },
      { name: "Swain", item: [] },
      { name: "Taric", item: ["Redemption", "IonicSpark", "WarmogsArmor"] },
      { name: "Velkoz", item: [] },
      { name: "Jarvan", item: [] },
      { name: "Lux", item: ["JeweledGauntlet", "BlueBuff", "GiantSlayer"] },
      { name: "Ahri", item: [] },
    ],
  },
  {
    name: "8 Sorcerers",
    tier: "A",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 0,
    loss: 0,
    champions: [
      {
        name: "Malzahar",
        item: [],
      },
      { name: "Orianna", item: [] },
      { name: "Swain", item: [] },
      { name: "Taric", item: [] },
      { name: "Velkoz", item: [] },
      { name: "Jarvan", item: ["SorcererEmblem", "WarmogsArmor"] },
      {
        name: "Lux",
        item: ["JeweledGauntlet", "ArchangelsStaff", "HextechGunblade"],
      },
      { name: "Ahri", item: ["JeweledGauntlet", "BlueBuff"] },
    ],
  },
  {
    name: "Garen Reroll",
    tier: "A",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      { name: "Warwick", item: [] },
      { name: "Sett", item: [] },
      { name: "Sona", item: [] },
      { name: "Garen", item: ["GuinsoosRageblade", "Bloodthirster"] },
      { name: "Darius", item: ["ZekesHerald", "ZekesHerald", "ZekesHerald"] },
      { name: "Jarvan", item: ["ZekesHerald", "ZekesHerald", "ZekesHerald"] },
      { name: "Nasus", item: [] },
      { name: "Aatrox", item: [] },
    ],
  },
  {
    name: "6 Noxus",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      {
        name: "Cassiopeia",
        item: [],
      },
      { name: "Swain", item: [] },
      { name: "Kled", item: [] },
      { name: "Ekko", item: [] },
      {
        name: "Katarina",
        item: ["JeweledGauntlet", "IonicSpark", "HandofJustice"],
      },
      {
        name: "Darius",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      { name: "Sion", item: [] },
      { name: "Aatrox", item: [] },
    ],
  },
  {
    name: "Noxus + Shurima",
    tier: "A",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      {
        name: "Cassiopeia",
        item: [],
      },
      { name: "Swain", item: [] },
      { name: "Kled", item: [] },
      {
        name: "Katarina",
        item: ["JeweledGauntlet", "IonicSpark", "HandofJustice"],
      },
      {
        name: "Darius",
        item: ["InfinityEdge", "Bloodthirster", "TitansResolve"],
      },
      { name: "Azir", item: [] },
      { name: "Nasus", item: [] },
      { name: "Sion", item: [] },
    ],
  },
  {
    name: "Rogue Slayers",
    tier: "A",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      { name: "Kayle", item: [] },
      { name: "Viego", item: [] },
      { name: "Zed", item: ["InfinityEdge", "Bloodthirster", "TitansResolve"] },
      { name: "Kled", item: [] },
      { name: "Ekko", item: [] },
      {
        name: "Katarina",
        item: ["JeweledGauntlet", "HandofJustice", "SlayerEmblem"],
      },
      { name: "Gwen", item: [] },
      { name: "Aatrox", item: [] },
    ],
  },
  {
    name: "Ekko",
    tier: "S",
    speed: "Roll at 7 (Mid Game Comp)",
    position: "jpg location",
    win: 2,
    loss: 0,
    champions: [
      { name: "Ashe", item: [] },
      {
        name: "Lissandra",
        item: [],
      },
      {
        name: "Ekko",
        item: ["HandofJustice", "HandofJustice", "JeweledGauntlet"],
      },
      {
        name: "Katarina",
        item: ["JeweledGauntlet", "IonicSpark", "HandofJustice"],
      },
      { name: "Urgot", item: [] },
      { name: "Sejuani", item: [] },
      { name: "Sion", item: [] },
    ],
  },
];
