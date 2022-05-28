import { cx } from '@chakra-ui/utils';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { FaDice, FaSearch } from 'react-icons/fa';

import type { StyledLinkProps } from '@/components/ui/StyledLink';
import { StyledLink } from '@/components/ui/StyledLink';

const NavigationLink: FC<StyledLinkProps> = ({ children, className, ...props }) => (
  <StyledLink className={cx(className, 'py-2 px-4 duration-100 hover:bg-gray-400/10')} {...props}>
    {children}
  </StyledLink>
);

export const Navigation: FC = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <div className="flex h-full flex-col border-r-2 border-gray-200">
        <NavigationLink href="/expect" icon={<FaSearch className="inline" />}>
          {t('navigation.expect')}
        </NavigationLink>
        <NavigationLink href="/dice" icon={<FaDice className="inline" />}>
          {t('navigation.dice')}
        </NavigationLink>
      </div>
    </>
  );
};
