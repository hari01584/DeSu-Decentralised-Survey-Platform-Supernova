import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";
import D "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import ERC20 "erc20/token";

import Error "mo:base/Error";

import T "types";

module {
    public func generateRandomId(p : Principal) : async Text{
        // Generate random unique id for our survey
        let b : Blob = await Random.blob();
        let hash : Nat32 = Blob.hash(b);
        let uniqueId : Text = Principal.toText(p) # Nat32.toText(hash);

        D.print("id is "#uniqueId);
        return uniqueId;
    };

    public func createSurvey(uid : Text, own: Principal, createData : T.SurveyCreateData) : T.Survey{        
        // Create Survey with no answers.
        let ans : [T.AnswerData] = [];
        let survey : T.Survey = {
            id = uid;
            owner = own;
            data = createData;
            answers = ans;
        };
        return survey;
    };

    public func checkAndRemoveCrypto(own : Principal, denom : ?Nat, token : ?ERC20.Token, manager : Principal) : async () {
        let d = switch denom {
            case null return;
            case (?int) int;
        };

        let t : ERC20.Token = switch token {
            case null throw Error.reject("Token not found");
            case (?z) z;
        };

        // Check zero or negative denomination, ie bad case;
        if(d <= 0) throw Error.reject("bad stake");

        // Get user wallet balance
        let userBal : Nat = await t.balanceOf(own);

        // Not sufficient balance
        if(userBal < d) throw Error.reject("Balance not sufficient");

        // Status transfer
        let status : Bool = await t.transferFrom(own, manager, d);
        
        // TODO: This fails somehow in candid interface testing, look back later.
        assert (status == true);
    };
}