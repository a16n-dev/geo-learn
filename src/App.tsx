import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './routes/home/Home.tsx';
import QuizOverview from './routes/quiz/QuizOverview.tsx';
import QuizPractice from './routes/quiz/QuizPractice.tsx';
import QuizSummary from './routes/quiz/QuizSummary.tsx';
import QuizSummaryBreakdown from './routes/quiz/QuizSummaryBreakdown.tsx';
import RootLayout from './routes/RootLayout.tsx';
import ThemeTest from './routes/theme/ThemeTest.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      { path: 'theme', element: <ThemeTest /> },
      {
        path: 'quiz/:id',
        element: <QuizOverview />,
        children: [
          {
            path: 'practice',
            element: <QuizPractice />,
          },
          {
            path: 'practice-summary',
            element: <QuizSummary />,
            children: [
              {
                path: 'breakdown',
                element: <QuizSummaryBreakdown />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
