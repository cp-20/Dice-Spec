import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { LogAnalysisPreview } from '@/components/model/LogAnalysis/LogAnalysisPreview';
import type { userLogs } from '@/components/model/LogAnalysis/useUploadArea';
import { Select } from '@/components/ui/Select';
import { cx } from '@/features/utils/cx';

export type logPreviewProps = {
  userLogs: userLogs;
};

export const LogPreview: FC<logPreviewProps> = ({ userLogs }) => {
  const [t] = useTranslation('analyze');
  const [activePanel, setActivePanel] = useState('');
  const active = useRef('');

  useEffect(() => {
    active.current = Array.from(userLogs.keys())[0];
    setActivePanel(Array.from(userLogs.keys())[0]);
  }, [userLogs]);

  return (
    <div>
      <Select
        active={active}
        items={Array.from(userLogs.entries()).map(([character]) => ({ key: character, value: character }))}
        onChange={(key) => setActivePanel(key)}
      />

      <LogAnalysisPreview logs={userLogs.get(activePanel)} />

      <div className="rounded-md border px-4 py-2">
        {userLogs.has(activePanel) ? (
          (userLogs.get(activePanel) ?? []).map((log, i) => (
            <p
              key={i}
              className={cx(
                'text-sm',
                ['成功', 'レギュラー成功', 'ハード成功', 'イクストリーム成功', 'クリティカル'].includes(
                  log.diceResult
                ) && 'text-blue-700 dark:text-blue-500',
                ['失敗', 'ファンブル'].includes(log.diceResult) && 'text-red-700 dark:text-red-500'
              )}
            >
              {log.diceFullStr}
            </p>
          ))
        ) : (
          <p>{t('log_preview_empty')}</p>
        )}
      </div>
    </div>
  );
};
