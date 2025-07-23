import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';

import {
  HomePage,
  NewFormPage,
  FormFillPage,
  FormResponsesPage,
  NotFoundPage,
} from './pages';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="forms/new" element={<NewFormPage />} />
          <Route path="forms/:id/fill" element={<FormFillPage />} />
          <Route path="forms/:id/responses" element={<FormResponsesPage />} />
          <Route
            path="forms/:id/responses/:responseIndex?"
            element={<FormResponsesPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
