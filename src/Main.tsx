import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import Menubar from "./components/Layouts/Menubar"
import Navigation from "./components/Layouts/Navigation"
import PrivateRoute from "./components/PrivateRoute"
import { routes } from "./config"

const context = React.createContext<IAppContext | null>(null)
const { Provider, Consumer } = context

class Main extends Component {

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
    return (
        <BrowserRouter basename="/index">
          <Grid columns="2" style={styles.container}>
              <Grid.Column width="3">
                <Navigation />
              </Grid.Column>
            <Grid.Column width="13">
              <div style={styles.pageContainer}>{this.renderRoutes()}</div>
            </Grid.Column>
          </Grid>
        </BrowserRouter>
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
