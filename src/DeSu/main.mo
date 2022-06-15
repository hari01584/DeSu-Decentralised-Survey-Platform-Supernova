import T "types";
import U "utils";
import D "mo:base/Debug";
import C "classes";

import Principal "mo:base/Principal";
import Bool "mo:base/Bool";

import ERC20 "erc20/token";
import Option "mo:base/Option";
import Cycles "mo:base/ExperimentalCycles";

import Error "mo:base/Error";
import Map "mo:base/HashMap";

import Text "mo:base/Text";

actor {
  var isInit : Bool = false;
  
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  stable var DSX : ?ERC20.Token = null;
  stable var Manager: Principal = null_address;

  public shared(msg) func init() : async (){
    assert (isInit == false); // Check if initialized before, throws error

    // Set manager to the initilizer
    Manager := msg.caller;

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
  let surveys = Map.HashMap<Text, T.Survey>(0, Text.equal, Text.hash);

  public shared(msg) func createSurveyRecord(record : T.SurveyCreateData) : async Text {
    // TODO: Logic for checking if user wallet contains enough balance for staking
    await U.checkAndRemoveCrypto(msg.caller, record.stake, DSX, Manager);

    // Generate random id from util
    let id : Text = await U.generateRandomId(msg.caller);

    // Generate instance of survey
    let survey : T.Survey = U.createSurvey(id, msg.caller, record);

    // Add to our list of surveys
    surveys.put(id, survey);

    // Debug show survey
    D.print(debug_show(survey));

    // Return Unique ID
    return id;
  };

  public query func getSurveyRecord(id : Text) : async T.Survey {
    switch (surveys.get(id)) {
      case null throw Error.reject("Not Found");
      case (?z) return z;
    };
  };

  public func insertAnswerFor(id : Text, answer : T.AnswerData) : async Bool {
    // TODO: fetch from survey record and insert answer
    // Also insert checks to make sure answer and question structure match
    return false;
  };

  public query func fetchAllAnswersFor(id : Text) : async [T.AnswerData] {
    // TODO: fetch all answers
    return [];
  };


  /*
    Wallet/Personal Data Collection.
  */

  // Survey HashMap (TODO: Make it stable and persistent)
  let userData = Map.HashMap<Principal, T.UserDemographic>(0, Principal.equal, Principal.hash);

  // Create demographic record using input type
  public shared(msg) func createDemographicRecord(recordinp : T.UserDemographicInput) : async () {
    let record : T.UserDemographic = {
      user = msg.caller;
      data = recordinp;
    };
    switch (userData.get(msg.caller)) {
      case null userData.put(msg.caller, record);
      case (?z) throw Error.reject("Already recorded data for this user.");
    };
  };

  // Fetching demographic record
  public shared query(msg) func fetchDemographicRecord() : async ?T.UserDemographic {
    return userData.get(msg.caller);
  };

};