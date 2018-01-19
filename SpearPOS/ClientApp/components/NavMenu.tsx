import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Menu, Dropdown, Button, Input} from "semantic-ui-react";

export class NavMenu extends React.Component<{}, {}> {
    public render() {
    return <div>
        <Menu pointing size="huge">
          <Link to={'/'}><Menu.Item name='Home' active={false} /></Link>
          <Link to={'/OpenTickets'}><Menu.Item name='Open Tickets' active={false} /></Link>
          <Link to={'/Retail'}><Menu.Item name='Retail Screen' active={false} /></Link>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    </div>
    }
}