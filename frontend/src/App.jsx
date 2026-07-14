import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthStore } from "./context/authStore";
import { useThemeStore } from "./context/themeStore";
import { useEffect, Suspense, lazy, useState, useMemo, useCallback } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppShell, DashboardShell } from "./components/AppShell";
import { usePerformanceOptimization } from "./utils/performanceMonitor";
import { useRenderLoopProtection } from "./utils/renderLoopProtection";
import { setNavigate } from "./utils/api";
import { CursorTrail } from "./components/CursorTrail";

// Phase 1: Critical path - immediate imports (no lazy loading)
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

// Phase 2: Enhanced features - aggressive lazy loading
const DemoMode = lazy(() => 
  import("./pages/DemoMode").then(m => ({ default: m.DemoMode }))
);
const DashboardPage = lazy(() => 
  import("./pages/DashboardPage").then(m => ({ default: m.DashboardPage }))
);
const CalendarPage = lazy(() => 
  import("./pages/CalendarPage").then(m => ({ default: m.CalendarPage }))
);
const TasksPage = lazy(() => 
  import("./pages/TasksPage").then(m => ({ default: m.TasksPage }))
);
const AIAssistantPage = lazy(() => 
  import("./pages/AIAssistantPage").then(m => ({ default: m.AIAssistantPage }))
);
const SettingsPage = lazy(() => 
  import("./pages/SettingsPage").then(m => ({ default: m.SettingsPage }))
);

// Lazy load transitions and animations
const CyberTransition = lazy(() => 
  import("./components/PageTransition").then(m => ({ default: m.CyberTransition }))
);

// Stable route components that don't cause remounting
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthAwareRoute = ({ children, isAuthenticated, redirectTo, transitionsEnabled }) => {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (transitionsEnabled) {
    return (
      <Suspense fallback={<AppShell isLoading={true} />}>
        <CyberTransition>{children}</CyberTransition>
      </Suspense>
    );
  }

  return children;
};



const AnimatedRoutes = ({ isInitialized }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loadUser, checkAuthSync } = useAuthStore();
  const { isDark, loadSettings } = useThemeStore();
  const { isLowEndDevice, prefersReducedMotion } = usePerformanceOptimization();
  
  // Render loop protection
  const isLooping = useRenderLoopProtection('AnimatedRoutes');
  
  // Stable state management - no complex initialization hooks
  const [authInitialized, setAuthInitialized] = useState(false);
  const [enhancementsLoaded, setEnhancementsLoaded] = useState(false);
  
  // Optimized transitions control - memoized to prevent re-calculations
  const transitionsEnabled = useMemo(() => 
    enhancementsLoaded && !isLowEndDevice && !prefersReducedMotion && !isLooping,
    [enhancementsLoaded, isLowEndDevice, prefersReducedMotion, isLooping]
  );

  // Set up navigate function for API utility
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  // Single auth initialization - runs once only
  useEffect(() => {
    if (!isInitialized || authInitialized) return;

    const initializeAuth = () => {
      try {
        // Synchronous auth check from localStorage
        checkAuthSync();
        setAuthInitialized(true);

        // Background user validation (non-blocking)
        const token = localStorage.getItem('token');
        if (token) {
          loadUser().catch(() => {
            // Silent fail, auth state already set from token presence
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthInitialized(true); // Prevent infinite loops
      }
    };

    initializeAuth();
  }, [isInitialized, authInitialized, checkAuthSync, loadUser]);

  // Background enhancements - load after auth is stable
  useEffect(() => {
    if (!authInitialized || enhancementsLoaded) return;

    const loadEnhancements = () => {
      try {
        // Load settings if authenticated
        if (isAuthenticated) {
          loadSettings().catch(() => {
            // Silent fail, use defaults
          });
        }

        // Enable enhancements after a short delay
        setTimeout(() => {
          setEnhancementsLoaded(true);
        }, 100);
      } catch (error) {
        console.error('Enhancement loading error:', error);
        setEnhancementsLoaded(true); // Prevent infinite loops
      }
    };

    // Use requestIdleCallback for non-blocking enhancement loading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadEnhancements, { timeout: 1000 });
    } else {
      setTimeout(loadEnhancements, 50);
    }
  }, [authInitialized, enhancementsLoaded, isAuthenticated, loadSettings]);

  // Show loading state only during initial app load
  if (!isInitialized || !authInitialized) {
    return <AppShell isLoading={true} type="page" />;
  }

  // Stable progressive route wrapper
  const ProgressiveRoute = ({ children, transitionsEnabled, fallback = <DashboardShell /> }) => {
    if (transitionsEnabled) {
      return (
        <Suspense fallback={fallback}>
          <CyberTransition>{children}</CyberTransition>
        </Suspense>
      );
    }
    
    return (
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    );
  };

  return (
    <ErrorBoundary>
      <Routes location={location} key={location.pathname}>
        {/* Phase 1: Critical Routes - Instant, no lazy loading */}
        <Route 
          path="/" 
          element={
            transitionsEnabled ? (
              <Suspense fallback={<AppShell isLoading={true} />}>
                <CyberTransition><LandingPage /></CyberTransition>
              </Suspense>
            ) : (
              <LandingPage />
            )
          } 
        />
        
        <Route
          path="/login"
          element={
            <AuthAwareRoute 
              isAuthenticated={isAuthenticated}
              redirectTo="/dashboard"
              transitionsEnabled={transitionsEnabled}
            >
              <LoginPage />
            </AuthAwareRoute>
          }
        />
        
        <Route
          path="/register"
          element={
            <AuthAwareRoute 
              isAuthenticated={isAuthenticated}
              redirectTo="/dashboard"
              transitionsEnabled={transitionsEnabled}
            >
              <RegisterPage />
            </AuthAwareRoute>
          }
        />
        
        {/* Phase 2: Enhanced Routes - Lazy loaded */}
        <Route 
          path="/demo" 
          element={
            <ProgressiveRoute fallback={<AppShell isLoading={true} />}>
              <DemoMode />
            </ProgressiveRoute>
          } 
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressiveRoute transitionsEnabled={transitionsEnabled}>
                <DashboardPage />
              </ProgressiveRoute>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/calendar"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressiveRoute transitionsEnabled={transitionsEnabled}>
                <CalendarPage />
              </ProgressiveRoute>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tasks"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressiveRoute transitionsEnabled={transitionsEnabled}>
                <TasksPage />
              </ProgressiveRoute>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/ai"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressiveRoute transitionsEnabled={transitionsEnabled}>
                <AIAssistantPage />
              </ProgressiveRoute>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressiveRoute transitionsEnabled={transitionsEnabled}>
                <SettingsPage />
              </ProgressiveRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

// Stable app shell that never unmounts
function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Single initialization effect - runs once only
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Apply theme immediately
        const savedTheme = localStorage.getItem('theme');
        const shouldBeDark = savedTheme === null || savedTheme === 'true';
        
        if (shouldBeDark) {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.style.colorScheme = 'light';
        }

        // Mark as initialized
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        // Still mark as initialized to prevent infinite loops
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []); // Empty dependency array - runs once only

  // Always render the router, never unmount
  return (
    <Router>
      <CursorTrail />
      <AnimatedRoutes isInitialized={isInitialized} />
    </Router>
  );
}

export default App;
