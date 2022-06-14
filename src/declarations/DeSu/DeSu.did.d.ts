import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Question { 'id' : string, 'text' : string }
export interface Survey {
  'id' : [] | [string],
  'participants' : [] | [bigint],
  'desc' : string,
  'stake' : [] | [bigint],
  'questions' : Array<Question>,
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
  'createSurveyRecord' : ActorMethod<[Survey], undefined>,
  'getToken' : ActorMethod<[], Principal>,
  'init' : ActorMethod<[], undefined>,
}
