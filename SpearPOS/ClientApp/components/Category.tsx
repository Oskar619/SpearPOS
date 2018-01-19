import * as CategoryStore from '../store/Category';
import { RouteComponentProps } from "react-router-dom";
import * as React from "React";
import { ApplicationState } from "ClientApp/store";
import { connect } from "react-redux";
import { Grid, Segment } from 'semantic-ui-react';


type CategoryProps =
    CategoryStore.CategoryState
    & typeof CategoryStore.actionCreators
    & RouteComponentProps<{}>;

class Category extends React.Component<CategoryProps, {}> {
    componentWillMount() {
        
        this.props.requestCategories();
    }

    componentWillReceiveProps(nextProps: CategoryProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    public render() {
        return <div>
        </div>;
    }

    private renderRetailScreen() {
        return <Grid celled padded>
            <Grid.Row stretched>
                <Grid.Column width={14}>
                    <Grid celled padded>
                        <Grid.Row width={2}>
                            <Grid.Column width={4}>
                                <Segment>Top Left Menu</Segment>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Segment>Top Center Menu</Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row width={12} stretched>
                            <Grid.Column width={4}>
                                <Segment>Middle Left Segment</Segment>
                                <Segment>Middle Left Segment</Segment>
                                <Segment>Middle Left Segment</Segment>
                                <Segment>Middle Left Segment</Segment>
                                <Segment>Middle Left Segment</Segment>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Segment>Middle Center Segment</Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row width={2}>
                            <Grid.Column width={4}>
                                <Segment>Bottom Left Segment</Segment>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Segment>Bottom Center Segment</Segment>
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

    private renderSubMenu() {
    }

    private renderItemList() {
        return <div className="leftBar">
        //TODO: Retail Items Screen.
        </div>
    }

    private renderCategories() {

    }

    private renderGroups() {

    }

    private renderItems() {

    }

    private renderModifieres() {

    }

}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.retail, // Selects which state properties are merged into the component's props
    RetailStore.actionCreators// Selects which action creators are merged into the component's props
)(Retail) as typeof Retail;