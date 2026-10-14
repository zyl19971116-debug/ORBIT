import Link from "next/link";
import { ArrowRight, Bot, Box, Flame, Globe2, Zap } from "lucide-react";
import { WorldCard } from "@/components/worlds/WorldCard";

const samples = [
  { name: "Frost Haven", category: "Nature", tone: "ice", seed: 11 },
  { name: "Sakura Cloud", category: "Fantasy", tone: "rose", seed: 22 },
  { name: "Red Desert", category: "Ancient", tone: "ember", seed: 33 },
  { name: "Neo Tokyo X", category: "Cyberpunk", tone: "neon", seed: 44 },
  { name: "Eternal Forest", category: "Nature", tone: "forest", seed: 55 },
  { name: "Star Harbor", category: "Space", tone: "space", seed: 66 },
] as const;

export default function Home() {
  return (
    <main className="home-shell">
      <div className="hero-environment" aria-hidden="true" />
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AI CREATES REAL WORLDS</p>
          <h1>A WORLD BORN<br />FROM A <span>SENTENCE</span></h1>
          <p className="lede">Describe a world in one sentence. Our AI brings it to life with landscapes, civilizations, rules, and endless possibilities.</p>
          <p className="closing">Own it. Evolve it. Share it. Onchain.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/create">Create Your World <ArrowRight size={18} /></Link>
            <Link className="button secondary" href="/explore">Explore Worlds</Link>
          </div>
          <div className="stats-strip">
            <div><Globe2 /><strong>0</strong><span>Worlds Created</span></div>
            <div><Bot /><strong>0</strong><span>AI Citizens</span></div>
            <div><Box /><strong>—</strong><span>World Value</span></div>
            <div><Zap /><strong>0</strong><span>Live Worlds</span></div>
          </div>
        </div>
        <div className="planet-stage">
          <div className="orbit-hotspot"><span /><span /><span /></div>
        </div>
        <aside className="world-preview glass-panel">
          <div className="panel-kicker"><span>WORLD PREVIEW</span><em><i /> LIVE PRESET</em></div>
          <div className="preview-art" aria-label="Official preset preview of floating islands" />
          <h2>A peaceful floating island city</h2>
          <p>Waterfalls descend from crystalline islands while an advanced civilization grows in harmony with its blue ocean world.</p>
          <div className="tags">{["Floating Islands", "Advanced Civilization", "Peaceful", "Waterfalls", "Blue Ocean", "AI Citizens"].map((tag) => <span key={tag}>{tag}</span>)}</div>
          <Link className="button primary wide" href="/create?prompt=A%20peaceful%20floating%20island%20city">Generate This World <ArrowRight size={18} /></Link>
        </aside>
      </section>
      <section className="trending-section glass-panel">
        <div className="section-heading"><h2><Flame size={18} /> Trending Worlds</h2><div className="category-tabs"><span className="active">ALL</span><span>FANTASY</span><span>CYBERPUNK</span><span>NATURE</span><span>SPACE</span><span>ANCIENT</span><span>FUTURE</span></div><Link href="/explore">View more <ArrowRight size={16} /></Link></div>
        <div className="world-row">{samples.map((world, index) => <WorldCard key={world.name} {...world} rank={index + 1} />)}</div>
      </section>
    </main>
  );
}
