import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Age = bigint;
export interface AnswerData {
  'id' : string,
  'ans' : Array<AnswerUnit>,
  'owner' : Principal,
}
export interface AnswerUnit { 'ans' : string, 'qid' : string }
export type Country = string;
export interface QuestionData { 'title' : string, 'options' : Array<string> }
export interface Survey {
  'id' : string,
  'owner' : Principal,
  'data' : SurveyCreateData,
  'answers' : Array<AnswerData>,
}
export interface SurveyCreateData {
  'participants' : [] | [bigint],
  'desc' : string,
  'stake' : [] | [bigint],
  'questions' : Array<QuestionData>,
}
export interface Token {
  'allowance' : ActorMethod<[Principal, Principal], bigint>,
  'approve' : ActorMethod<[Principal, bigint], boolean>,
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burn' : ActorMethod<[Principal, bigint], boolean>,
  'decimals' : ActorMethod<[], bigint>,
  'mint' : ActorMethod<[Principal, bigint], boolean>,
  'name' : ActorMethod<[], string>,
  'owner' : ActorMethod<[], Principal>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], boolean>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], boolean>,
  'wallet_receive' : ActorMethod<[], { 'accepted' : bigint }>,
}
export interface UserDemographic {
  'data' : UserDemographicInput,
  'user' : Principal,
}
export interface UserDemographicInput {
  'age' : Age,
  'country' : Country,
  'name' : string,
}
export interface _SERVICE {
  'createDemographicRecord' : ActorMethod<[UserDemographicInput], undefined>,
  'createSurveyRecord' : ActorMethod<[SurveyCreateData], string>,
  'fetchAllAnswersFor' : ActorMethod<[string], Array<AnswerData>>,
  'fetchDemographicRecord' : ActorMethod<[], [] | [UserDemographic]>,
  'getAllSurveys' : ActorMethod<[], Array<[[] | [UserDemographic], Survey]>>,
  'getSurveyRecord' : ActorMethod<[string], Survey>,
  'getToken' : ActorMethod<[], Principal>,
  'greet' : ActorMethod<[], string>,
  'init' : ActorMethod<[], undefined>,
  'insertAnswerFor' : ActorMethod<[string, AnswerData], boolean>,
  'whoami' : ActorMethod<[], Principal>,
}
