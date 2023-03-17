import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { useUploadArea } from '@/components/model/LogAnalysis/useUploadArea';
import { LogPreview } from '@/components/model/LogPreview';
import { cx } from '@/features/utils/cx';

export const LogAnalysis: FC = () => {
  const [t] = useTranslation('analyze');
  const { dragActive, handleDrag, handleDrop, handleUpload, logs } = useUploadArea();

  return (
    <div>
      <input type="file" id="log-file-uploader" className="hidden" accept="text/html" onChange={handleUpload} />
      <label
        htmlFor="log-file-uploader"
        className={cx(
          'flex cursor-pointer flex-col items-center rounded-md border-[1px] p-4 transition-all hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700 md:flex-row md:justify-center md:gap-2',
          dragActive ? 'bg-slate-100 dark:bg-slate-800' : ''
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <AiOutlineCloudUpload className="text-3xl" />
        <p>{t('upload')}</p>
      </label>

      <div className="h-4" />

      <LogPreview userLogs={logs} />
    </div>
  );
};
