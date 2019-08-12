import React, { Component } from "react"
import { Dropdown, Menu } from "semantic-ui-react"
import { Consumer } from "../../../Main"
import AppTitle from "./AppTitle"

class Menubar extends Component {
  public render() {
    return (
      <Consumer>
        {(context) => (
          <Menu fixed="top" inverted color="black" borderless>
            <AppTitle />
            <Menu.Menu position="right">
              <Dropdown item text="Administrator" pointing>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="sign-out"
                    text="Keluar"
                    onClick={() => context.logout() }
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        )}
      </Consumer>
    )
  }
}

export default Menubar
