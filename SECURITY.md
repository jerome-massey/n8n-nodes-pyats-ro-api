# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this n8n community node, please report it by emailing jerome@masseyhouse.org.

**Please do not report security vulnerabilities through public GitHub issues.**

Include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Considerations

This node handles network device credentials and executes commands on network infrastructure. Users should:

1. **Use Secure Credentials Storage**: Always use n8n's credential management system, never hardcode credentials
2. **Network Security**: Ensure the PyATS API server is properly secured
3. **Access Control**: Restrict access to n8n instances using this node
4. **Command Validation**: The node only allows "show" commands for read-only operations
5. **SSL/TLS**: Use HTTPS for the PyATS API in production environments

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Known Limitations

- Device credentials are passed per-request to the PyATS API
- No authentication is currently required for the PyATS API itself
- Consider adding API authentication in production deployments
