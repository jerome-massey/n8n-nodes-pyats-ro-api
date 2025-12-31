import type { INodeProperties } from 'n8n-workflow';

const showOnlyForExecute = {
	operation: ['execute'],
	resource: ['command'],
};

export const executeCommandDescription: INodeProperties[] = [
	{
		displayName: 'Devices',
		name: 'devices',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Device',
		},
		displayOptions: {
			show: showOnlyForExecute,
		},
		default: {},
		placeholder: 'Add Device',
		options: [
			{
				name: 'deviceValues',
				displayName: 'Device',
				values: [
					{
						displayName: 'Enable Password',
						name: 'enable_password',
						type: 'string',
						typeOptions: {
							password: true,
						},
						default: '',
						description: 'Enable password if required by the device',
					},
					{
						displayName: 'Hostname',
						name: 'hostname',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'e.g. 192.168.1.1',
						description: 'Device IP address or hostname',
					},
					{
						displayName: 'Operating System',
						name: 'os',
						type: 'options',
						options: [
							{
								name: 'Cisco ASA',
								value: 'asa',
							},
							{
								name: 'Cisco IOS',
								value: 'ios',
							},
							{
								name: 'Cisco IOS-XE',
								value: 'iosxe',
							},
							{
								name: 'Cisco IOS-XR',
								value: 'iosxr',
							},
							{
								name: 'Cisco NX-OS',
								value: 'nxos',
							},
						],
						default: 'iosxe',
						required: true,
						description: 'Device operating system type',
					},
					{
						displayName: 'Password',
						name: 'password',
						type: 'string',
						typeOptions: {
							password: true,
						},
						default: '',
						required: true,
						description: 'Device SSH password',
					},
					{
						displayName: 'Port',
						name: 'port',
						type: 'number',
						default: 22,
						description: 'SSH port number',
					},
					{
						displayName: 'Username',
						name: 'username',
						type: 'string',
						default: '',
						required: true,
						description: 'Device SSH username',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'devices',
				value: '={{$value.deviceValues}}',
			},
		},
	},
	{
		displayName: 'Commands',
		name: 'commands',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Command',
		},
		displayOptions: {
			show: showOnlyForExecute,
		},
		default: {},
		placeholder: 'Add Command',
		options: [
			{
				name: 'commandValues',
				displayName: 'Command',
				values: [
					{
						displayName: 'Show Command',
						name: 'command',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'e.g. show version',
						description: 'Show command to execute (only "show" commands are allowed)',
					},
					{
						displayName: 'Use Pipe Filter',
						name: 'usePipe',
						type: 'boolean',
						default: false,
						description: 'Whether to apply a pipe filter to the command output',
					},
					{
						displayName: 'Pipe Option',
						name: 'pipeOption',
						type: 'options',
						displayOptions: {
							show: {
								usePipe: [true],
							},
						},
						options: [
							{
								name: 'Include',
								value: 'include',
								description: 'Include lines matching pattern',
							},
							{
								name: 'Exclude',
								value: 'exclude',
								description: 'Exclude lines matching pattern',
							},
							{
								name: 'Begin',
								value: 'begin',
								description: 'Begin output at pattern',
							},
							{
								name: 'Section',
								value: 'section',
								description: 'Show section matching pattern',
							},
						],
						default: 'include',
						description: 'Type of pipe filter to apply',
					},
					{
						displayName: 'Pattern',
						name: 'pattern',
						type: 'string',
						displayOptions: {
							show: {
								usePipe: [true],
							},
						},
						default: '',
						required: true,
						placeholder: 'e.g. up',
						description: 'Pattern to match for the pipe filter',
					},
				],
			},
		],
		routing: {
			send: {
				preSend: [
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					async function (this: any, requestOptions: any): Promise<any> {
						const commandValues = this.getNodeParameter('commands.commandValues', 0, []) as Array<{
							command: string;
							usePipe?: boolean;
							pipeOption?: string;
							pattern?: string;
						}>;

						const commands = commandValues.map((cmd) => {
							if (cmd.usePipe && cmd.pipeOption && cmd.pattern) {
								return {
									command: cmd.command,
									pipe: {
										option: cmd.pipeOption,
										pattern: cmd.pattern,
									},
								};
							}
							return { command: cmd.command };
						});

						requestOptions.body = {
							...requestOptions.body,
							commands,
						};

						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: showOnlyForExecute,
		},
		options: [
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 30,
				description: 'Command timeout in seconds',
				routing: {
					send: {
						type: 'body',
						property: 'timeout',
					},
				},
			},
			{
				displayName: 'Use Jumphost',
				name: 'use_jumphost',
				type: 'boolean',
				default: false,
				description: 'Whether to use global jumphost configuration (requires environment variables)',
				routing: {
					send: {
						type: 'body',
						property: 'use_jumphost',
					},
				},
			},
		],
	},
];
