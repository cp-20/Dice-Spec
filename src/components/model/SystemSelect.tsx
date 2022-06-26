import { useToast } from '@chakra-ui/react';
import type GameSystemClass from 'bcdice/lib/game_system';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import type { diceAPI } from '@/components/functional/useDiceRoll';
import { Select } from '@/components/ui/Select';
import { configContext } from '@/pages/dice';
import type { diceConfig } from '@/typings/diceConfig';

export const SystemSelect: FC<{ config: diceConfig; diceAPI: diceAPI }> = ({ config, diceAPI }) => {
  const [t] = useTranslation('dice');
  const toast = useToast();
  const { setConfig } = useContext(configContext);
  const active = useRef(config.system.id);

  const availableSystems = () => {
    if (diceAPI.loaded) {
      const systems = diceAPI.loader.listAvailableGameSystems();
      systems.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
      return systems;
    } else {
      return [];
    }
  };
  const setConfigSystem = (system: GameSystemClass) => {
    setConfig?.({
      ...config,
      system: {
        id: system.ID,
        name: system.NAME,
        command_pattern: new RegExp(system.COMMAND_PATTERN),
        help_message: system.HELP_MESSAGE,
      },
    });
  };

  useEffect(() => {
    active.current = config.system.id;
  }, [config]);

  const onChange = (key: string) => {
    if (diceAPI.loaded) {
      if (diceAPI.loader.listLoadedGameSystems().find((system) => system.ID === key) !== undefined) {
        const system = diceAPI.loader.getGameSystemClass(key);
        setConfigSystem(system);
      } else {
        diceAPI.loader.dynamicLoad(key).then((system) => {
          setConfigSystem(system);
        });
      }
    } else {
      toast({
        title: t('errors.notLoaded'),
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <>
      {diceAPI.loaded ? (
        <Select
          items={availableSystems().map((item) => ({ key: item.id, value: item.name }))}
          active={active}
          onChange={onChange}
        />
      ) : (
        <Select items={[{ key: config.system.id, value: config.system.name }]} active={active} />
      )}
    </>
  );
};
