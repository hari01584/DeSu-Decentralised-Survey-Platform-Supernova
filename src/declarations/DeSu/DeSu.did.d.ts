import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Question { 'id' : string, 'text' : string }
export interface Survey {
  'id' : [] | [string],
  'desc' : string,
  'questions' : Array<Question>,
}
export interface _SERVICE {
  'createSurveyRecord' : ActorMethod<[Survey], undefined>,
}
