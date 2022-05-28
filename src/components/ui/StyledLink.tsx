/* eslint-disable react/jsx-no-target-blank */
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { cx } from '@/features/utils/cx';

export type iconStyle = 'none';

export type StyledLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: iconStyle;
};

export const StyledLink: FC<StyledLinkProps> = ({ href, className, children, icon }) => {
  const isExternal = href.startsWith('http');

  return (
    <>
      <Link href={href} passHref>
        <a
          href={href}
          rel={isExternal ? 'noreferrer noopener' : ''}
          target={isExternal ? '_blank' : ''}
          className={cx(className, 'inline-flex items-center space-x-2')}
        >
          <span>{children}</span>
          {icon !== 'none' && isExternal && <FaExternalLinkAlt />}
        </a>
      </Link>
    </>
  );
};
