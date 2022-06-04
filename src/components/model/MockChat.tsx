import { Avatar } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

export const MockChat: FC<{ color: string }> = ({ color }) => {
  const [t] = useTranslation('ccfolia');

  return (
    <>
      <div className="flex space-x-4 rounded-md bg-[#2a2a2a] p-4">
        <Avatar />
        <div>
          <p>
            <span style={{ color }}>{t('chat.name')}</span>
            <span className="text-[#757575]"> - {t('chat.time')}</span>
          </p>
          <p className="text-white">{t('chat.content')}</p>
        </div>
      </div>
    </>
  );
};
