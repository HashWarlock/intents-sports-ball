import { ethers } from "hardhat";
import "dotenv/config";

async function main() {
    const IntentsSportsBall = await ethers.getContractFactory("IntentsSportsBall");

    const [deployer] = await ethers.getSigners();

    const consumerSC = process.env["LOCALHOST_CONSUMER_CONTRACT_ADDRESS"] || "";
    if (!consumerSC) {
        console.error("Error: Please provide LOCALHOST_CONSUMER_CONTRACT_ADDRESS");
        process.exit(1);
    }
    const consumer = IntentsSportsBall.attach(consumerSC);
    console.log("Pushing a request...");
    await consumer.connect(deployer).request("bf8ec4081bb20755f5aa26aed3cc1d3a");
    consumer.on("ResponseReceived", async (reqId: number, pair: string, value: string) => {
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
