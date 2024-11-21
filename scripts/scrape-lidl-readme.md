# Lidl Web Scraping Script

## Overview

A Puppeteer-based script for extracting links from Lidl.it product pages and sending them to a Huginn webhook.

## Features

- Scrapes links from Lidl.it pages
- Normalizes URLs automatically
- Sends extracted links to a predefined Webhook Agent

## Dependencies

- `axios`
- `puppeteer`

## Usage

This script is designed to be used with the Puppeteer API Server. It expects:
- A browser instance
- A URL (either full Lidl URL or partial path)

### Webhook Integration

Sends extracted links to an Huginn WebHook agent

## Logging

Provides detailed console logging for:
- URL normalization
- Page navigation
- Link extraction
- Webhook payload
- Webhook response

## Error Handling

Catches and logs any errors during the webhook call

## License

GPL-3.0
