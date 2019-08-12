import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./components/Layouts/Menubar"
import Navigation from "./components/Layouts/Navigation"
import PrivateRoute from "./components/PrivateRoute"
import { routes } from "./config"

const context = React.createContext<IAppContext>({
  token: "",
  username: "",
  login: () => undefined,
  logout: () => undefined,
  isLoggedIn: () => false,
})

interface IState {
  token: string,
  username: string,
}

const { Provider, Consumer } = context

class Main extends Component {

  public state: IState = {
    token: localStorage.getItem("authToken") || "",
    username: localStorage.getItem("authUser") || "{}",
  }

  public login = (token: string, username:string, callback: () => void) => {
    this.setState({ token,username }, () => {
      localStorage.setItem("authToken", token)
      localStorage.setItem("authUser", username)
      callback()
    })
  }

  public logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("authUser")
    this.setState({ token: undefined, username: undefined })
    window.location.href = "/login"
  }

  public isLoggedIn = () => {
    return this.state.token !== ""
  }

  public renderRoutes() {
    return routes.map((route, index) =>(
        <Route
          path={route.path}
          component={route.component}
          key={index}
          exact
        />
      ),
    )
  }

  public render() {

    const providerValue = {
      token: this.state.token,
      username: this.state.username,
      login: this.login,
      logout: this.logout,
      isLoggedIn: this.isLoggedIn,
    }

    return (
      <Provider value={providerValue}>
        <BrowserRouter basename="/index">
          <Grid columns="2" style={styles.container}>
            { this.isLoggedIn() && (
              <Grid.Column width="3">
                <Navigation />
              </Grid.Column>
            )}
            <Grid.Column width="13">
              { this.isLoggedIn() && <Menubar/> }
              <div style={styles.pageContainer}>{this.renderRoutes()}</div>
            </Grid.Column>
          </Grid>
        </BrowserRouter>
        </Provider>
    )
  }
}

const styles = {
  container: {
    height: "100vh",
    paddingTop: 50,
    justifyContent: "center",
  },
  pageContainer: {
    padding: 25,
    height: "100%",
  },
}

export { Consumer }
export default Main
