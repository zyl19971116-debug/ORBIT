"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Copy, LogOut, Menu, Orbit, Rocket, WalletCards, X } from "lucide-react";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { robinhoodTestnet } from "@/lib/blockchain/chainConfig";

const links = [["HOME", "/"], ["CREATE", "/create"], ["EXPLORE", "/explore"], ["MY WORLDS", "/worlds"], ["LEADERBOARD", "/leaderboard"], ["DOCS", "/docs"]];

function WalletLogo({name="Wallet",icon}:{name?:string;icon?:string}){
  if(icon)return <span className="wallet-logo wallet-logo-image" style={{backgroundImage:`url(${icon})`}} aria-hidden="true"/>;
  const normalized=name.toLowerCase();
  if(normalized.includes("metamask"))return <span className="wallet-logo wallet-logo-metamask" aria-hidden="true">🦊</span>;
  if(normalized.includes("coinbase"))return <span className="wallet-logo wallet-logo-coinbase" aria-hidden="true">C</span>;
  if(normalized.includes("walletconnect"))return <span className="wallet-logo wallet-logo-walletconnect" aria-hidden="true">W</span>;
  return <span className="wallet-logo wallet-logo-generic" aria-hidden="true"><WalletCards size={16}/></span>;
}

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [wallets, setWallets] = useState(false);
  const { address, isConnected, chainId, connector } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  return <header className="site-header">
    <Link href="/" className="brand"><span><Orbit /></span><b>ORBIT <i>AI</i></b></Link>
    <nav className={menu ? "open" : ""}>{links.map(([label, href]) => <Link className={pathname === href ? "active" : ""} key={href} href={href} onClick={() => setMenu(false)}>{label}</Link>)}</nav>
    <div className="header-actions"><button className="chain-button" onClick={() => chainId !== robinhoodTestnet.id && switchChain({ chainId: robinhoodTestnet.id })}><Rocket size={17} /> Robinhood Testnet <ChevronDown size={15} /></button>
      <div className="wallet-wrap"><button className="wallet-button" onClick={() => setWallets(!wallets)}><WalletLogo name={connector?.name} icon={connector?.icon}/><span>{isConnected ? `${address?.slice(0, 6)}…${address?.slice(-4)}` : "Connect Wallet"}</span></button>
        {wallets && <div className="wallet-popover glass-panel">{isConnected ? <><div className="wallet-connected-title"><WalletLogo name={connector?.name} icon={connector?.icon}/><div><strong>{connector?.name||"Connected wallet"}</strong><small>Connected wallet</small></div></div><span>{address}</span><button onClick={() => navigator.clipboard.writeText(address!)}><Copy size={15} /> Copy address</button>{chainId !== robinhoodTestnet.id && <button onClick={() => switchChain({ chainId: robinhoodTestnet.id })}><Rocket size={15} /> Switch network</button>}<button onClick={() => disconnect()}><LogOut size={15} /> Disconnect</button></> : <><strong>Choose a wallet</strong>{connectors.map((item) => <button disabled={isPending} key={item.uid} onClick={() => connect({ connector:item })}><WalletLogo name={item.name} icon={item.icon}/><span>{item.name}</span></button>)}<small>Connection is handled by your wallet. ORBIT never receives private keys.</small></>}</div>}
      </div><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button></div>
  </header>;
}
