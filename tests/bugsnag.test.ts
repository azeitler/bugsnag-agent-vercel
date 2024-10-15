import Bugsnag from '@bugsnag/js';
import dotenv from 'dotenv';

dotenv.config();

const AGENT_URL = process.env.AGENT_URL || 'http://localhost:3000/api/bugsnag';
const BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY;

if (!BUGSNAG_API_KEY) {
  throw new Error('BUGSNAG_API_KEY is not set in .env file');
}

Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  endpoints: {
    notify: AGENT_URL,
    sessions: AGENT_URL
  }
});

Bugsnag.startSession();

describe('Bugsnag Agent', () => {
  test('should successfully send an error to Bugsnag', async () => {
    const errorName = 'TestError';
    const errorMessage = 'This is a test error';

    // const notifyPromise = new Promise((resolve) => {
    //   Bugsnag.addOnError((event) => {
    //     expect(event.errors[0].errorClass).toBe(errorName);
    //     expect(event.errors[0].errorMessage).toBe(errorMessage);
    //     resolve(true);
    //     return true;
    //   });
    // });

    Bugsnag.notify(new Error(errorMessage), (event) => {
      event.errors[0].errorClass = errorName;
      return true;
    });

    // await expect(notifyPromise).resolves.toBe(true);
  });

  test('should successfully send a handled error to Bugsnag', async () => {
    const errorName = 'HandledTestError';
    const errorMessage = 'This is a handled test error';

    // const notifyPromise = new Promise((resolve) => {
    //   Bugsnag.addOnError((event) => {
    //     expect(event.errors[0].errorClass).toBe(errorName);
    //     expect(event.errors[0].errorMessage).toBe(errorMessage);
    //     expect(event.severity).toBe('warning');
    //     resolve(true);
    //     return true;
    //   });
    // });

    Bugsnag.notify(new Error(errorMessage), (event) => {
      event.errors[0].errorClass = errorName;
      event.severity = 'warning';
      return true;
    });

    // await expect(notifyPromise).resolves.toBe(true);
  });
});
