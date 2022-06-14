export const idlFactory = ({ IDL }) => {
  const Question = IDL.Record({ 'id' : IDL.Text, 'text' : IDL.Text });
  const Survey = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'participants' : IDL.Opt(IDL.Nat),
    'desc' : IDL.Text,
    'stake' : IDL.Opt(IDL.Nat),
    'questions' : IDL.Vec(Question),
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
    'createSurveyRecord' : IDL.Func([Survey], [], []),
    'getToken' : IDL.Func([], [Token], []),
    'init' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
