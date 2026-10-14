import { ethers } from "hardhat";
async function main(){const [deployer]=await ethers.getSigners();if(!deployer)throw new Error("DEPLOYER_PRIVATE_KEY is not configured");const factory=await ethers.getContractFactory("OrbitWorldRegistry");const registry=await factory.deploy(deployer.address);await registry.waitForDeployment();console.log(`OrbitWorldRegistry deployed to ${await registry.getAddress()}`)}
main().catch(error=>{console.error(error);process.exitCode=1});
