import { FC } from 'react';

import styles from './AuthForm.module.scss';

import Button from '@/components/Button/Button';

interface AuthFormProps {
    handleSubmit: () => void
    children: JSX.Element | JSX.Element[]
    button: string
    loading: boolean
    isValid: boolean
}

const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit, button, loading, isValid }) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {children}
      <Button
        type='submit'
        text={button}
        fullPage={true}
        loading={loading}
        disabled={!isValid}
      />
    </form>
  );
};

export default AuthForm;