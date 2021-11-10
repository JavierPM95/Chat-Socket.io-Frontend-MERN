import { lazy } from 'react';

const Home = lazy(() => import('../components/Home/Home'));
const Chat = lazy(() => import('../components/Chat/Chat'));

const PublicRoutes = [
    {
        path: '/',
		exact: true,
		name: 'Home',
		restricted: false,
		Component: Home
    },
    {
        path: '/chat',
		exact: true,
		name: 'Chat',
		restricted: false,
		Component: Chat
    },
];

export default PublicRoutes;