import * as CategoryStore from '../store/Category';
import { RouteComponentProps } from "react-router-dom";
import * as React from "React";
import { ApplicationState } from "ClientApp/store";
import { connect } from "react-redux";
import { Grid, Segment, List, Button, Table, Icon, Modal, Header, Form, Checkbox, Message, Menu } from 'semantic-ui-react';

type CategoryProps =
    CategoryStore.CategoryState
    & typeof CategoryStore.actionCreators
    & RouteComponentProps<{}>;

type ComponentState = {
    formIsOpen: boolean;
    formCategory: CategoryStore.CategoryListItem;
    formDirty: boolean;
}

const unloadedState: ComponentState = {
    formIsOpen: false,
    formCategory: { name: "", beverage: false },
    formDirty: false
}

class Category extends React.Component<CategoryProps, ComponentState> {

    //INPUT ELEMENT STRINGS
    NameInput : string = "CategoryName";
    BeverageCheck: string = "BeverageCheckBox";

    //----------------Class Methods-------------------------------------------------------------------------

    constructor(props: CategoryProps) {
        super(props);
    }

    componentWillMount() {
        this.props.requestCategories();
    }

    componentDidMount() {
        this.setDefaultState();
    }

    componentWillReceiveProps(nextProps: CategoryProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!nextProps.saving && this.props.saving) {
            if (this.props.saveResult != undefined && !this.props.saveResult.success) {
                alert(this.props.saveResult.message);
            }
            this.closeForm();
        }
    }

    //-------------------------------------------------------------------------------------------------------

    //----------------Private Methods------------------------------------------------------------------------

    private setDefaultState(force: boolean = false) {
        if(this.state === undefined || force)
            this.setState(unloadedState);
    }

    private getState(){
        return this.state || unloadedState;
    }

    private closeForm() {
        this.setState({ ...this.getState(), formIsOpen: false });
    }

    private showForm() {
        this.setState({ ...this.getState(), formIsOpen: true });
    }

    private validForm() {
        return this.getState().formCategory != undefined && this.getState().formCategory.name !== "";
    }

    //--------------------------------------------------------------------------------------------------------

    //-----------------------------------Event Listener-------------------------------------------------------

    private saveCategoryEventListener(event: React.SyntheticEvent<HTMLButtonElement>) {
        this.props.saveCategory(this.getState().formCategory);
        this.setState({ formIsOpen: !this.getState().formIsOpen });
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        var name = event.currentTarget.id;
        switch (name) {
            case this.NameInput:
                var newName = event.currentTarget.value;
                this.setState({ formCategory: { ...this.getState().formCategory, name: newName }, formDirty: true });
                break;

            case this.BeverageCheck:
                var checked = event.currentTarget.checked;
                this.setState({ formCategory: {...this.getState().formCategory, beverage: checked}, formDirty:true})
                break;
        }
    }

    //--------------------------------------------------------------------------------------------------------


    //------RENDER METHODS----------//

    public render() {
        return <div>
            {this.renderCatalogHeader()}
            {this.renderTable()}
            {this.renderForm()}
        </div>;
    }

    //Returns true when data is invalid.


    private renderForm() {
        return <Modal open={this.getState().formIsOpen} size='small'>
            <Header icon='archive' content='Category Details' />
            <Modal.Content>
                <Form loading={this.props.saving} error={!this.validForm()}>
                    <Form.Field>
                        <label>Category Name</label>
                        <Form.Input label='Category Name' placeholder='' id={this.NameInput} onChange={e => this.handleChange(e)} value={this.getState().formCategory.name} />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox id={this.BeverageCheck} label='Beverage' checked={this.getState().formCategory.beverage} onChange={e => this.handleChange(e)} />
                    </Form.Field>
                    <Message
                        error
                        header='Invalid Name'
                        content='The entered Category name is invalid.'
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={e => this.closeForm()}>
                    <Icon name='remove'/> Cancel
                </Button>
                <Button color='green' onClick={e=> this.saveCategoryEventListener(e)} disabled={!this.getState().formDirty}>
                    <Icon name='checkmark' /> Done
                </Button>
            </Modal.Actions>
        </Modal>
    }

    private renderNoItems() {
        if (this.props.categories != undefined && this.props.categories.length === 0) {
            return (<Table.Row >
                <Table.Cell colSpan='11'>
                    <Segment active={this.props.categories != undefined && this.props.categories.length === 0}>Currently there are no categories added. Click on 'Add Category' to add to the list</Segment>
                </Table.Cell>
            </Table.Row>)
        }
    }

    private renderTable() {

        return <Table celled compact definition selectable>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Button Color</Table.HeaderCell>
                    <Table.HeaderCell>Text Color</Table.HeaderCell>
                    <Table.HeaderCell>Beverage</Table.HeaderCell>
                    <Table.HeaderCell>Creation Date</Table.HeaderCell>
                    <Table.HeaderCell>Created By</Table.HeaderCell>
                    <Table.HeaderCell>Update Date</Table.HeaderCell>
                    <Table.HeaderCell>Updated By</Table.HeaderCell>
                    <Table.HeaderCell>Deleted</Table.HeaderCell>
                    <Table.HeaderCell><Button floated='right' icon labelPosition='left' primary size='small' onClick={e => this.showForm()}><Icon name='user' /> Add Category </Button></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.renderNoItems()}
                {this.props.categories.map((mapCategory, i) => {
                    return (<Table.Row key={i}>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>{mapCategory.name}</Table.Cell>
                        <Table.Cell>{mapCategory.buttonColor}</Table.Cell>
                        <Table.Cell>{mapCategory.textColor}</Table.Cell>
                        <Table.Cell>{mapCategory.beverage}</Table.Cell>
                        <Table.Cell>{mapCategory.creationDate}</Table.Cell>
                        <Table.Cell>{mapCategory.creationUserId}</Table.Cell>
                        <Table.Cell>{mapCategory.updateDate}</Table.Cell>
                        <Table.Cell>{mapCategory.updateUserId}</Table.Cell>
                        <Table.Cell>{mapCategory.isDeleted}</Table.Cell>
                        <Table.HeaderCell><Button floated='right' icon labelPosition='left' primary size='small'> <Icon name='delete' /> Edit Category </Button>
                            <Button floated='right' icon labelPosition='left' primary size='small'> <Icon name='edit' /> Delete Category </Button>
                        </Table.HeaderCell>
                    </Table.Row>);
                })}
            </Table.Body>
            <Table.Footer fullWidth>
            </Table.Footer>
        </Table>
    }

    private renderCatalogHeader() {
        return <Segment size = 'large'>
                Categories
            </Segment>
    }

    private renderSubMenu() {
        <Menu>
            <Menu.Menu position='right'>
                <Menu.Item name='new-item' onClick={e => this.showForm()}>
                    <Icon name='add' />
                    New Category
                </Menu.Item>
                <Menu.Item name='new-item' onClick={e => this.showForm()}>
                    <Icon name='add' />
                    New Category
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    }

    //-------END RENDER METHODS-----//

}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.category, // Selects which state properties are merged into the component's props
    CategoryStore.actionCreators// Selects which action creators are merged into the component's props
)(Category) as typeof Category;