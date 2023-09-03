import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './routes/home/Home.tsx';
import QuizOverview from './routes/quiz/QuizOverview.tsx';
import QuizPractice from './routes/quiz/QuizPractice.tsx';
import RootLayout from './routes/RootLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'quiz/:id',
        element: <QuizOverview />,
        children: [
          {
            path: 'practice',
            element: <QuizPractice />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
