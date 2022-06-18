export const idlFactory = ({ IDL }) => {
  const Age = IDL.Int;
  const Country = IDL.Text;
  const UserDemographicInput = IDL.Record({
    'age' : Age,
    'country' : Country,
    'name' : IDL.Text,
  });
  const QuestionData = IDL.Record({
    'title' : IDL.Text,
    'options' : IDL.Vec(IDL.Text),
  });
  const SurveyCreateData = IDL.Record({
    'participants' : IDL.Opt(IDL.Nat),
    'desc' : IDL.Text,
    'stake' : IDL.Opt(IDL.Nat),
    'questions' : IDL.Vec(QuestionData),
  });
  const AnswerUnit = IDL.Record({ 'ans' : IDL.Text, 'qid' : IDL.Text });
  const AnswerData = IDL.Record({
    'id' : IDL.Text,
    'ans' : IDL.Vec(AnswerUnit),
    'owner' : IDL.Principal,
  });
  const UserDemographic = IDL.Record({
    'data' : UserDemographicInput,
    'user' : IDL.Principal,
  });
  const Survey = IDL.Record({
    'id' : IDL.Text,
    'owner' : IDL.Principal,
    'data' : SurveyCreateData,
    'answers' : IDL.Vec(AnswerData),
  });
  const Token = IDL.Service({
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'burn' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'decimals' : IDL.Func([], [IDL.Nat], ['query']),
    'mint' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], ['query']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'wallet_receive' : IDL.Func(
        [],
        [IDL.Record({ 'accepted' : IDL.Nat64 })],
        [],
      ),
  });
  return IDL.Service({
    'createDemographicRecord' : IDL.Func([UserDemographicInput], [], []),
    'createSurveyRecord' : IDL.Func([SurveyCreateData], [IDL.Text], []),
    'fetchAllAnswersFor' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(AnswerData)],
        ['query'],
      ),
    'fetchDemographicRecord' : IDL.Func(
        [],
        [IDL.Opt(UserDemographic)],
        ['query'],
      ),
    'getAllSurveys' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Opt(UserDemographic), Survey))],
        ['query'],
      ),
    'getSurveyRecord' : IDL.Func([IDL.Text], [Survey], ['query']),
    'getToken' : IDL.Func([], [Token], []),
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'init' : IDL.Func([], [], []),
    'insertAnswerFor' : IDL.Func([IDL.Text, AnswerData], [IDL.Bool], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
