import sgMail from '@sendgrid/mail';

import {SENDGRID_API_KEY, BASE_PATH} from '../config/index';
import {logger} from '../utils/logger';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendVerificationEmail = (email, token) => {
  const hostUrl = BASE_PATH;

  const details = {
    to: email,
    from: 'devslab.io@gmail.com',
    subject: 'Account Verification',
    html: `
    <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:40% !important;width:40%;height:auto !important;" src="https://res.cloudinary.com/dzd4zdo5g/image/upload/v1556791526/shopable_logo.svg" alt="" width="240">
    <div style="text-align: center;"><strong><span style="font-size:28px;">👋 Quick Reminder</span></strong></div>
    <div style="text-align: center;"><span style="font-size:18px;">Click on this link to verify your email ${hostUrl}/auth/verify/${token}</span></div>

    <div style="text-align: center;">&nbsp;</div>

    <div style="text-align: center;"><span style="font-size:18px;">Much&nbsp; ❤️ from the Shopable team</span></div>
    <a style="background-color:#84D8EA;border:1px solid #333333;border-color:#22c7d6;border-radius:2px;border-width:1px;color:#ffffff;display:inline-block;font-family:verdana,geneva,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0px;line-height:40px;padding:05px 30px 05px 30px;text-align:center;text-decoration:none" href="" target="_blank">Confirm Delivery</a>
    <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://s3.amazonaws.com/static.sendgrid.com/12fe351d-3b40-4f77-b0c6-a477bf6b23a7.png" alt="" width="600">
    `,
  };
  logger.info('sending verification email....');
  return sgMail.send(details);
};
