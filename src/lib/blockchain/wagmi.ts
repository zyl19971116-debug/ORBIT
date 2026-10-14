import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";
import { robinhoodTestnet } from "./chainConfig";

const connectors = [injected(), metaMask(), coinbaseWallet({ appName: "ORBIT AI" })];
if (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) connectors.push(walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID }));

export const wagmiConfig = createConfig({ chains: [robinhoodTestnet], connectors, transports: { [robinhoodTestnet.id]: http(robinhoodTestnet.rpcUrls.default.http[0]) }, ssr: true });
