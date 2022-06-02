import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FaCog } from 'react-icons/fa';

import { FormLabel } from '@/components/ui/FormLabel';
import { configContext } from '@/pages/dice';
import type { diceConfig } from '@/typings/diceConfig';

const FormInput: FC<{ children: ReactNode; onChange: (input: string) => void; value: string }> = ({
  children,
  onChange,
  value,
}) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>
    <Input onChange={(e) => onChange(e.target.value)} value={value} />
  </FormControl>
);

const FormSwitch: FC<{ children: ReactNode; onChange: (input: boolean) => void; checked: boolean }> = ({
  children,
  onChange,
  checked,
}) => {
  return (
    <FormControl className="inline-flex flex-1 items-center px-4 py-2">
      <FormLabel className="!inline-block min-w-[10rem] flex-1">{children}</FormLabel>
      <Switch onChange={(e) => onChange(e.target.checked)} isChecked={checked} />
    </FormControl>
  );
};

const FormSlider: FC<{
  children: ReactNode;
  onChange: (input: number) => void;
  onChangeEnd: (input: number) => void;
  value: number;
}> = ({ children, onChange, onChangeEnd, value }) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>
    <Slider value={value} onChange={onChange} onChangeEnd={onChangeEnd}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </FormControl>
);

export const AdvancedSettings: FC<{ config: diceConfig }> = ({ config }) => {
  const [t] = useTranslation('dice');
  const { setConfig } = useContext(configContext);
  const [volume, setVolume] = useState(config.volume);

  useEffect(() => {
    setVolume(config.volume);
  }, [config.volume]);

  return (
    <>
      <Accordion allowToggle className="my-8">
        <AccordionItem>
          <AccordionButton className="flex items-center space-x-1">
            <FaCog className="inline" />
            <span className="flex-1 text-left">{t('form.settings.title')}</span>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex flex-wrap">
              <FormSwitch
                onChange={(input: boolean) => setConfig && setConfig({ ...config, help: input })}
                checked={config.help}
              >
                {t('form.settings.help')}
              </FormSwitch>
              <FormSwitch
                onChange={(input: boolean) => setConfig && setConfig({ ...config, sound: input })}
                checked={config.sound}
              >
                {t('form.settings.sound')}
              </FormSwitch>
            </div>
            <div className="space-y-6 px-4 py-4">
              <FormSlider
                onChange={(input) => setVolume(input)}
                onChangeEnd={(input) => setConfig && setConfig({ ...config, volume: input })}
                value={volume}
              >
                {t('form.settings.volume')}
              </FormSlider>
              <FormInput
                onChange={(input) => setConfig && setConfig({ ...config, apiServer: input })}
                value={config.apiServer}
              >
                {t('form.settings.apiServer')}
              </FormInput>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
