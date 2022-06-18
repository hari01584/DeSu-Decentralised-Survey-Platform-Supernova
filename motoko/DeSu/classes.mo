import T "types";
import U "utils";

import Principal "mo:base/Principal";

module {
    // Survey class, records everything related to survey and defines functions that can be called on them.
    public class Survey(id : Text, owner: Principal, createData : T.SurveyCreateData){
        let surveyId = id;

        /*
            Define method/fields relating to class
        */

        // Add answer method
        public func addAnswer() {
            // Bool return status of this operation ie. true/false
            // TODO: Implement logic here
            // return false;
        };


        func viewAnswers() : [T.AnswerData] {
            // Return saved answers here
            // TODO: Implement logic here
            return [];
        };
    }

}