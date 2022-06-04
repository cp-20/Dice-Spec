import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import { StyledLink } from '@/components/ui/StyledLink';

export const LandingCardLink: FC<{ title: string; content: string; href: string; icon: ReactNode }> = ({
  title,
  content,
  href,
  icon,
}) => (
  <>
    <LinkBox className="flex-1 rounded-md border p-4 shadow-blue-50 transition-all hover:bg-blue-50 hover:shadow-md dark:shadow-none dark:hover:bg-blue-50/5">
      <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-4">
        <div className="text-3xl sm:text-4xl md:text-5xl">{icon}</div>
        <div className="flex flex-col space-y-2 md:items-center">
          <Link href={href} passHref>
            <LinkOverlay className="text-lg font-bold">{title}</LinkOverlay>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">{content}</p>
        </div>
      </div>
    </LinkBox>
  </>
);

export const LandingCard: FC<{ title: string; content: string }> = ({ title, content }) => (
  <>
    <div className="flex-1 rounded-md border p-4 shadow-blue-50 transition-all hover:shadow-md dark:hover:bg-blue-700/5">
      <p className="mb-2 text-lg font-bold">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{content}</p>
    </div>
  </>
);

export const LandingLink: FC<{ icon: ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
  <>
    <StyledLink
      href={href}
      icon={icon}
      className="justify-center rounded-md px-4 py-1 shadow-blue-50  transition-all hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-50/5"
    >
      {label}
    </StyledLink>
  </>
);
