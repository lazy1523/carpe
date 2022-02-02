import { invoke } from "@tauri-apps/api/tauri";
import { get, writable } from "svelte/store";
import { raise_error } from "./carpeError";
import { loadAccounts } from "./accounts";


  // Note: the string initialized should match the enum in Rust, networks.rs, to easily de/serialize
export enum Networks {
  Mainnet = "Mainnet",
  Rex = "Rex"
}

export const network_profile = writable<NetworkProfile>({
  chain_id: "string", // Todo, use the Network Enum
  url: "string",
  waypoint: "string",
  profile: "string",
});

export const connected = writable<boolean>(true);

// should match the Rust type Network Profile
export interface NetworkProfile {
  chain_id: string, // Todo, use the Network Enum
  url: string,
  waypoint: string,
  profile: string,
}

export function setNetwork(network: Networks) {
  invoke("toggle_network", { network: network })
      .then((res: NetworkProfile) => {
        network_profile.set(res);
        // update accounts from current network
        loadAccounts(); // TODO notify as an event dependency
      })
    .catch((error) => raise_error(error, false, "setNetwork"));
}

export function getNetwork() {
  invoke("get_networks", {})
    .then((res: NetworkProfile) => network_profile.set(res))
    .catch((error) => raise_error(error, false, "getNetwork"));
}

export function refreshWaypoint() {
  console.log("refreshWaypoint");
  invoke("refresh_waypoint", {})
    .then((res: NetworkProfile) => {
      network_profile.set(res);
      connected.set(true);
    })
    .catch((error) => {
      connected.set(false);
      raise_error(error, true, "refreshWaypoint"); // we have a purpose-built error component for this
    });
}