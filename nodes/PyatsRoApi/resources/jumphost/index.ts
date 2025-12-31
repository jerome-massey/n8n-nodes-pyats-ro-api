import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJumphost = {
	resource: ['jumphost'],
};

export const jumphostDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForJumphost,
		},
		options: [
			{
				name: 'Test Connection',
				value: 'test',
				action: 'Test jumphost connectivity',
				description: 'Test SSH jumphost connection',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/jumphost/test',
					},
				},
			},
		],
		default: 'test',
	},
	{
		displayName: 'Host',
		name: 'host',
		type: 'string',
		displayOptions: {
			show: showOnlyForJumphost,
		},
		default: '',
		required: true,
		placeholder: 'e.g. jumphost.example.com',
		description: 'Jumphost hostname or IP address',
		routing: {
			send: {
				type: 'body',
				property: 'jumphost.host',
			},
		},
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		displayOptions: {
			show: showOnlyForJumphost,
		},
		default: '',
		required: true,
		description: 'SSH username for jumphost',
		routing: {
			send: {
				type: 'body',
				property: 'jumphost.username',
			},
		},
	},
	{
		displayName: 'SSH Key Path',
		name: 'key_path',
		type: 'string',
		displayOptions: {
			show: showOnlyForJumphost,
		},
		default: '',
		required: true,
		placeholder: 'e.g. /root/.ssh/jumphost_key',
		description: 'Path to SSH private key file',
		routing: {
			send: {
				type: 'body',
				property: 'jumphost.key_path',
			},
		},
	},
	{
		displayName: 'Port',
		name: 'port',
		type: 'number',
		displayOptions: {
			show: showOnlyForJumphost,
		},
		default: 22,
		description: 'SSH port number',
		routing: {
			send: {
				type: 'body',
				property: 'jumphost.port',
			},
		},
	},
];
