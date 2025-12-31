import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { commandDescription } from './resources/command';
import { healthDescription } from './resources/health';
import { jumphostDescription } from './resources/jumphost';
import { infoDescription } from './resources/info';

export class PyatsRoApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PyATS Show Command API',
		name: 'pyatsRoApi',
		icon: { light: 'file:pyatsRoApi.svg', dark: 'file:pyatsRoApi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Execute show commands on network devices via PyATS/Unicon',
		defaults: {
			name: 'PyATS Show Command API',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'pyatsRoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Command',
						value: 'command',
						description: 'Execute show commands on devices',
					},
					{
						name: 'Health',
						value: 'health',
						description: 'Check API health',
					},
					{
						name: 'Jumphost',
						value: 'jumphost',
						description: 'Test jumphost connectivity',
					},
					{
						name: 'Info',
						value: 'info',
						description: 'Get API information',
					},
				],
				default: 'command',
			},
			...commandDescription,
			...healthDescription,
			...jumphostDescription,
			...infoDescription,
		],
	};
}
