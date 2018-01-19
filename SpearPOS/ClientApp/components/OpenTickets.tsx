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
            {this.renderBody()}
        </div>;
    }

    private renderBody() {
        return <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='uncover' width='thin' visible={true} icon='labeled' vertical inverted>
                <Menu.Item name='dinein' onClick={() => this.props.tableSelection()}>
                    Dine In
                </Menu.Item>
                <NavLink to={'/Retail?ticketType=takeOut'}>
                <Menu.Item name='takeout'>
                    Take Out
            </Menu.Item></NavLink>
                <NavLink to={'/Retail?ticketType=retail'}>
                <Menu.Item name='retail'>
                    Quick Sale
            </Menu.Item></NavLink>
            </Sidebar>
            <Sidebar.Pusher>
                <Segment basic>
                    {this.renderTicketsTable()}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    }

    private renderTicketsTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {this.props.tickets.map(ticket =>
                    <tr key={ticket.Id}>
                        <td>{ticket.TableId}</td>
                        <td>{ticket.PaidAmount}</td>
                        <td>{ticket.Settled}</td>
                        <td>{ticket.Paid}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.opentickets, // Selects which state properties are merged into the component's props
    OpenTicketsStore.actionCreators// Selects which action creators are merged into the component's props
)(OpenTickets) as typeof OpenTickets;