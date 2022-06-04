import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

export type MultipleInputProps<T> = {
  data: T[];
  getKey: (data: T) => string;
  childNode: (value: T, index: number) => ReactNode;
  removeNode: (index: number) => void;
  removeText: string;
  addNode: () => void;
  addText: string;
};

export const MultipleInput = <T,>({
  data,
  getKey,
  childNode,
  removeNode,
  removeText,
  addNode,
  addText,
}: MultipleInputProps<T>) => (
  <>
    <div className="flex flex-col space-y-2">
      {data.map((value, index) => (
        <div key={`${getKey(value)}-${index}`} className="flex items-center space-x-2">
          {childNode(value, index)}
          <Tooltip label={removeText}>
            <IconButton
              variant="outline"
              icon={<FaRegTrashAlt />}
              aria-label={removeText}
              onClick={() => removeNode(index)}
            />
          </Tooltip>
        </div>
      ))}
    </div>
    <Button className="mt-4 space-x-2" onClick={addNode}>
      <FaPlus className="inline" />
      <span>{addText}</span>
    </Button>
  </>
);
