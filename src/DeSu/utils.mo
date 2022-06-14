import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";
import D "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

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
    }
}