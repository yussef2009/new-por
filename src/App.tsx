import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { TeamProvider } from '@/context/TeamContext';
import { ThemeProvider } from '@/components/theme-provider';
import { AppRoutes } from './routes';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <TeamProvider>
          <ThemeProvider defaultTheme="dark" storageKey="techcompete-theme">
            <BrowserRouter>
              <AppRoutes />
              <Toaster />
            </BrowserRouter>
          </ThemeProvider>
        </TeamProvider>
      </AppProvider>
    </AuthProvider>
  );
}
