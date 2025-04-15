import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../global.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()


export default function Bangazon({ Component, pageProps }): import('next/app').AppProps {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider> 
  )
}
