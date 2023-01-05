/* eslint-disable @typescript-eslint/ban-types */
import { operations } from "./gen/slackapi";

type Parameter<T> = T extends { parameters: infer P } ? P : void;

type Response<T> = T extends {
	responses: { 200: { schema: infer R } };
}
	? R
	: {};

export type SlackOperation = keyof operations;

export type SlackParameter<T extends SlackOperation> = Parameter<operations[T]>;

export type SlackResponse<T extends SlackOperation> = Response<operations[T]>;
