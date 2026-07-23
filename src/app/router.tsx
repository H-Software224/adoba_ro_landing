import { createBrowserRouter, Navigate } from 'react-router-dom'
import { routing } from '@/shared/i18n/routing'
import { LocaleLayout } from './LocaleLayout'
import { MainLayout } from './MainLayout'
import { NotFoundPage } from './NotFoundPage'
import { HomePage } from '@/views/home'
import { FeaturesPage } from '@/views/features'
import { PricingPage } from '@/views/pricing'
import { NewsPage } from '@/views/news'
import { MagazinePage, ArticleDetailPage } from '@/views/magazine'
import { EnterprisePage } from '@/views/enterprise'

export const router = createBrowserRouter([
  { index: true, element: <Navigate to={`/${routing.defaultLocale}`} replace /> },
  {
    path: ':locale',
    element: <LocaleLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'features', element: <FeaturesPage /> },
          { path: 'pricing', element: <PricingPage /> },
          { path: 'news', element: <NewsPage /> },
          { path: 'magazine', element: <MagazinePage /> },
          { path: 'magazine/:slug', element: <ArticleDetailPage /> },
        ],
      },
      { path: 'enterprise', element: <EnterprisePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
