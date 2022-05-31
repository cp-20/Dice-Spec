import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC, MutableRefObject } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { cx } from '@/features/utils/cx';

export const Select: FC<{
  items: { key: string; value: string }[];
  active: MutableRefObject<string>;
}> = ({ items, active }) => {
  const [t] = useTranslation('common');

  const getActiveValue = useCallback(
    () => items.find((item) => item.key === active.current)?.value || '',
    [active, items]
  );
  const [value, setValue] = useState(getActiveValue);
  const [targetIndex, setTargetIndex] = useState<number>(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isFiltering = useCallback(() => getActiveValue() !== value, [getActiveValue, value]);
  const getFilteredItem = useCallback(
    () => items.filter((item) => !isFiltering() || item.value.match(new RegExp(value, 'i'))),
    [isFiltering, items, value]
  );
  const getTargetIndex = useCallback(
    () => getFilteredItem().findIndex((item) => item.key === active.current),
    [active, getFilteredItem]
  );
  const closeSelect = useCallback(() => {
    if (isInputFocused) {
      setIsInputFocused(false);
      setValue(getActiveValue());
    }
  }, [getActiveValue, isInputFocused]);

  useEffect(() => {
    window.addEventListener('click', closeSelect);
    listRef.current?.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    inputRef.current?.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }, [closeSelect, getActiveValue, isInputFocused]);

  useEffect(() => {
    setValue(getActiveValue());
  }, [active, getActiveValue]);

  return (
    <>
      <div>
        <InputGroup>
          <Input
            aria-haspopup="listbox"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
            className={cx(isInputFocused && '!border-[#3182ce]')}
            onFocus={() => {
              setIsInputFocused(true);
              inputRef.current?.setSelectionRange(0, value.length);
            }}
            onKeyUp={(e) => {
              if (['Esc', 'Escape'].includes(e.key)) {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
                if (targetIndex >= 0) {
                  active.current = getFilteredItem()[targetIndex].key;
                }
              } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();

                const index = (() => {
                  if (targetIndex === -1) {
                    return 0;
                  } else if (e.key === 'ArrowDown') {
                    return (targetIndex + 1) % getFilteredItem().length;
                  } else if (e.key === 'ArrowUp') {
                    return (targetIndex + getFilteredItem().length - 1) % getFilteredItem().length;
                  }
                })();

                if (index !== undefined && listRef.current) {
                  setTargetIndex(index);
                  const itemRect = listRef.current.children[index].getBoundingClientRect();
                  const listRect = listRef.current.getBoundingClientRect();

                  if (itemRect.top >= listRect.bottom) {
                    listRef.current.scrollTo({
                      top: listRef.current.scrollTop + itemRect.top - listRect.bottom + itemRect.height,
                    });
                  }
                  if (itemRect.bottom <= listRect.top) {
                    listRef.current.scrollTo({
                      top: listRef.current.scrollTop + itemRect.bottom - listRect.top - itemRect.height,
                    });
                  }
                }
              }
            }}
          />
          <InputRightElement>
            <FaCaretDown />
          </InputRightElement>
        </InputGroup>
        <ul
          tabIndex={-1}
          ref={listRef}
          className={cx(
            'absolute z-10 max-h-[10rem] w-full origin-top translate-y-[0.1rem] overflow-y-auto bg-white shadow-lg transition-transform duration-100 dark:bg-[#1e2533]',
            isInputFocused ? 'scale-y-100' : 'scale-y-0'
          )}
        >
          {getFilteredItem().length > 0 ? (
            getFilteredItem().map((item, index) => (
              <li
                key={item.key}
                className={cx(
                  'cursor-pointer px-4 py-1 transition-colors',
                  item.key === active.current
                    ? 'bg-blue-500/10'
                    : index === targetIndex
                    ? 'bg-gray-500/10'
                    : 'hover:bg-gray-500/5'
                )}
                onMouseDown={() => {
                  active.current = item.key;
                  setTargetIndex(getTargetIndex());
                  closeSelect();
                }}
              >
                {isFiltering()
                  ? (() => {
                      const match = item.value.match(new RegExp(value, 'i'));
                      if (match && match.index !== undefined) {
                        return (
                          <span>
                            {item.value.slice(0, match.index)}
                            <span className="bg-gray-500/20 text-gray-500">
                              {item.value.slice(match.index, match.index + value.length)}
                            </span>
                            {item.value.slice(match.index + value.length)}
                          </span>
                        );
                      } else {
                        return item.value;
                      }
                    })()
                  : item.value}
              </li>
            ))
          ) : (
            <li className="px-4 py-1">{t('noItemFound')}</li>
          )}
        </ul>
      </div>
    </>
  );
};
