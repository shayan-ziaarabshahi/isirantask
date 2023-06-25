import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';



function MUI({ children }) {

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const theme = createTheme({
        direction: 'rtl',
        typography: {
            fontFamily: [
              'vazir',
            ].join(','),
          },
    });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                {children}
                <CssBaseline />
            </ThemeProvider>
        </CacheProvider>
    )
}

export default MUI