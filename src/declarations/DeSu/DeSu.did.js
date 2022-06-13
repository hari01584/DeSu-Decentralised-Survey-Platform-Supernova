export const idlFactory = ({ IDL }) => {
  const Question = IDL.Record({ 'id' : IDL.Text, 'text' : IDL.Text });
  const Survey = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'participants' : IDL.Opt(IDL.Nat),
    'desc' : IDL.Text,
    'stake' : IDL.Opt(IDL.Nat),
    'questions' : IDL.Vec(Question),
  });
  return IDL.Service({
    'createSurveyRecord' : IDL.Func([Survey], [], []),
    'init' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
