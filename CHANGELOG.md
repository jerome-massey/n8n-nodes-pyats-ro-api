# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2025-12-31

### Removed
- Removed jumphost resource and all related functionality
- Removed "Use Jumphost" option from command execution
- Cleaned up jumphost references from documentation

### Changed
- Updated to align with PyATS Show Command API that no longer supports jumphost functionality

## [0.1.0] - 2025-01-01

### Added
- Initial release of n8n-nodes-pyats-ro-api
- Execute show commands on network devices via PyATS/Unicon API
- Support for multiple devices and commands in a single operation
- Support for Cisco IOS, IOS-XE, IOS-XR, NX-OS, and ASA operating systems
- Pipe filtering options (include, exclude, begin, section)
- Configurable command timeout
- Health check endpoint
- Info endpoints for supported OS types and pipe options
- PyATS RO API credentials for base URL configuration
