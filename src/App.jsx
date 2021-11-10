// Dependencies
import React, {
  lazy,
  Suspense,
} from 'react';
import { Route, Switch } from 'react-router-dom'

// Routes
import PublicRoutes from './routes/publicRoutes';

// Styles
import { Container } from '@mui/material';

// Components
import Loading from './components/Loading'
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))



const App = () => {
  const _publicRoutes = PublicRoutes.map(route => {
    const {
      path,
      exact,
      name,
      Component
    } = route;

    return <Route path={`${path}`} exact={exact} component={Component} key={name} />
  })

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
          <Container maxWidth="sm">
            {_publicRoutes}
          </Container>
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

export default App
