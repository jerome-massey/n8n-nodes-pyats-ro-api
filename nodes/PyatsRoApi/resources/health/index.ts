import type { INodeProperties } from 'n8n-workflow';

const showOnlyForHealth = {
	resource: ['health'],
};

export const healthDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForHealth,
		},
		options: [
			{
				name: 'Check',
				value: 'check',
				action: 'Check API health',
				description: 'Check API health and version',
				routing: {
					request: {
						method: 'GET',
						url: '/health',
					},
				},
			},
		],
		default: 'check',
	},
];
