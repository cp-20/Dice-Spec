import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, DragEventHandler } from 'react';
import { useState } from 'react';

type rawLog = {
  tab: string;
  character: string;
  message: string;
};

export type log = {
  diceFullStr: string;
  diceResultNumber: number | undefined;
  diceResult: string;
  diceTarget: number;
};

export type userLogs = Map<string, log[]>;

const analyzeLog = ({ tab, message }: rawLog): log | void => {
  const diceFullStr = `${tab} ${message}`;
  const dice = (() => {
    const CoC7thMatch = message.match(/.*1D100<=(\d+).* ＞ (.+) ＞ (\d+) ＞ (.+)/);
    if (CoC7thMatch !== null) {
      const diceTarget = parseInt(CoC7thMatch[1], 10);
      const diceResultNumber = CoC7thMatch[2].includes(',') ? undefined : parseInt(CoC7thMatch[3], 10);
      const diceResult = CoC7thMatch[4];
      return { diceResult, diceResultNumber, diceTarget };
    }

    const CoC6thMatch = message.match(/.*1D100<=(\d+).* ＞ (\d+) ＞ (.+)/);

    if (CoC6thMatch !== null) {
      const diceTarget = parseInt(CoC6thMatch[1], 10);
      const diceResultNumber = parseInt(CoC6thMatch[2], 10);
      const diceResult = CoC6thMatch[3];
      return { diceResult, diceResultNumber, diceTarget };
    }
  })();

  if (dice === undefined) return;

  return {
    diceFullStr,
    ...dice,
  };
};

const parseLogs = (html: string): userLogs => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const logs = Array.from(doc.querySelectorAll('body > p'));
  const rawLogs: rawLog[] = logs.map((log) => {
    const [tab, character, message] = Array.from(log.getElementsByTagName('span')).map((element) => element.innerText);
    return { tab, character, message: message.trim() };
  });

  const userLogs: userLogs = new Map();
  rawLogs.forEach((rawLog) => {
    const log = analyzeLog(rawLog);
    if (log) {
      userLogs.set('[ALL]', [...(userLogs.get('[ALL]') ?? []), log]);
      userLogs.set(rawLog.character, [...(userLogs.get(rawLog.character) ?? []), log]);
    }
  });

  return userLogs;
};

export type useUploadArea = {
  logs: userLogs;
  dragActive: boolean;
  handleDrag: DragEventHandler<HTMLLabelElement>;
  handleDrop: DragEventHandler<HTMLLabelElement>;
  handleUpload: ChangeEventHandler<HTMLInputElement>;
};

export const useUploadArea = (): useUploadArea => {
  const toast = useToast();
  const [t] = useTranslation('analyze');

  const [dragActive, setDragActive] = useState<useUploadArea['dragActive']>(false);
  const [logs, setLogs] = useState<useUploadArea['logs']>(new Map());

  const handleFile = (file: File) => {
    if (file.type !== 'text/html') {
      toast({
        title: t('upload_type_error_title'),
        description: t('upload_type_error_description'),
        status: 'error',
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogs(parseLogs(reader.result as string));
    };
    reader.readAsText(file);
  };

  const handleDrag: useUploadArea['handleDrag'] = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop: useUploadArea['handleDrop'] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload: useUploadArea['handleUpload'] = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return {
    logs,
    dragActive,
    handleDrag,
    handleDrop,
    handleUpload,
  };
};
