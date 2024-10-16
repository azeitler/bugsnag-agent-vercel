# Bugsnag Agent for Vercel

This project implements a Bugsnag Agent using Vercel Functions and TypeScript. It acts as a proxy between your application and Bugsnag, allowing you to forward error reports to Bugsnag without exposing your API key or introducing latency in your main application.

## Features

- Forwards error reports to Bugsnag
- Handles CORS for cross-origin requests
- Provides a status endpoint
- Includes tests using the `bugsnag-js` library

## Prerequisites

- Node.js 20.11 or later
- Yarn package manager
- A Bugsnag account and API key

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/bugsnag-agent-vercel.git
   cd bugsnag-agent-vercel
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   BUGSNAG_API_KEY=your_bugsnag_api_key_here
   AGENT_URL=http://localhost:3000
   ```
   Replace `your_bugsnag_api_key_here` with your actual Bugsnag API key.

## Running Locally

1. Start the Vercel development server:
   ```
   yarn start
   ```

2. The agent will be available at `http://localhost:3000/api/bugsnag`

## Running Tests

1. Make sure the Vercel development server is running.
2. In a separate terminal, run:
   ```
   yarn test
   ```

## Deployment

1. Make sure you have the Vercel CLI installed and are logged in.
2. Deploy to Vercel:
   ```
   yarn deploy
   ```

3. Note the deployed URL for your Bugsnag Agent.

## Usage in Your Application

To use this Bugsnag Agent in your application:

1. Install the Bugsnag library for your platform (e.g., `@bugsnag/js` for JavaScript).
2. Initialize Bugsnag with your API key and set the `endpoints.notify` and `endpoints.sessions` options to your deployed Vercel function URL.

Example for a JavaScript application:

```javascript
import Bugsnag from '@bugsnag/js'

Bugsnag.start({
  apiKey: 'YOUR_API_KEY',
  endpoints: {
    notify: 'https://your-vercel-function-url',
    sessions: 'https://your-vercel-function-url'
  }
})
```

Replace `'https://your-vercel-function-url'` with the actual URL of your deployed Vercel project.

## Project Structure

- `api/bugsnag.ts`: Main Vercel Function that handles requests and forwards them to Bugsnag
- `tests/bugsnag.test.ts`: Test file for the Bugsnag Agent
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `vercel.json`: Vercel deployment configuration
- `jest.config.js`: Jest testing framework configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
