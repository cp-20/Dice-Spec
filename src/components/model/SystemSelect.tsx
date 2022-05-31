import type { FC } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import { Select } from '@/components/ui/Select';
import { configContext } from '@/pages/dice';
import type { BCDice } from '@/typings/bcdice';

export const SystemSelect: FC = () => {
  const { config, setConfig } = useContext(configContext);
  const [data, setData] = useState<BCDice.gameSystemResponse | null>(null);
  const active = useRef(config.system.id);

  useEffect(() => {
    if (data === null) {
      fetch(config.apiServer + '/v2/game_system', { keepalive: true })
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [config.apiServer, data]);

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
          }
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
