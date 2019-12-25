import https from 'https';

import {logger} from '../utils/logger';

const sendNotification = (data) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  const options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers,
  };

  const request = https.request(options, (res) => {
    res.on('data', (data) => {
      console.log(`Response:  ${data}`);
    });
  });

  request.on('error', (e) => {
    console.log(e);
    logger.error(e);
  });

  request.write(JSON.stringify(data));
  request.end();
};

export default sendNotification;