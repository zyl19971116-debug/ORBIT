import { describe,expect,it } from "vitest";import { applyEvolution,WorldState } from "./evolve";
const state:WorldState={environment:50,civilization:50,technology:15,population:12,resources:5,stability:80,energy:50,exploration:20};
describe("applyEvolution",()=>{it("clamps unsafe AI deltas and world bounds",()=>{const r=applyEvolution(state,{technology:80,resources:-50,stability:-3});expect(r.next.technology).toBe(25);expect(r.next.resources).toBe(0);expect(r.next.stability).toBe(77);expect(state.technology).toBe(15)})});
