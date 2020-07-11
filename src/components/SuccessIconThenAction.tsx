import React, { FC, useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import { cssTheme } from '../helpers/constants';

interface Props {
  delayedCallback: () => void;
  delayAmount?: number;
}

export const SuccessIconThenAction: FC<Props> = ({
  delayAmount = 1000,
  delayedCallback,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      delayedCallback();
    }, delayAmount);
    return () => clearTimeout(timer);
  }, [delayAmount, delayedCallback]);

  return (
    <FiCheckCircle
      color={cssTheme.colors.green}
      size={cssTheme.sizes.errorIcon}
    />
  );
};
