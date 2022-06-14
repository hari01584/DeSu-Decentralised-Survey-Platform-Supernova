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

    public type AnswerData = {
        id : Text;
        ans : Text;
    };

    public type SurveyHeader = {
        id : Text;
        owner : Principal;
        surveydata : SurveyCreateData;
        answers : [AnswerData];
    };
};