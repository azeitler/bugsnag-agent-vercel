import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const BUGSNAG_ENDPOINT = 'https://notify.bugsnag.com/';
const FORWARDED_HEADERS = [
  'bugsnag-sent-at',
  'bugsnag-api-key',
  'bugsnag-payload-version'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return handleCORS(res);
  }

  if (req.method === 'GET') {
    return handleStatus(res);
  }

  if (req.method === 'POST') {
    return handleBugsnagForward(req, res);
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}

function handleCORS(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.status(200).end();
}

function handleStatus(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'Bugsnag agent is running',
    endpoint: BUGSNAG_ENDPOINT
  });
}

async function handleBugsnagForward(req: VercelRequest, res: VercelResponse) {
  const body = req.body;
  const headers: Record<string, string> = {};

  FORWARDED_HEADERS.forEach(header => {
    const value = req.headers[header];
    if (value) headers[header] = Array.isArray(value) ? value[0] : value;
  });

  try {
    console.log("Forwarding to Bugsnag", body, headers);
    const response = await axios.post(BUGSNAG_ENDPOINT, body, { headers: headers });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      message: 'Successfully forwarded to Bugsnag',
      bugsnagStatus: response.status,
      bugsnagStatusText: response.statusText
    });
  } catch (error) {
    console.error('Error forwarding to Bugsnag:', error);
    res.status(500).json({ error: 'Failed to forward to Bugsnag' });
  }
}
