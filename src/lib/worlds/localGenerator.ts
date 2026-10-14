import { WorldBlueprintSchema, type WorldBlueprint } from "@/lib/ai/worldSchema";

const pick = <T,>(items:T[], random:()=>number) => items[Math.floor(random()*items.length)];

function seededRandom(source:string){
  let seed=2166136261;
  for(const character of source){seed^=character.charCodeAt(0);seed=Math.imul(seed,16777619)}
  return ()=>{seed+=0x6d2b79f5;let value=seed;value=Math.imul(value^(value>>>15),value|1);value^=value+Math.imul(value^(value>>>7),value|61);return((value^(value>>>14))>>>0)/4294967296};
}

export function generateLocalWorld(prompt:string):WorldBlueprint{
  const normalized=prompt.trim();
  const text=normalized.toLowerCase();
  const random=seededRandom(text);
  const isFloating=/float|sky|cloud|air|悬浮|浮空|天空|云/.test(text);
  const isOcean=/ocean|sea|island|water|海|岛|水/.test(text);
  const isDesert=/desert|sand|荒漠|沙漠/.test(text);
  const isFrozen=/ice|snow|frost|冰|雪|寒/.test(text);
  const isCyber=/cyber|neon|robot|ai|赛博|霓虹|机器人|人工智能/.test(text);
  const isPeaceful=/peace|harmony|serene|和平|和谐|宁静/.test(text);
  const coverImage=isCyber?"/assets/orbit/neo-tokyo-x.jpg":isDesert?"/assets/orbit/red-desert.jpg":isFrozen?"/assets/orbit/frost-haven.jpg":isFloating?"/assets/orbit/sakura-cloud.jpg":isOcean?"/assets/orbit/star-harbor.jpg":"/assets/orbit/eternal-forest.jpg";
  const terrain=isFloating?"Floating archipelagos above an endless cloud sea":isOcean?"Oceanic island chains divided by luminous currents":isDesert?"Wind-carved mesas surrounding buried crystal basins":isFrozen?"Glacial valleys beneath aurora-lit mountain ranges":pick(["Terraced emerald highlands","Bioluminescent river valleys","Ancient volcanic plateaus","Mist-covered forest continents"],random);
  const biome=isFloating?"Sky archipelago":isOcean?"Pelagic islands":isDesert?"Crystal desert":isFrozen?"Aurora tundra":pick(["Celestial rainforest","Temperate dreamlands","Luminous wetlands","Verdant highlands"],random);
  const climate=isFloating?"Cool, bright and wind-swept":isOcean?"Warm maritime":isDesert?"Arid days and cold nights":isFrozen?"Polar with gentle aurora storms":pick(["Eternal spring","Warm monsoon","Mild seasonal","Soft twilight"],random);
  const civilization=isCyber?"A distributed synthetic-human commonwealth":isPeaceful?"A cooperative council of artisan cities":pick(["A guild federation of explorers","An ecological city-state network","A scholarly astral republic","A nomadic alliance of skyfarers"],random);
  const prefixes=["Aether","Nova","Elysian","Lumina","Astral","Solara","Verdant","Celestia"];
  const suffixes=isFloating?["Reach","Haven","Cloud","Spire"]:isOcean?["Tide","Atoll","Harbor","Azure"]:isDesert?["Dune","Crown","Mirage","Sands"]:isFrozen?["Frost","Glade","Crown","Veil"]:["Prime","Vale","Nexus","Bloom"];
  const worldName=`${pick(prefixes,random)} ${pick(suffixes,random)}`;
  const resources=isFloating?["Cloud crystal","Solar silk","Condensed aether","Skywood"]:isOcean?["Tidal energy","Pearlstone","Kelp fiber","Fresh water"]:isDesert?["Sunstone","Glass ore","Deep aquifers","Spice moss"]:isFrozen?["Aurora ice","Geothermal steam","Star iron","Frost lichen"]:["Living stone","Solar energy","Medicinal flora","Crystal water"];
  const rules=[
    isPeaceful?"Conflicts are resolved by rotating citizen assemblies.":"Every settlement contributes knowledge to the shared world archive.",
    isFloating?"Gravity currents shift with the twin moons and define all travel routes.":isOcean?"No city may interrupt the migration paths of the great sea creatures.":"Construction must leave the world's living terrain able to regenerate.",
    isCyber?"Synthetic minds and organic citizens hold equal civic status.":"Resources are stewarded collectively and replenished before expansion.",
  ];
  const initialEvents=[
    `The first explorers discover ${pick(resources,random).toLowerCase()} beneath the capital.`,
    isFloating?"A new gravity current links three islands that have been separated for centuries.":"A rare celestial alignment reveals an unexplored region beyond the mapped frontier.",
    `${civilization} begins construction of a new research sanctuary.`,
  ];
  return WorldBlueprintSchema.parse({
    worldName,
    description:`Born from “${normalized}”, ${worldName} is a ${biome.toLowerCase()} shaped by ${terrain.toLowerCase()}. Its people have learned to thrive through cooperation, exploration, and careful stewardship of their environment.`,
    coverImage,biome,terrain,climate,civilization,
    technologyLevel:isCyber?92:Math.floor(58+random()*34),
    population:Math.floor(180000+random()*8200000),
    resources,rules,initialEvents,
    visualParameters:{terrainSeed:Math.floor(random()*2147483647),islandCount:isFloating||isOcean?Math.floor(7+random()*18):Math.floor(random()*5),oceanLevel:isOcean?.78:isFloating?.42:.28,mountainHeight:isDesert?.48:.67,vegetationDensity:isDesert?.16:isFrozen?.22:.74,buildingDensity:.35+random()*.35,civilizationStyle:isCyber?"Neo-organic futurism":"Luminous ecological futurism",atmosphereColor:isDesert?"Amber and cobalt":isFrozen?"Ice blue and violet":"Azure and pearl",lighting:"Cinematic soft daylight",weather:climate},
    evolutionParameters:{stability:isPeaceful?88:70,energy:Math.floor(62+random()*30),exploration:Math.floor(70+random()*28),resources:Math.floor(65+random()*30)},
  });
}
