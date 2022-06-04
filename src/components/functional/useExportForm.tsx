import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import type { formData } from '@/components/model/ExportForm';
import type { CharacterClipboardData } from '@/typings/ccfolia';

export const useExportForm = (formData: formData, setFormData: Dispatch<SetStateAction<formData>>) => {
  const [t] = useTranslation('ccfolia');
  const [result, setResult] = useState<string>('');
  const toast = useToast();

  const handleLoadFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        const { data: charaData } = JSON.parse(text) as CharacterClipboardData;

        setFormData({
          name: charaData.name ?? '',
          memo: charaData.memo ?? '',
          initiative: charaData.initiative ?? 0,
          externalUrl: charaData.externalUrl ?? '',
          status: charaData.status ?? [],
          params: charaData.params ?? [],
          color: charaData.color ?? '#ccc',
          commands: charaData.commands ?? '',
        });

        toast({
          title: t('load_from_clipboard_success'),
          status: 'success',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);

        toast({
          title: t('load_from_clipboard_failure'),
          description: t('load_from_clipboard_failure_description'),
          status: 'error',
          isClosable: true,
        });
      });
  };

  const handleSaveToClipboard = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        toast({
          title: t('save_to_clipboard_success'),
          status: 'success',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);

        toast({
          title: t('save_to_clipboard_failure'),
          status: 'error',
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    setResult(JSON.stringify({ kind: 'character', data: formData }));
  }, [formData]);

  return {
    handleLoadFromClipboard,
    handleSaveToClipboard,
    result,
  };
};
