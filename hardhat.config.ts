import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ProxyAgent, setGlobalDispatcher } from 'undici';

if (process.env.http_proxy || process.env.https_proxy) {
  const proxy = (process.env.http_proxy || process.env.https_proxy)!;
  const proxyAgent = new ProxyAgent(proxy);
  setGlobalDispatcher(proxyAgent);
}
const config: HardhatUserConfig = {
  solidity: "0.8.19",
};

export default config;
