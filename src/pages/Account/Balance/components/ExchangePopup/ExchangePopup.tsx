import { FC, useState } from 'react';
import classNames from 'classnames';

import { PopupProps } from '@/core/interfaces/PopupProps';

import Popup from '@/components/Popup/Popup';
import LayoutBlock from '@/components/LayoutBlock/LayoutBlock';
import Button from '@/components/Button/Button';
import styles from './ExchangePopup.module.scss';

type ICoins = {
  [key in 'scores' | 'tickets']: {
    title: string;
    name: string;
    label: string;
  };
};

const coins: ICoins = {
  scores: {
    title: 'Обменять баланс на баллы',
    name: 'балл UG',
    label: 'баллы UG',
  },
  tickets: {
    title: 'Обменять баланс на билеты',
    name: 'билет',
    label: 'билеты',
  },
};

interface ExchangePopupProps extends PopupProps {
  title: keyof ICoins;
  rate: number;
  balance: number | string;
}

const ExchangePopup: FC<ExchangePopupProps> = ({ title, handleClose, isOpen, rate, balance }) => {
  const [value, setValue] = useState(rate);
  const [isConfirm, setConfirm] = useState(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isConfirm) { /* empty */ } else {
      setConfirm(true);
    }
  };

  const cancel = () => {
    if (isConfirm) {
      setConfirm(false);
    } else {
      handleClose();
    }
  };

  return (
    <Popup isOpen={isOpen} handleClose={handleClose}>
      <LayoutBlock title={isConfirm ? 'ПодТВЕРЖДЕНИЕ' : coins[title].title}>
        {isConfirm ? (
          <h3 className={styles.title}>Подтвердите платеж</h3>
        ) : (
          <p className={styles.rate}>
            1 {coins[title].name} равно
            <span>{rate} TMT</span>
          </p>
        )}
        <form
          className={classNames(
            styles.form,
            { [styles.confim]: isConfirm },
          )}
          onSubmit={handleSubmit}
        >
          <div className={styles.inputs}>
            <label className={styles.label}>
              <span className={styles.text}>Основной баланс</span>
              <input
                className={styles.input}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                type='number'
                min={rate}
                step={rate}
                disabled={isConfirm}
              />
              <span className={classNames(styles.coin, styles.main)} />
            </label>
            {isConfirm && (
              <span className={styles.exchangeIcon} />
            )}
            <label className={styles.label}>
              <span className={styles.text}>{coins[title].label}</span>
              <input
                className={styles.input}
                value={value / rate}
                onChange={(e) => setValue(Number(e.target.value) * rate)}
                type='number'
                min={1}
                step={1}
                disabled={isConfirm}
              />
              <span className={classNames(styles.coin, styles[title])} />
            </label>
          </div>
          {isConfirm && (
            <p className={styles.balance}>
              <span className={styles.text}>
                Текущий баланс: {balance} TMT
              </span>
            </p>
          )}
          <div className={styles.buttons}>
            <Button
              type='button'
              text='Отмена'
              className={styles.buttonGray}
              handleClick={cancel}
            />
            <Button
              type='submit'
              text='Подтвердить'
              className={styles.submit}
            />
          </div>
        </form>
      </LayoutBlock>
    </Popup>
  );
};

export default ExchangePopup;