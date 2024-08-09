import { Router, Route, Set } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/" page={MovieMashupsPage} name="movieMashups" />
        <Route path="/mashups/new" page={NewMovieMashupPage} name="newMovieMashup" />
        <Route path="/mashups/{id}" page={MovieMashupPage} name="movieMashup" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
