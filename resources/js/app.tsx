import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const currentLocale = window.location.pathname.split('/')[1] || 'en';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider locale={currentLocale} fallbackLocale={currentLocale} files={import.meta.glob('/lang/*.json')}>
                <App {...props} />  
            </LaravelReactI18nProvider>,
        );
    },
    progress: {
        color: '#2b7fff',
        showSpinner: true,
    },
});

// This will set light / dark mode on load...
initializeTheme();
