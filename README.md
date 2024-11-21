# Puppeteer API Server

## Overview

This is a Node.js-based API server that allows dynamic execution of Puppeteer scripts for web scraping and automation tasks.

## Features

- Dynamic script execution via REST API
- Puppeteer-powered web scraping
- Containerized deployment

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+

## Installation

### Clone the Repository

```bash
git clone <your-repository-url>
cd puppeteer-api-server
```

### Build and Run

Using Docker Compose:

```bash
docker-compose up -d
```

## API Endpoint

### Run Script

- **URL**: `http://localhost:44444/run-script`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "script": "scriptName.js",
    "url": "/path/to/page"
  }
  ```

## Project Structure

- `server.js`: Express server handling script execution
- `Dockerfile`: Docker configuration for the application
- `docker-compose.yaml`: Docker Compose configuration
- `scripts/`: Directory for custom Puppeteer scripts
- `package.json`: Node.js project dependencies

## Writing Custom Scripts

Place Puppeteer scripts in the `scripts/` directory. Each script should export an async function that takes `browser` and `url` as parameters.

Example script structure:
```javascript
module.exports = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  // Perform scraping or automation tasks
  return results;
};
```

## Security

- Scripts run in a sandboxed environment
- URL normalization prevents arbitrary website access
- Runs with minimal Docker container privileges

## Logging

Server logs are output to the console, providing insights into script execution and potential errors.

## Troubleshooting

- Ensure Docker is running
- Check container logs: `docker-compose logs puppeteer`
- Verify script syntax and Puppeteer compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0). See the LICENSE file for details.

## Disclaimer

This tool is for educational and authorized testing purposes only. Always respect website terms of service and legal guidelines when web scraping.

## Author

[Il Gigante/Tana del Gigante]
```

