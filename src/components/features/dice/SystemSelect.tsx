import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';
import { Select } from '@/components/ui/Select';
import type { BCDice } from '@/typings/bcdice';

export const SystemSelect: FC = () => {
  const [t] = useTranslation('dice');
  const [config, setConfig] = useDiceConfig();

  const toast = useToast();
  const [data, setData] = useState<BCDice.gameSystemResponse | null>(null);
  const active = useRef(config.system.id);

  useEffect(() => {
    active.current = config.system.id;
  }, [config]);

  useEffect(() => {
    if (data === null) {
      fetch(config.apiServer + '/v2/game_system', { keepalive: true })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => {
          console.error(err);
          toast({
            title: t('errors.notFound'),
            status: 'error',
            isClosable: true,
          });
        });
    }
  }, [config.apiServer, data, t, toast]);

  const onChange = (key: string) => {
    if (setConfig) {
      fetch(config.apiServer + '/v2/game_system/' + key, { keepalive: true })
        .then((res) => res.json())
        .then((res: BCDice.gameSystemInfoResponse) => {
          if (res.ok) {
            setConfig({
              ...config,
              system: {
                id: res.id,
                name: res.name,
                command_pattern: new RegExp(res.command_pattern),
                help_message: res.help_message,
              },
            });
          } else {
            toast({
              title: t('errors.other'),
              status: 'error',
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: t('errors.notFound'),
            status: 'error',
            isClosable: true,
          });
        });
    }
  };

  return (
    <>
      {data ? (
        <Select
          items={data.game_system.map((item) => ({ key: item.id, value: item.name }))}
          active={active}
          onChange={onChange}
        />
      ) : (
        <Select items={[{ key: config.system.id, value: config.system.name }]} active={active} />
      )}
    </>
  );
};
