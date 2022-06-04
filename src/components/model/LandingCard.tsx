import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export const LandingCard: FC<{ title: string; content: string; href: string; icon: ReactNode }> = ({
  title,
  content,
  href,
  icon,
}) => (
  <>
    <LinkBox className="flex-1 rounded-md border p-4 shadow-blue-50 transition-all hover:bg-blue-50 hover:shadow-md">
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
