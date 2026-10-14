import Link from "next/link";
import { Heart } from "lucide-react";
export function WorldCard({ name, category, tone, rank, seed }: { name: string; category: string; tone: string; rank: number; seed: number }) {
  return <Link href={`/explore?world=${seed}`} className="world-card">
    <div className={`world-art world-cover-${rank} ${tone}`}><span className="rank">#{rank}</span><div className="card-vignette" /><strong className="card-title">{name}</strong></div>
    <div className="world-foot"><span><i className="avatar" /> 0x{seed.toString(16)}…{(seed * 97).toString(16)}</span><span><Heart size={14} /> 0</span></div>
    <span className="sr-only">{category} · Official preset</span>
  </Link>;
}
