import T "types";
import U "utils";
import D "mo:base/Debug";
import C "classes";

import Principal "mo:base/Principal";
import Bool "mo:base/Bool";

import ERC20 "erc20/token";
import Option "mo:base/Option";
import Cycles "mo:base/ExperimentalCycles";

import samplecycle "erc20/samplecycle";


actor {
  var isInit : Bool = false;
  
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  stable var DSX : ?ERC20.Token = null;
  
  public shared(msg) func init() : async (){
    assert (isInit == false); // Check if initialized before, throws error

    Cycles.add(1000000000000);

    // Create private ERC20 token
    let canisterInstance = await ERC20.Token("DeSuX", "DSX", 6, 1000, msg.caller);
    let amountAccepted = await canisterInstance.wallet_receive(); // Accept some cycles for creation

    isInit := true; // Everything properly initialized
  };

  public shared(msg) func createSurveyRecord(record : T.Survey) : async () {
    D.print(debug_show(record));
  };
};