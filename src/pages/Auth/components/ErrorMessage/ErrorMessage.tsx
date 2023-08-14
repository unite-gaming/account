import { FC } from 'react';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
  return (
    <span className={styles.error} title={message}>{message}</span>
  );
};

export default ErrorMessage;