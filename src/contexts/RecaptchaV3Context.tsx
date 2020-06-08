import React from 'react';
import { ReCaptchaInstance } from 'recaptcha-v3';

export type RecaptchaV3Instance = ReCaptchaInstance | null;

export const RecaptchaV3Context = React.createContext<RecaptchaV3Instance>(
  null
);
