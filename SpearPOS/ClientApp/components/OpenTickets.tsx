import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as OpenTicketsStore from '../store/OpenTickets';
import * as WeatherForecasts from '../store/WeatherForecasts';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

type OpenticketsProps =
    OpenTicketsStore.OpenTicketsState
    & typeof OpenTicketsStore.actionCreators
    & RouteComponentProps<{}>;

class OpenTickets extends React.Component<OpenticketsProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        //let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestOpenTickets();
    }

    componentWillReceiveProps(nextProps: OpenticketsProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestOpenTickets();
    }

    public render() {
        return <div>
            This is Open Tickets view.
        </div>;
    }
}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.opentickets, // Selects which state properties are merged into the component's props
    OpenTicketsStore.actionCreators// Selects which action creators are merged into the component's props
)(OpenTickets) as typeof OpenTickets;