# Intents Sports Ball Workshop

![Sporty losing it all](./assets/sporty-not-my-team.gif "Sporty Losing It All [2012]")

## Table of Contents
- [Background](#background)
    - [What Are Intents?](#what-are-intents)
    - [Goals](#goals)
- [What Are Phat Functions](#what-are-phat-functions)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
    - [Deploy to Polygon Mumbai Testnet](#deploy-to-polygon-mumbai-testnet)
        - [Verify Contract on Polygon Mumabai Testnet](#verify-contract-on-polygon-mumbai-testnet)
        - [Interact with Consumer Contract on Polygon Mumbai](#interact-with-consumer-contract-on-polygon-mumbai)
    - [Deploy to Polygon Mainnet](#deploy-to-polygon-mainnet)
        - [Verify Contract on Polygon Mainnet](#verify-contract-on-polygon-mainnet)
        - [Interact with Consumer Contract on Polygon Mainnet](#interact-with-consumer-contract-on-polygon-mainnet)
- [Closing](#closing)

## Background
Intents Sports Ball is a Sportsbook for betting on outcomes for sporting events like baseball, football, basketball, etc. However, the origins start with our creator named Sporty. Sporty can be seen above in the GIF dating back to 2012 where he lost everything betting his life savings on his team to win the sports game. In Sporty's words, "Daniels, why'd you throw it away Daniels! Daniels had a second leg to knee and he didn't even throw it in." This troubling event led to Sporty realizing he could make good with the Sharks if he could regain his losses by opening his own sportsbook.

Sporty had recently been reading about Intents where a phrase stuck out, "A transaction specifies the journey, while an intent specifies the destination." A light shined from the clouds and Sporty knew that all he needed to do was slap the word "Intents" on the product with the meta-intent being that all winnings go to Sporty's wallet as the destination. Sporty had perfected intents in his mind, and he left breadcrumbs of how he built the multi-trillion dollar dApp that made him the richest degen on plant Earth.
### What Are Intents?
> "An intent is a signed set of declarative constraints which allow a user to outsource transaction creation to a third party without relinquishing full control to the transacting party." - [source](https://www.paradigm.xyz/2023/06/intents)

Intents Sports Ball is not a guide on how to build intents into your dApp, and all information around intents-based architecture in blockchain can be found in Banana SDK's [awesome-intents](https://github.com/Banana-Wallet/awesome-intents) repo.

### Goals
Goals will be to teach developers different ways to build a cross-chain dApp with Phala Network's [Phat Functions](todo-link).

Goals include the following:
- Implement Nestable NFTs for a User Profile NFT with nested NFTs of a user's bets using [RMRK Nestable NFTs (ERC-6059)](https://eips.ethereum.org/EIPS/eip-6059).
- Update a [Telegram](https://telegram.org/) Group of latest info about sports game scores.
- Query multiple API Endpoints to get sportsbook odds and latest results of the games bet on.
- Connect to [off-chain storage](todo-link) to publish a user bet's metadata.
- Connect to an EVM Chain consumer contract and start making requests to the deployed Phat Function on Phala.

## What Are Phat Functions?
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
