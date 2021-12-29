// import React, { Component } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader/AppHeader'
import { HomePage } from './pages/HomePage/HomePage'
import { ContactPage } from './pages/ContactPage/ContactPage'
import { StatisticPage } from './pages/StatisticPage/StatisticPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage/ContactEditPage'
import { SignupPage } from './pages/SignupPage/SignupPage'

export function App() {
   const PrivateRoute = props => {
      // return props.isAdmin ? <Route component={props.component} path={props.path} /> : <Redirect to='/' />
      return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
   }

   return (
      <Router>
         <div className="App">
            <AppHeader />
            <main className="container">
               <Switch>
                  <Route component={ContactEditPage} path="/contact/edit/:id?" />
                  <Route component={ContactDetailsPage} path="/contact/:id" />
                  <Route component={ContactPage} path="/contact" />
                  <Route component={SignupPage} path="/signup" />
                  {/* <Route component={StatisticPage} path="/statistic" /> */}
                  <PrivateRoute isAdmin={true} component={StatisticPage} path="/statistic" />
                  <Route component={HomePage} exact path="/" />
               </Switch>
            </main>
         </div>
      </Router>
   )
}
