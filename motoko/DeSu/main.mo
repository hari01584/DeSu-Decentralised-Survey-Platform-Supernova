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
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";

import Text "mo:base/Text";
import Nat "mo:base/Nat";

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
  var surveys = Map.HashMap<Text, T.Survey>(0, Text.equal, Text.hash);
  let answers = Map.HashMap<Text, [T.AnswerDataStore]>(0, Text.equal, Text.hash);

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
  
  public query func getAllSurveys() : async [(?T.UserDemographic, T.Survey)] {
      let b = Buffer.Buffer<(?T.UserDemographic, T.Survey)>(0);
      for ((p, v) in surveys.entries()) {
        b.add((userData.get(v.owner), v));
      };
      return b.toArray();
  };

  public shared(msg) func insertAnswerFor(sid : Text, answer : T.AnswerData) : async Bool {
    let uid : Text = await U.generateTextRandom();
    
    let answerstore : T.AnswerDataStore = {
      id: Text = uid;
      survey: Text = sid;
      user = msg.caller;
      answers: [T.AnswerUnit] = answer.answers;
    };

    switch (answers.get(sid)) {
      case null {
        answers.put(sid, [answerstore]);
      };
      case (?z){
        D.print("Appending new to answers, init l "#Nat.toText(answers.size()));
        let buf : Buffer.Buffer<T.AnswerDataStore> = Buffer.Buffer<T.AnswerDataStore>(0);
        for (item in z.vals()) {
          buf.add(item);
        };
        buf.add(answerstore);
        answers.put(sid, buf.toArray());
        D.print("done answers, final l "#Nat.toText(answers.size()));
      }
    };

    return true;
  };

  public shared(msg) func setSurveyStatus(sid: Text, isClosed: Bool) : async (){
    switch (surveys.get(sid)) {
      case null throw Error.reject("Not Found");
      case (?z){
        assert (msg.caller == z.owner);  // Only allow owner to close survey
        let r : T.Survey = {
          id = z.id;
          owner = z.owner;
          closed = isClosed;
          data = z.data;
          answers = z.answers;
        };
        surveys.put(sid, r);
      };
    };
  };

  public query func fetchAnswerResult(sid : Text) : async (T.Survey, ?[T.AnswerDataStore], ?T.UserDemographic) {
    let surveyrec : T.Survey = switch (surveys.get(sid)) {
      case null throw Error.reject("Not Found");
      case (?z) z;
    };
    let myanswers : ?[T.AnswerDataStore] = answers.get(sid);
    let myuserdata : ?T.UserDemographic = userData.get(surveyrec.owner);
    return (
      surveyrec,
      myanswers,
      myuserdata
    );
  };

  public query func fetchAllAnswersFor(id : Text) : async ?[T.AnswerDataStore] {
    return answers.get(id);
  };

  public query func fetchAllAnswers() : async [[T.AnswerDataStore]] {
      let b = Buffer.Buffer<[T.AnswerDataStore]>(0);
      for ((p, v) in answers.entries()) {
        b.add(v);
      };
      return b.toArray();
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


  /*
    Misc
  */
  public shared query(msg) func whoami() : async Principal {
    return msg.caller;
  };

  public shared query(msg) func greet() : async Text {
    return "Hello " # Principal.toText(msg.caller);
  };
};