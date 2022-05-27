/* eslint-disable react/jsx-no-target-blank */
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export type StyledLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const StyledLink: FC<StyledLinkProps> = ({ href, className, children }) => {
  const isExternal = href.startsWith('http');

  return (
    <>
      <Link href={href} passHref>
        <a
          href={href}
          rel={isExternal ? 'noreferrer noopener' : ''}
          target={isExternal ? '_blank' : ''}
          className={className}
        >
          {children}
        </a>
      </Link>
    </>
  );
};
