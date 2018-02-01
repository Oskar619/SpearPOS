import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Input } from "semantic-ui-react";

const options = [
    { key: 'profile', text: 'Your Profile', },
    { key: 'stars', text: 'Your Stars' },
    { key: 'explore', text: 'Explore' },
    { key: 'integrations', text: 'Integrations' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' },
]


export class NavMenu extends React.Component<{}, {}> {
    public render() {
    return <div>
        <Menu pointing size="huge">
          <Link to={'/'}><Menu.Item name='Home' active={false} /></Link>
          <Link to={'/OpenTickets'}><Menu.Item name='Open Tickets' active={false} /></Link>
          <Link to={'/Retail'}><Menu.Item name='Retail Screen' active={false} /></Link>
          <Link to={'/Categories'}><Menu.Item name='Categories' active={false}/></Link>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    </div>
    }
}