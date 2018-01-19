import * as RetailStore from '../store/Retail';
import { RouteComponentProps } from "react-router-dom";
import * as React from "React";
import { ApplicationState } from "ClientApp/store";
import { connect } from "react-redux";
import { Grid, Segment } from 'semantic-ui-react';


type RetailProps =
    RetailStore.RetailState
    & typeof RetailStore.actionCreators
    & RouteComponentProps<{ticketType: string, ticketId: number, newTicket:boolean, tableId:number}>;

class Retail extends React.Component<RetailProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        //let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        var ticketType = this.props.match.params.ticketType;
        var tableId = this.props.match.params.tableId;
        var newTicket = this.props.match.params.newTicket;
        var ticketId = this.props.match.params.ticketId;
        if(newTicket){
            this.props.createTicket(ticketType, tableId)
        }else{
            this.props.requestTicketItems(ticketId);
        }

        this.props.requestRetailData(ticketType);
    }

    componentWillReceiveProps(nextProps: RetailProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    public render() {
        return <div>
            {this.renderRetailScreen()}
        </div>;
    }

    private renderRetailScreen() {
        return <Grid celled>
            <Grid.Row stretched>
         <Grid.Column width={12}>
        <Grid celled>
            <Grid.Row height={2}>
                <Grid.Column width={4}>
                    <Segment>Top Left Menu</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>Top Center Menu</Segment>
                </Grid.Column>
                        </Grid.Row>
            <Grid.Row height={12}>
                <Grid.Column width={4}>
                    <Segment>Top Left Menu</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>Top Center Menu</Segment>
                </Grid.Column>
                        </Grid.Row>
        </Grid>
         </Grid.Column>
         <Grid.Column width={2}>
         <Segment>Top Right Bar</Segment>
         </Grid.Column>
         </Grid.Row>
     </Grid>
    }

    private renderSubMenu(){
    }

    private renderItemList(){
        return <div className="leftBar">
            //TODO: Retail Items Screen.
               </div>
    }

    private renderCategories(){

    }

    private renderGroups(){

    }

    private renderItems(){

    }

    private renderModifieres(){
        
    }

}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.retail, // Selects which state properties are merged into the component's props
    RetailStore.actionCreators// Selects which action creators are merged into the component's props
)(Retail) as typeof Retail;
