import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { FaCog, FaUndoAlt } from 'react-icons/fa';

import { useDiceConfig } from '@/components/features/dice/diceConfigAtom';
import { FormLabel } from '@/components/ui/FormLabel';
import { initialConfig } from '@/pages/dice';

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

export const AdvancedSettings: FC = () => {
  const [t] = useTranslation('dice');
  const [config, setConfig] = useDiceConfig();

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
                onChange={(input) => setConfig({ ...config, volume: input })}
                onChangeEnd={(input) => setConfig && setConfig({ ...config, volume: input })}
                value={config.volume}
              >
                {t('form.settings.volume')}
              </FormSlider>
              <FormControl>
                <FormLabel>{t('form.settings.apiServer')}</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setConfig && setConfig({ ...config, apiServer: e.target.value })}
                    value={config.apiServer}
                  />
                  <InputRightElement>
                    <Tooltip label={t('form.settings.apiServer_restore')}>
                      <IconButton
                        icon={<FaUndoAlt />}
                        aria-label={t('form.settings.apiServer_restore')}
                        onClick={() => setConfig && setConfig({ ...config, apiServer: initialConfig.apiServer })}
                      />
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
