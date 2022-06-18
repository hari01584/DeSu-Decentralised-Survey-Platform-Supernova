module {
    public type QuestionData = {
        id : Text;
        title : Text;
        options : [Text];
    };

    public type SurveyCreateData = {
        desc : Text;
        questions : [QuestionData];
        stake : ?Nat;
        participants : ?Nat;
    };

    public type AnswerUnit = {
        question : Text;
        answer : Text;
    };

    public type AnswerData = {
        survey : Text;
        answers : [AnswerUnit];
    };

    public type AnswerDataStore = {
        id: Text;
        survey : Text;
        user : Principal;
        answers : [AnswerUnit];
    };
    
    public type Survey = {
        id : Text;
        owner : Principal;
        closed : Bool;
        data : SurveyCreateData;
        answers : [AnswerDataStore];
    };

    /*
        types for user data
    */
    public type Country = Text;
    public type Age = Int;

    public type UserDemographicInput = {
        name : Text;
        country : Country;
        age : Age;
    };

    public type UserDemographic = {
        user : Principal;
        data : UserDemographicInput;
    };
};