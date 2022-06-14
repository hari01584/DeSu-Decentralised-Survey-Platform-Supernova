module {
    public type QuestionData = {
        id : Text;
        text : Text;
    };

    public type SurveyCreateData = {
        desc : Text;
        questions : [QuestionData];
        stake : ?Nat;
        participants : ?Nat;
    };

    public type AnswerUnit = {
        qid : Text;
        ans : Text;
    };

    public type AnswerData = {
        id : Text;
        owner : Principal;
        ans : [AnswerUnit];
    };

    public type Survey = {
        id : Text;
        owner : Principal;
        data : SurveyCreateData;
        answers : [AnswerData];
    };
};