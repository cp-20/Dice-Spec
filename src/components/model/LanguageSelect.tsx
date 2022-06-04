import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useRef } from 'react';

import { Select } from '@/components/ui/Select';

export const LanguageSelect: FC = () => {
  const router = useRouter();
  const active = useRef(router.locale ?? 'ja');
  const languages = [
    { key: 'ja', value: '日本語' },
    { key: 'en', value: 'English' },
  ];
  return (
    <>
      <div className="relative w-40">
        <Select
          active={active}
          items={languages}
          onChange={(key) => router.push(router.pathname, undefined, { locale: key })}
        />
      </div>
    </>
  );
};
