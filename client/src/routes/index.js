import React from "react"
import { Route, Switch } from "react-router-dom"
import ExploreMovies from "../screens/ExploreMovies"
import Landing from "../screens/Landing"
import SignIn from "../screens/SignIn"
import SignOut from "../screens/SignOut"
import SignUp from "../screens/SignUp"
import ChangePassword from '../screens/ChangePassword'
import Item from "../screens/MovieDB"
import Items from "../screens/MoviesDB"
import MyMovies from "../screens/MyMovies"
import ItemCreate from "../screens/MoveDBCreate"
import ItemEdit from "../screens/MovieDBEdit"
import AuthenticatedRoute from "./AuthenticatedRoute"
import MovieDetail from "../screens/MovieDetail"

const Routes = ({
  user,
  items,
  setUser,
  clearUser,
  destroy,
  changeMovieItem,
  addItem,
  movieData,
  addComment,
  comments
}) => (
    <Switch>
      <Route
        exact
        path="/"
        render={props =>
          user ? (
            <ExploreMovies {...props} movieData={movieData} />
          ) : (
              <Landing {...props} items={items} />
            )
        }
      />
      <Route
        path="/sign-in"
        render={props => <SignIn {...props} setUser={setUser} />}
      />
      <Route
        path="/sign-up"
        render={props => <SignUp {...props} setUser={setUser} />}
      />

      <Route
        exact
        path="/sign-out"
        render={props => <SignOut {...props} clearUser={clearUser} user={user} />}
      />

      <AuthenticatedRoute
        exact
        path="/items"
        user={user}
        render={props => <Items {...props} user={user} items={items} />}
      />

      <AuthenticatedRoute
        exact
        path="/my-movies"
        user={user}
        render={props => <MyMovies {...props} user={user} items={items} />}
      />

      <AuthenticatedRoute
            exact
            path="/change-password"
            user={user}
            render={props => <ChangePassword {...props} />}
      />
      
      <AuthenticatedRoute
        exact
        path={`/items/:id`}
        user={user}
        render={props => <Item {...props} user={user} delete={destroy} />}
      />


      <AuthenticatedRoute
        path="/movies/:id"
        user={user}
        render={props => (
          <MovieDetail
            {...props}
            movieData={movieData}
            user={user}
            addComment={addComment}
            comments={comments}
          />
        )}
      />


      <AuthenticatedRoute
        exact
        user={user}
        path="/items/:id/edit"
        render={props => <ItemEdit {...props} user={user} put={changeMovieItem} />}
      />


      <AuthenticatedRoute
        user={user}
        path="/create"
        render={props => <ItemCreate {...props} user={user} addItem={addItem} />}
      />
    </Switch>
  )

export default Routes
