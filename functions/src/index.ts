/**
 * Cloud Functions entrypoint (v2).
 * Simple health check: GET /ping -> "pong"
 */
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import * as logger from 'firebase-functions/logger';

// Global defaults for all functions (optional region)
setGlobalOptions({ maxInstances: 10 /*, region: "us-central1" */ });

export const ping = onRequest((req, res) => {
  logger.info('ping called');
  res.status(200).send('pong');
});
