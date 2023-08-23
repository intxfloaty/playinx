// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {


  const theme = extendTheme({
    components: {
      Drawer: {
        parts: ["dialog", "header", "body"],
        baseStyle: {
          dialog: {
            background: "black", // Set the background color for the full drawer
          },
        },
      },
      // Modal:{
      //   parts:["dialog", "header", "body"],
      //   baseStyle:{
      //     dialog:{
      //       background: "#101010", 
      //     }
      //   }
      // },
      // Tabs:{
      //   tab: {
      //     colorScheme: "#E7E9EA"

      //   },
      //   tabpanel: {
      //     fontFamily: 'mono', // change the font family
      //   },
      // }
    },
  });

  
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
