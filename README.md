# n8n-nodes-pyats-ro-api

[![npm version](https://badge.fury.io/js/n8n-nodes-pyats-ro-api.svg)](https://www.npmjs.com/package/n8n-nodes-pyats-ro-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-community%20node-ff6d5a)](https://www.n8n.io/)
[![CI](https://github.com/JeromeMassey/n8n-nodes-pyats-ro-api/actions/workflows/ci.yml/badge.svg)](https://github.com/JeromeMassey/n8n-nodes-pyats-ro-api/actions/workflows/ci.yml)

This is an n8n community node that integrates with the PyATS Show Command API. It lets you execute show commands on network devices (Cisco routers, switches, firewalls) in your n8n workflows.

The PyATS Show Command API allows you to execute read-only show commands on Cisco network devices via PyATS/Unicon framework with support for multiple device types and output filtering.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Version History](#version-history)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

For users on n8n v0.187+, your instance owner can install this node from **Settings** > **Community Nodes**.

Use `n8n-nodes-pyats-ro-api` as the npm package name.

### Manual Installation

To get started, install the package in your n8n root directory:

```bash
npm install n8n-nodes-pyats-ro-api
```

For Docker-based deployments, add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):

```
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-pyats-ro-api
```

## Operations

This node supports the following operations:

### Command Resource

- **Execute**: Execute show commands on one or more network devices
  - Support for multiple devices and commands
  - Pipe filtering (include, exclude, begin, section)
  - Configurable timeout
  - Optional jumphost support

### Health Resource

- **Check**: Check API health and version

### Jumphost Resource

- **Test Connection**: Test SSH jumphost connectivity before executing commands

### Info Resource

- **Get Supported OS**: List all supported device operating systems
- **Get Pipe Options**: List all available pipe filter options

## Credentials

This node requires the **PyATS RO API** credentials:

- **API Base URL**: The base URL of your PyATS Show Command API (default: `http://localhost:8000`)

### Setting up credentials

1. In n8n, go to **Credentials** > **New**
2. Search for "PyATS RO API"
3. Enter your API base URL
4. Click **Save**

**Note**: The current version of the PyATS Show Command API does not require authentication. Device credentials are passed per-request as part of the command execution.

### Prerequisites

You must have a PyATS Show Command API server running. See the [PyATS Show Command API documentation](https://github.com/org/repo) for installation instructions.

## Compatibility

- Minimum n8n version: 0.187.0
- Tested against: n8n v1.0+
- PyATS Show Command API: v1.0.0

## Usage

### Basic Example: Execute Show Command

1. Add the **PyATS Show Command API** node to your workflow
2. Select your credentials
3. Choose **Command** as the resource
4. Choose **Execute** as the operation
5. Add a device:
   - Hostname: `192.168.1.1`
   - Username: `admin`
   - Password: `cisco123`
   - Operating System: `Cisco IOS-XE`
6. Add a command:
   - Show Command: `show version`
7. Execute the workflow

### Advanced Example: Multiple Devices with Pipe Filters

Execute commands on multiple devices with output filtering:

1. Add multiple devices with different credentials
2. Add a command with pipe filter:
   - Show Command: `show ip interface brief`
   - Use Pipe Filter: `true`
   - Pipe Option: `Include`
   - Pattern: `up`
3. Add another command:
   - Show Command: `show running-config`
   - Use Pipe Filter: `true`
   - Pipe Option: `Section`
   - Pattern: `interface`

### Example: Testing Jumphost

Before executing commands through a jumphost:

1. Select **Jumphost** as the resource
2. Choose **Test Connection** as the operation
3. Enter jumphost details:
   - Host: `jumphost.example.com`
   - Username: `jumpuser`
   - SSH Key Path: `/root/.ssh/jumphost_key`
   - Port: `22`
4. Execute to verify connectivity

### Supported Device OS Types

- Cisco IOS
- Cisco IOS-XE
- Cisco IOS-XR
- Cisco NX-OS
- Cisco ASA

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [PyATS/Unicon Documentation](https://developer.cisco.com/docs/pyats/)
- [Cisco PyATS Getting Started](https://pubhub.devnetcloud.com/media/genie-docs/docs/userguide/index.html)
- [n8n Documentation](https://docs.n8n.io/)
- [Report Issues](https://github.com/JeromeMassey/n8n-nodes-pyats-ro-api/issues)

## Version History

See [CHANGELOG.md](CHANGELOG.md) for a complete version history.

### 0.1.0 (2025-01-01)

- Initial release
- Execute show commands on network devices
- Support for multiple devices and commands
- Pipe filtering capabilities (include, exclude, begin, section)
- Health check endpoint
- Jumphost connectivity testing
- Support for Cisco IOS, IOS-XE, IOS-XR, NX-OS, and ASA

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

For security issues, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author

**Jerome Massey**
- Email: jerome@masseyhouse.org
- GitHub: [@JeromeMassey](https://github.com/JeromeMassey)

## Acknowledgments

- Built with [n8n](https://n8n.io/)
- Powered by [Cisco PyATS](https://developer.cisco.com/docs/pyats/)
- Inspired by the n8n community
### 0.1.0 (2025-01-01)

- Initial release
- Execute show commands on network devices
- Support for multiple devices and commands
- Pipe filtering capabilities
- Health check endpoint
- Jumphost testing
- Support for Cisco IOS, IOS-XE, IOS-XR, NX-OS, and ASA
