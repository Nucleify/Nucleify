# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by emailing:

**nucleify@gmail.com**

Please do not open public issues for security-related reports.

While the discovery of new vulnerabilities is rare, we recommend always using the latest versions of Nucleify, its official modules, and companion libraries to ensure your application remains as secure as possible.

## Scope

This security policy applies to:
- Nucleify core
- Official Nucleify modules
- Official companion libraries

## Out of Scope

The following are not considered valid security issues:

- XSS via template expressions when untrusted content is intentionally used as a template compilation source.

This can only occur if the user knowingly uses untrusted content as a template compilation source. This is comparable to manually executing untrusted scripts in a browser console. Users are explicitly warned against this usage in the documentation.
