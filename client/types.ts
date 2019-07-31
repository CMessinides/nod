import { ClientError } from "../lib/types";
import { ServerResponse } from "http";

export interface ApiClient {
	request<R = {}>(opts: ApiRequestOpts): Promise<ApiResponse<R>>;
}

interface ApiRequestOpts {
	query: string;
	res: ServerResponse;
	variables?: any;
	options?: RequestInit;
}

interface ApiResponse<R = {}> {
	data: R | {};
	error: ClientError | null;
}
