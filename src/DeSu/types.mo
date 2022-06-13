module {
    public type Question = {
        id : Text;
        text : Text;
    };

    public type Survey = {
        id : ?Text;        
        desc : Text;
        questions : [Question];
        stake : ?Nat;
        participants : ?Nat;
    };
};