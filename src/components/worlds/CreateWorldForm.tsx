"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AlertCircle, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";

type Blueprint = { worldName:string; description:string; coverImage:string; biome:string; climate:string; civilization:string; technologyLevel:number; population:number; resources:string[]; rules:string[]; initialEvents:string[] };
type AiStatus = { configured:boolean; model:string };

export function CreateWorldForm({initialPrompt}:{initialPrompt:string}){
  const [prompt,setPrompt]=useState(initialPrompt);
  const [aiStatus,setAiStatus]=useState<AiStatus|null>(null);
  const [message,setMessage]=useState("");
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [world,setWorld]=useState<Blueprint|null>(null);

  useEffect(()=>{
    fetch("/api/ai/status",{cache:"no-store"})
      .then(async response=>{if(!response.ok)throw new Error();return response.json() as Promise<AiStatus>})
      .then(setAiStatus)
      .catch(()=>setAiStatus({configured:false,model:"unavailable"}));
  },[]);

  async function generate(event:FormEvent){
    event.preventDefault();
    const cleanPrompt=prompt.trim();
    if(cleanPrompt.length<12||loading)return;
    setLoading(true);setError(false);setMessage("Building terrain, civilization, rules, and the first events…");setWorld(null);
    try{
      const response=await fetch("/api/worlds/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt:cleanPrompt,idempotencyKey:crypto.randomUUID()})});
      const body=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(body.error||"World generation failed. Please retry.");
      setWorld(body.world);setMessage("World generated successfully.");
    }catch(caught){setError(true);setMessage(caught instanceof Error?caught.message:"World generation failed. Please retry.")}
    finally{setLoading(false)}
  }

  const ready=aiStatus?.configured===true;
  return <main className="page-shell">
    <div className="forge-heading"><div><p className="page-kicker">WORLD FORGE / 01</p><h1 className="page-title">Create the impossible.</h1><p className="page-subtitle">Describe a world in one sentence. ORBIT instantly creates a complete local blueprint with terrain, civilization, rules, resources, and events.</p></div>
      <div className={`ai-state ${ready?"ready":aiStatus?"offline":"checking"}`}>{ready?<CheckCircle2 size={15}/>:aiStatus?<AlertCircle size={15}/>:<LoaderCircle className="spin" size={15}/>} {ready?aiStatus.model:aiStatus?"ENGINE UNAVAILABLE":"CHECKING ENGINE"}</div>
    </div>
    <form className="generator glass-panel" onSubmit={generate}>
      <textarea required minLength={12} maxLength={800} value={prompt} onChange={event=>setPrompt(event.target.value)} placeholder="A solar-powered civilization living inside a crystal storm…" aria-label="Describe your world"/>
      <button className="button primary" disabled={!ready||prompt.trim().length<12||loading}>{loading?<LoaderCircle className="spin" size={18}/>:<Sparkles size={18}/>} {loading?"Generating…":"Generate world"}</button>
      <div className={`generator-status ${error||aiStatus?.configured===false?"error":""}`} aria-live="polite">{message||(ready?"Local generation is ready — no API key or network connection required.":aiStatus?"The local world engine is unavailable. Please refresh the page.":"Checking the local world engine…")}</div>
    </form>
    {world&&<section className="result-grid"><article className="result-card generated-world-card glass-panel"><div className="generated-world-image"><Image src={world.coverImage} alt={`${world.worldName} generated world`} fill sizes="(max-width: 760px) 100vw, 58vw" priority/></div><div className="generated-world-copy"><p className="page-kicker">GENERATED WORLD</p><h2>{world.worldName}</h2><p className="page-subtitle">{world.description}</p><div className="tags">{world.resources.map(item=><span key={item}>{item}</span>)}</div></div></article><article className="result-card glass-panel"><h3>World rules</h3><ul>{world.rules.map(item=><li key={item}>{item}</li>)}</ul><h3>First events</h3><ul>{world.initialEvents.map(item=><li key={item}>{item}</li>)}</ul></article><div className="data-grid" style={{gridColumn:"1/-1"}}>{[["Biome",world.biome],["Climate",world.climate],["Civilization",world.civilization],["Population",world.population.toLocaleString()],["Technology",world.technologyLevel]].map(([key,value])=><div className="data-card glass-panel" key={key}><span>{key}</span><strong>{value}</strong></div>)}</div></section>}
  </main>
}
