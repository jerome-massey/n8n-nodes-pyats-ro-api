import type { INodeProperties } from 'n8n-workflow';

const showOnlyForInfo = {
	resource: ['info'],
};

export const infoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForInfo,
		},
		options: [
			{
				name: 'Get Supported OS',
				value: 'supportedOs',
				action: 'Get list of supported operating systems',
				description: 'Get list of supported device operating systems',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/supported_os',
					},
				},
			},
			{
				name: 'Get Pipe Options',
				value: 'pipeOptions',
				action: 'Get list of pipe filter options',
				description: 'Get list of available pipe filter options',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/pipe_options',
					},
				},
			},
		],
		default: 'supportedOs',
	},
];
