const path = require("path");
var fs = require('fs');

function initCanisterEnv() {
    let localCanisters, prodCanisters;
    try {
      localCanisters = require(path.resolve(
        ".dfx",
        "local",
        "canister_ids.json"
      ));
    } catch (error) {
      console.log("No local canister_ids.json found. Continuing production");
    }
    try {
      prodCanisters = require(path.resolve("canister_ids.json"));
    } catch (error) {
      console.log("No production canister_ids.json found. Continuing with local");
    }
  
    const network =
      process.env.DFX_NETWORK ||
      (process.env.NODE_ENV === "production" ? "ic" : "local");
  
    const canisterConfig = network === "local" ? localCanisters : prodCanisters;
  
    return Object.entries(canisterConfig).reduce((prev, current) => {
      const [canisterName, canisterDetails] = current;
      prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
        canisterDetails[network];
      return prev;
    }, {});
}

const variables = initCanisterEnv();
const isDevelopment = process.env.NODE_ENV !== "production";

ENV_TEXT = "NODE_ENV="+process.env.NODE_ENV+"\n";
for(v in variables){
    ENV_TEXT += "REACT_APP_" + v + "=" + variables[v] + "\n";
}
fs.writeFileSync(".env", ENV_TEXT);