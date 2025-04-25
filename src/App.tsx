import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SafetyProvider } from './contexts/SafetyContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import ResourcesPage from './pages/ResourcesPage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import LiveSupportPage from './pages/LiveSupportPage';
import NotFoundPage from './pages/NotFoundPage';
import QuickExitPage from './pages/QuickExitPage';

function App() {
  return (
    <Router>
      <SafetyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="safety-plan" element={<SafetyPlanPage />} />
            <Route path="live-support" element={<LiveSupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/exit" element={<QuickExitPage />} />
        </Routes>
      </SafetyProvider>
    </Router>
  );
}

export default App;