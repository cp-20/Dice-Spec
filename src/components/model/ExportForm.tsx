import { Button, FormControl, FormHelperText, Input, Textarea, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { FaClipboard, FaInfoCircle } from 'react-icons/fa';

import { useExportForm } from '@/components/functional/useExportForm';
import { MockChat } from '@/components/model/MockChat';
import { MultipleInput } from '@/components/model/MultipleInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { NumberInput } from '@/components/ui/NumberInput';

const FormElement: FC<{ children: ReactNode; label: string; tips?: string }> = ({ children, label, tips }) => (
  <FormControl className="mb-8">
    <FormLabel className="!flex items-center space-x-2">
      <span>{label}</span>
      {tips && (
        <Tooltip label={tips}>
          <span className="inline-flex items-center">
            <FaInfoCircle className="inline" />
          </span>
        </Tooltip>
      )}
    </FormLabel>
    {children}
  </FormControl>
);

export type formData = {
  name: string;
  memo: string;
  initiative: number;
  externalUrl: string;
  status: { label: string; value: number; max: number }[];
  params: { label: string; value: string }[];
  color: string;
  commands: string;
};

export const ExportForm: FC = () => {
  const [t] = useTranslation('ccfolia');
  const [formData, setFormData] = useState<formData>({
    name: '',
    memo: '',
    initiative: 0,
    externalUrl: '',
    status: [],
    params: [],
    color: '#ccc',
    commands: '',
  });
  const { handleLoadFromClipboard, result } = useExportForm(formData, setFormData);

  return (
    <>
      <div className="mb-6">
        <Button className="w-full space-x-2" onClick={handleLoadFromClipboard}>
          <FaClipboard className="inline" />
          <span>{t('load_from_clipboard')}</span>
        </Button>
      </div>

      <form>
        <FormElement label={t('form.name')}>
          <Input
            value={formData.name}
            placeholder={t('form.name_placeholder')}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormElement>

        <FormElement label={t('form.memo')}>
          <Textarea
            value={formData.memo}
            placeholder={t('form.memo_placeholder')}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          />
        </FormElement>

        <FormElement label={t('form.initiative')} tips={t('form.initiative_tips')}>
          <NumberInput
            value={formData.initiative}
            onChange={(_, val) => setFormData({ ...formData, initiative: val })}
          />
        </FormElement>

        <FormElement label={t('form.externalUrl')} tips={t('form.externalUrl_tips')}>
          <Input
            value={formData.externalUrl}
            placeholder={t('form.externalUrl_placeholder')}
            onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
          />
        </FormElement>

        <FormElement label={t('form.status.title')} tips={t('form.status_tips')}>
          <FormHelperText className="my-2">{t('form.status_description')}</FormHelperText>
          <MultipleInput
            data={formData.status}
            getKey={(status) => status.label}
            addText={t('form.status.add')}
            removeText={t('form.status.delete')}
            addNode={() => {
              setFormData({
                ...formData,
                status: [...formData.status, { label: '', value: 0, max: 0 }],
              });
            }}
            removeNode={(index) => {
              setFormData({
                ...formData,
                status: formData.status.filter((_, i) => i !== index),
              });
            }}
            childNode={(status, index) => (
              <>
                <Input
                  value={status.label}
                  placeholder={t('form.status.label')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: formData.status.map((s, i) => (i === index ? { ...s, label: e.target.value } : s)),
                    })
                  }
                />
                <NumberInput
                  value={status.value}
                  max={status.max}
                  onChange={(_, val) =>
                    setFormData({
                      ...formData,
                      status: formData.status.map((s, i) => (i === index ? { ...s, value: val } : s)),
                    })
                  }
                />
                <NumberInput
                  value={status.max}
                  onChange={(_, val) =>
                    setFormData({
                      ...formData,
                      status: formData.status.map((s, i) => (i === index ? { ...s, max: val } : s)),
                    })
                  }
                />
              </>
            )}
          />
        </FormElement>

        <FormElement label={t('form.params.title')} tips={t('form.params_tips')}>
          <MultipleInput
            data={formData.params}
            getKey={(param) => param.label}
            addText={t('form.params.add')}
            removeText={t('form.params.delete')}
            addNode={() => {
              setFormData({
                ...formData,
                params: [...formData.params, { label: '', value: '' }],
              });
            }}
            removeNode={(index) => {
              setFormData({
                ...formData,
                params: formData.params.filter((_, i) => i !== index),
              });
            }}
            childNode={(param, index) => (
              <>
                <Input
                  value={param.label}
                  placeholder={t('form.params.label')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      params: formData.params.map((p, i) => (i === index ? { ...p, label: e.target.value } : p)),
                    })
                  }
                />
                <Input
                  value={param.value}
                  placeholder={t('form.params.value')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      params: formData.params.map((p, i) => (i === index ? { ...p, value: e.target.value } : p)),
                    })
                  }
                />
              </>
            )}
          />
        </FormElement>

        <FormElement label={t('form.color')} tips={t('form.color_tips')}>
          <MockChat color={formData.color} />
          <TwitterPicker
            className="mt-4"
            color={formData.color}
            onChangeComplete={(color) => setFormData({ ...formData, color: color.hex })}
          />
        </FormElement>

        <FormElement label={t('form.commands')} tips={t('form.commands_tips')}>
          <Textarea
            value={formData.commands}
            placeholder={t('form.commands_placeholder')}
            onChange={(e) => setFormData({ ...formData, commands: e.target.value })}
          />
        </FormElement>
      </form>

      <div className="my-8 flex justify-center">
        <div className="h-0 w-0 border-x-[4rem] border-t-[2rem] border-b-0 border-transparent border-t-[#e2e8f0]"></div>
      </div>

      <FormControl>
        <FormLabel>{t('form.output')}</FormLabel>
        <Textarea value={result} key={result} placeholder={t('form.output_placeholder')} readOnly />
      </FormControl>

      <div className="mt-2 mb-8">
        <Button
          className="w-full space-x-2"
          onClick={() => {
            navigator.clipboard.writeText(result);
          }}
        >
          <FaClipboard className="inline" />
          <span>{t('save_to_clipboard')}</span>
        </Button>
      </div>
    </>
  );
};
