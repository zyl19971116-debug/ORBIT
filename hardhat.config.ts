import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
const accounts=process.env.DEPLOYER_PRIVATE_KEY?[process.env.DEPLOYER_PRIVATE_KEY]:[];
const config:HardhatUserConfig={solidity:{version:"0.8.24",settings:{optimizer:{enabled:true,runs:200}}},networks:{robinhoodTestnet:{url:process.env.ROBINHOOD_RPC_URL||"https://rpc.testnet.chain.robinhood.com",chainId:46630,accounts}}};
export default config;
