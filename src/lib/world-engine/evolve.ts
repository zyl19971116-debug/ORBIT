export const WORLD_STAT_KEYS=["environment","civilization","technology","population","resources","stability","energy","exploration"] as const;
export type WorldStat=typeof WORLD_STAT_KEYS[number]; export type WorldState=Record<WorldStat,number>;
export type ProposedChanges=Partial<Record<WorldStat,number>>;
const MAX_DELTA:Record<WorldStat,number>={environment:8,civilization:8,technology:10,population:12,resources:10,stability:8,energy:10,exploration:12};
export function applyEvolution(current:WorldState,proposed:ProposedChanges){const applied={} as ProposedChanges;const next={...current};for(const key of WORLD_STAT_KEYS){const requested=Math.round(proposed[key]??0);const safe=Math.max(-MAX_DELTA[key],Math.min(MAX_DELTA[key],requested));next[key]=Math.max(0,Math.min(100,current[key]+safe));applied[key]=next[key]-current[key]}return{previous:{...current},proposed,applied,next}}
