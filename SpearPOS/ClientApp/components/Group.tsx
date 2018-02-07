import * as CategoryStore from '../store/Category';
import { RouteComponentProps } from "react-router-dom";
import * as React from "React";
import { ApplicationState } from "ClientApp/store";
import { connect } from "react-redux";
import { Grid, Segment, List, Button, Table, Icon, Modal, Header, Form, Checkbox, Message, Menu, Input } from 'semantic-ui-react';
import { DateFormatter } from '../lib/Utils';

type GroupProps =
    CategoryStore.CategoryState
    & typeof CategoryStore.actionCreators
    & RouteComponentProps<{}>;

type ComponentState = {
    formIsOpen: boolean;
    formCategory: CategoryStore.ItemCategory;
    formDirty: boolean;
    filtered: boolean;
    filteredList: CategoryStore.ItemCategory[];
}

const unloadedState: ComponentState = {
    formIsOpen: false,
    formCategory: { Name: "", Beverage: false },
    formDirty: false,
    filtered: false,
    filteredList: []
}

class Category extends React.Component<GroupProps, ComponentState> {


    //INPUT ELEMENT STRINGS
    NameInput : string = "CategoryName";
    BeverageCheck: string = "BeverageCheckBox";
    FilterInput: string = "FilterInput";

    //----------------Class Methods-------------------------------------------------------------------------

    constructor(props: GroupProps) {
        super(props);
    }

    componentWillMount() {
        this.props.requestCategories();
    }

    componentDidMount() {
        this.setDefaultState();
    }

    componentWillReceiveProps(nextProps: GroupProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!nextProps.saving && this.props.saving) {
            if (this.props.saveResult != undefined && !this.props.saveResult.Success) {
                alert(this.props.saveResult.Message);
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

    private getCategories(): CategoryStore.ItemCategory[] {
        if (this.getState().filtered) {
            return this.getState().filteredList;
        }
        return this.props.categories;
    }

    private closeForm() {
        this.setState({ ...this.getState(), formIsOpen: false });
    }

    private showForm() {
        this.setState({ ...this.getState(), formIsOpen: true });
    }

    private validForm() {
        return this.getState().formCategory != undefined && this.getState().formCategory.Name !== "";
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
                this.setState({ formCategory: { ...this.getState().formCategory, Name: newName }, formDirty: true });
                break;

            case this.BeverageCheck:
                var checked = event.currentTarget.checked;
                this.setState({ formCategory: {...this.getState().formCategory, Beverage: checked}, formDirty:true})
                break;

            case this.FilterInput:
                var filter = event.currentTarget.value;
                if (filter == "") {
                    this.setState({...this.getState(), filtered: false, filteredList: [] })
                } else {

                }
                this.setState({ ...this.getState(), filtered: true, filteredList: this.props.categories.filter(x => x.Name && x.Name.indexOf(filter) >= 0)})
                break;
        }
    }

    private handleRowClick(categoryId: number) {
        this.props.setActiveCategory(categoryId);
    }

    //--------------------------------------------------------------------------------------------------------


    //------RENDER METHODS----------//

    public render() {
        return <div>
            {this.renderSubMenu()}
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
                        <Form.Input label='Category Name' placeholder='' id={this.NameInput} onChange={e => this.handleChange(e)} value={this.getState().formCategory.Name} />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox id={this.BeverageCheck} label='Beverage' checked={this.getState().formCategory.Beverage} onChange={e => this.handleChange(e)} />
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
                <Button color='green' onClick={e => this.saveCategoryEventListener(e)} disabled={!this.getState().formDirty}>
                    <Icon name='checkmark' /> Done
                </Button>
            </Modal.Actions>
        </Modal>
    }

    private renderNoItems() {
        if (this.getCategories() != undefined && this.getCategories().length === 0) {
            return (<Table.Row>
                <Table.Cell colSpan='11'>
                    <Segment>{this.getMessageString()}</Segment>
                </Table.Cell>
            </Table.Row>)
        }
    }

    private getMessageString() {
        if (this.getState().filtered) return "Seems like there's currently no match value for the entered filter.";

        return "Currently there are no categories added. Click on 'Add Category' to add to the list.";
    }

    private renderTable() {

        return <Segment size='large'>
            <Table celled definition selectable sortable striped>
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
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.renderNoItems()}
                {this.getCategories().map((mapCategory, i) => {
                        return (<Table.Row key={i} onClick={() => this.handleRowClick(mapCategory.Id || 0)} active={this.props.selectedCategory != undefined && this.props.selectedCategory.Id === mapCategory.Id}>
                            <Table.Cell><Icon name='caret right' size="small" disabled={this.props.selectedCategory === undefined || this.props.selectedCategory.Id !== mapCategory.Id} /></Table.Cell>
                        <Table.Cell>{mapCategory.Name}</Table.Cell>
                        <Table.Cell>{mapCategory.ButtonColor}</Table.Cell>
                        <Table.Cell>{mapCategory.TextColor}</Table.Cell>
                        <Table.Cell>{mapCategory.Beverage}</Table.Cell>
                        <Table.Cell>{mapCategory.CreationDate ? DateFormatter.Format(mapCategory.CreationDate) : ""}</Table.Cell>
                        <Table.Cell>{mapCategory.CreationUserId}</Table.Cell>
                        <Table.Cell>{mapCategory.UpdateDate ? DateFormatter.Format(mapCategory.UpdateDate) : ""}</Table.Cell>
                        <Table.Cell>{mapCategory.UpdateUserId}</Table.Cell>
                        <Table.Cell>{mapCategory.IsDeleted}</Table.Cell>
                    </Table.Row>);
                })}
            </Table.Body>
            <Table.Footer fullWidth>
            </Table.Footer>
        </Table>
      </Segment>
    }

    private renderCatalogHeader() {
        return <Segment size = 'large'>
                Categories
            </Segment>
    }

    private editItem() {
        this.setState({ ...this.getState(), formCategory: this.props.selectedCategory || this.getState().formCategory }, () => {
            this.showForm();
        });
    }

    private newItem() {
        this.setState({ ...this.getState(), formCategory: {} }, () => {
            this.showForm();
        });
    }

    private renderSubMenu() {
           return <Menu color='blue'>
               <Menu.Item header><h1>Categories</h1></Menu.Item>
               <Menu.Item><Input icon='search' id={this.FilterInput} placeholder='Filter...' onChange={e => this.handleChange(e)}/></Menu.Item>
               <Menu.Item position='right'>
                   <Button.Group>
                   <Button basic color='yellow' disabled={this.props.selectedCategory === undefined} onClick={e => this.editItem()}><Icon name='write' /> Edit Category</Button>
                   <Button basic color='green' onClick={e => this.newItem()}><Icon name='add' /> New Category</Button>
                   </Button.Group>
                </Menu.Item>
            </Menu>
    }

    //-------END RENDER METHODS-----//

}



// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.category, // Selects which state properties are merged into the component's props
    CategoryStore.actionCreators// Selects which action creators are merged into the component's props
)(Category) as typeof Category;