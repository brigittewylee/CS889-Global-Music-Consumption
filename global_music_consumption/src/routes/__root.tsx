import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Inter from "../fonts/inter.woff2";
import Nueue from "../fonts/Nueue.woff2";
import NueueBold from "../fonts/NueueBold.woff2";

const theme = createTheme({
  typography: {
    fontFamily: "\"Inter\", \"Nueue\", \"NueueBold\", sans-serif",
    h1: { fontWeight: 700 },
    body1: { fontWeight: 500 },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Global Music Consumption" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'Inter';
            src: url(${Inter}) format('woff2');
            font-display: swap;
          }
          @font-face {
            font-family: 'Nueue';
            src: url(${Nueue}) format('woff2');
            font-display: swap;
          }
          @font-face {
            font-family: 'NueueBold';
            src: url(${NueueBold}) format('woff2');
            font-display: swap;
          }

          body {
            margin: 0;
            scrollbar-gutter: stable;
          }
        `,
          }}
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ minHeight: "100vh", width: "100vw", bgcolor: "black" }}>
            {children}
          </Box>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
