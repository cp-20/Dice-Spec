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
import { useContext } from 'react';
import { FaCog } from 'react-icons/fa';

import { FormLabel } from '@/components/ui/FormLabel';
import { configContext } from '@/pages/dice';

const FormInput: FC<{ children: ReactNode; onChange: (input: string) => void; defaultValue: string }> = ({
  children,
  onChange,
  defaultValue,
}) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>
    <Input onChange={(e) => onChange(e.target.value)} defaultValue={defaultValue} />
  </FormControl>
);

const FormSwitch: FC<{ children: ReactNode; onChange: (input: boolean) => void; defaultChecked: boolean }> = ({
  children,
  onChange,
  defaultChecked,
}) => (
  <FormControl className="inline-flex flex-1 items-center px-4 py-2">
    <FormLabel className="!inline-block min-w-[10rem] flex-1">{children}</FormLabel>
    <Switch onChange={(e) => onChange(e.target.checked)} defaultChecked={defaultChecked} />
  </FormControl>
);

const FormSlider: FC<{ children: ReactNode; onChange: (input: number) => void; defaultValue: number }> = ({
  children,
  onChange,
  defaultValue,
}) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>
    <Slider defaultValue={defaultValue} onChangeEnd={(value) => onChange(value)}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </FormControl>
);

export const AdvancedSettings: FC = () => {
  const [t] = useTranslation('dice');
  const { config, setConfig } = useContext(configContext);

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
                defaultChecked={config.help}
              >
                {t('form.settings.help')}
              </FormSwitch>
              <FormSwitch
                onChange={(input: boolean) => setConfig && setConfig({ ...config, sound: input })}
                defaultChecked={config.sound}
              >
                {t('form.settings.sound')}
              </FormSwitch>
            </div>
            <div className="space-y-6 px-4 py-4">
              <FormSlider
                onChange={(input) => setConfig && setConfig({ ...config, volume: input })}
                defaultValue={config.volume}
              >
                {t('form.settings.volume')}
              </FormSlider>
              <FormInput
                onChange={(input) => setConfig && setConfig({ ...config, apiServer: input })}
                defaultValue={config.apiServer}
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
