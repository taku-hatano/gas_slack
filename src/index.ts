import { SlackResponse, SlackOperation, SlackParameter } from "../types/slack";
import { slackUrlDefinitions } from "./gen/slack_api";

export const fetchSlack = <T extends SlackOperation>(
	operation: T,
	params: SlackParameter<T>
) => {
	const payload = {};
	Object.values(params).forEach(val => {
		Object.assign(payload, val);
	});
	const { url, method } = slackUrlDefinitions[operation];
	Logger.log(`Request to Slack...
	URL: ${url}
	PAYLOAD: ${JSON.stringify(payload, null, "\t")}`);
	const response: SlackResponse<T> = JSON.parse(
		UrlFetchApp.fetch(url, {
			method,
			payload
		}).getContentText("UTF-8")
	);
	return response;
};
