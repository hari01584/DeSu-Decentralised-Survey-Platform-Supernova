export const idlFactory = ({ IDL }) => {
  const Question = IDL.Record({ 'id' : IDL.Text, 'text' : IDL.Text });
  const Survey = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'desc' : IDL.Text,
    'questions' : IDL.Vec(Question),
  });
  return IDL.Service({ 'createSurveyRecord' : IDL.Func([Survey], [], []) });
};
export const init = ({ IDL }) => { return []; };
