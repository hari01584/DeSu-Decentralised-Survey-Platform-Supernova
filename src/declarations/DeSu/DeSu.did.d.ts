import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface QuestionData { 'id' : string, 'text' : string }
export type Survey = {};
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
export interface _SERVICE {
  'createSurveyRecord' : ActorMethod<[SurveyCreateData], string>,
  'getSurveyRecord' : ActorMethod<[string], Survey>,
  'getToken' : ActorMethod<[], Principal>,
  'init' : ActorMethod<[], undefined>,
}
