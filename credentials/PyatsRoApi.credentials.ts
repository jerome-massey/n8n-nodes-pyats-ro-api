import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PyatsRoApi implements ICredentialType {
	name = 'pyatsRoApi';

	displayName = 'PyATS RO API';

	icon: Icon = 'file:../nodes/PyatsRoApi/pyatsRoApi.svg';

	documentationUrl = 'https://github.com/org/repo';

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://localhost:8000',
			placeholder: 'http://localhost:8000',
			description: 'The base URL of the PyATS Show Command API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				// Currently no authentication required
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/health',
			method: 'GET',
		},
	};
}
