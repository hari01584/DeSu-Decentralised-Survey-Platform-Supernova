import { idlFactory  } from "../../declarations/DeSu";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

var authClient;
export var desuapp;
const canisterId = process.env.REACT_APP_DESU_CANISTER_ID;

export const startAuthflow = async () => {
    let iiUrl;
    if (process.env.DFX_NETWORK === "ic") {
        iiUrl = `https://${process.env.REACT_APP_II_CANISTER_ID}.ic0.app`;
    } else {
        iiUrl = `http://localhost:8000/?canisterId=${process.env.REACT_APP_II_CANISTER_ID}`;
    }
    authClient = await AuthClient.create();
    return new Promise((resolve, reject) => {
        authClient.login({
            // identityProvider: iiUrl,
            onSuccess: resolve,
            onError: reject,
        });
    });
};

export const getAuthenticatedDeSu = () => {
    if(desuapp) return desuapp; // Returned Cached version
    if(!authClient) return null;

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    agent.fetchRootKey();
    desuapp = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterId,
    });
    return desuapp;
};


export const getNormalDeSu = async () => {
    if(desuapp) return desuapp; // Returned Cached version
    let authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    agent.fetchRootKey();
    desuapp = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterId,
    });
    return desuapp;
};