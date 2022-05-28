import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#ffffff',
        color: '#2d3748',
        _dark: {
          bg: '#1a202c',
          color: '#ccc',
        },
      },
    },
  },
});
