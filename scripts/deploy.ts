import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const testLensReceiver = await ethers.deployContract("TestLensOracle", [deployer]);
  console.log("Deploying the TestLensOracle contract...");
  await testLensReceiver.waitForDeployment();
  console.log(`TestLensOracle contact Successfully deployed to ${testLensReceiver.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
