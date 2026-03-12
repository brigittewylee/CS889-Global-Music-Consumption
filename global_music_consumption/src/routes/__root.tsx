import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

// 1. Force a pure black dark theme
const theme = createTheme({
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
