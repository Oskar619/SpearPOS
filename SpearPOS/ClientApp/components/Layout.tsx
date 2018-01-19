import * as React from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div>
            <div>
            <NavMenu />
            </div>
            <div className="clearfix"></div>
            <div className='col-sm-9, bodyContent'>
                { this.props.children }
            </div>
        </div>;
    }
}
