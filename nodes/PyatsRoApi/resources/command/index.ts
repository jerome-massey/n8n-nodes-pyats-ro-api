import type { INodeProperties } from 'n8n-workflow';
import { executeCommandDescription } from './execute';

const showOnlyForCommands = {
	resource: ['command'],
};

export const commandDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCommands,
		},
		options: [
			{
				name: 'Execute',
				value: 'execute',
				action: 'Execute show commands on devices',
				description: 'Execute show commands on one or more network devices',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/execute',
					},
				},
			},
		],
		default: 'execute',
	},
	...executeCommandDescription,
];
