import { Button, ButtonGroup, IconButton, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { useFavoriteDices } from '@/components/features/dice/FavoriteDices';
import type { dicePanel } from '@/components/features/dice/useDicePanels';
import { useDicePanels } from '@/components/features/dice/useDicePanels';
import { useDiceRoll } from '@/components/features/dice/useDiceRoll';

export const QuickDiceRollPanel: FC<{ panel: dicePanel }> = ({ panel }) => {
  const [t] = useTranslation('dice');
  const [_, setFavoriteDices] = useFavoriteDices();

  const { diceRoll, pushResult } = useDiceRoll();

  const handleFavoriteClick = () => {
    if (panel.favorite) {
      setFavoriteDices((dices) => dices.filter((dice) => dice !== panel.input));
    } else {
      setFavoriteDices((dices) => dices.concat(panel.input));
    }
  };

  const handleInputClick = async () => {
    try {
      const result = await diceRoll(panel.input);
      if (result.success) {
        pushResult(panel.input, result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ButtonGroup isAttached size="sm" variant="outline">
      <IconButton onClick={handleFavoriteClick} aria-label={t('form.toggleFavorite')}>
        {panel.favorite ? <FaStar /> : <FaRegStar />}
      </IconButton>
      <Button onClick={handleInputClick} className="font-bold">
        {panel.input}
      </Button>
    </ButtonGroup>
  );
};

export const DiceRollQuickInput: FC = () => {
  const dicePanels = useDicePanels();

  return (
    <Stack direction="row" className="w-full overflow-x-auto pb-2">
      {dicePanels.map((panel) => (
        <QuickDiceRollPanel key={panel.input} panel={panel} />
      ))}
    </Stack>
  );
};
