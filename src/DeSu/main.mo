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
import Error "mo:base/Error";
import Map "mo:base/HashMap";

import Text "mo:base/Text";

actor {
  var isInit : Bool = false;
  
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  stable var DSX : ?ERC20.Token = null;
  
  public shared(msg) func init() : async (){
    assert (isInit == false); // Check if initialized before, throws error

    Cycles.add(1000000000000);

    if(Option.isNull(DSX)){
      D.print("Creating new coin DSX");
      let canisterInstance = await ERC20.Token("DeSuX", "DSX", 6, 10000000, msg.caller);
      let amountAccepted = await canisterInstance.wallet_receive(); // Accept some cycles for creation
      DSX := Option.make(canisterInstance);
    }
    else {
      D.print("DSX Working");
    };

    isInit := true; // Everything properly initialized
  };

  /*
    Token Interfacing Methods Ahead.
  */

  // Gets the currently initilized token!
  public func getToken() : async ERC20.Token {
    switch DSX {
      case null throw Error.reject("Not Found");
      case (?int) return int;
    };
  };

  /*
    Survey Records Methods Ahead.
  */

  // Survey HashMap (TODO: Make it stable and persistent)
  let surveys = Map.HashMap<Text, C.Survey>(0, Text.equal, Text.hash);

  public shared(msg) func createSurveyRecord(record : T.SurveyCreateData) : async Text {
    // Generate random id from util
    let id : Text = await U.generateRandomId(msg.caller);

    // Generate instance of survey
    let survey : C.Survey = C.Survey(id, msg.caller, record);

    // Add to our list of surveys
    surveys.put(id, survey);

    // Debug show survey
    D.print(debug_show(survey));

    // Return Unique ID
    return id;
  };

  public query func getSurveyRecord(id : Text) : async C.Survey {
    switch (surveys.get(id)) {
      case null throw Error.reject("Not Found");
      case (?z) return z;
    };
  }
};