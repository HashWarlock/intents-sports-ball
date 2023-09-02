import "dotenv/config";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("TestLensOracle", process.env.CONTRACT_ADDRESS || "", deployer);
  await contract.request("0x01");
  // @ts-ignore
  contract.on("ResponseReceived", async (reqId: number, pair: string, value: string) => {
    console.info("Received event [ResponseReceived]:");
    console.info(reqId, pair, value)
    process.exit();
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
