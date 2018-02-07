import { AppThunkAction } from "ClientApp/store";
import { addTask, fetch } from "domain-task";
import { GenericApiResponse, GenericApiResponseWithResult } from "ClientApp/store/ApiResponse";
import { Reducer } from "redux";

export interface RetailState {
    ticket?: RetailTicket;
    items?: RetailTicketItem[];
    tableId?:number;
    categories?: RetailCategoryListItem[];
    ticketType?:string;
    isSaving:boolean;
    saveResult?:GenericApiResponse;
    dirty: boolean;
    modifierId?: number;
    selectedCategory?: RetailCategoryListItem;
    selectedGroup?: RetailGroupListItem;
    selectedItem?: RetailItem;
    modifierGroupId?: number;
    groupId?: number;
    categoryId?: number;
    itemId?: number;
}


export interface RetailTicket{
    Id: number;
    Settled: boolean;
    Paid: boolean;
    Voided: boolean;
    SubTotal: number;
    TotalDiscount: number;
    TotalTax: number;
    TotalPrice: number;
    PaidAmount: number;
    DueAmount: number;
    GuestNumber: number;
    Status: string;
    CreationDate: string;
    ClosingDate: string;
    TableId: number;
}

export interface RetailTicketItem {
    Id: number;
    Printed:boolean;
    Paid:boolean;
    Price:number;
    Delivered:boolean;
    Voided:boolean;
}

export interface RetailItemModifier{
    Id:number;
    Name:string;
    Cost:number;
    Quantity:number;
}

export interface RetailItemModifierGroup{
    Id:number;
    Name: string;
    WorkflowOrder: number;
    Required:boolean;
    Modifiers: RetailItemModifier[];
}

export interface RetailItem{
    Id: number;
    Description: string;
    Cost: number;
    ModifierGroups: RetailItemModifierGroup[];
}

export interface RetailGroupListItem{
    Id: number;
    CategoryId: number;
    Name: string;
    TextColor: number;
    ButtonColor: number;
    Items: RetailItem[];
}

export interface RetailCategoryListItem{
    Id : number;
    Name : string;
    ButtonColor: number;
    Groups: RetailGroupListItem[];
    TextColor: number;
    Beverage: boolean;
}

interface CreateTicketAction{
    type:'CREATE_TICKET',
    ticketType?:string,
}

interface ReceiveTicketAction{
    type:'RECEIVE_TICKET',
    ticketType?:string,
    ticketInfo?: RetailTicket
}

interface RequestRetailTicketItemsAction {
    type: 'REQUEST_RETAIL_TICKET_ITEMS',
    ticketId:number
}

interface ReceiveRetailTicketItemsAction {
    type: 'RECEIVE_RETAIL_TICKET_ITEMS',
    ticketItems:RetailTicketItem[]
}

interface RequestRetailDataAction {
    type: 'REQUEST_RETAIL_DATA',
    ticketType?: string
}

interface ReceiveRetailDataAction{
    type:'RECEIVE_RETAIL_DATA',
    items: RetailCategoryListItem[]
}

interface SaveTicketAction{
    type:'SAVE_TICKET',
    ticketItems: RetailTicketItem[],
    ticketInfo: RetailTicket
}

interface SaveTicketResponseAction{
    type:'SAVE_TICKET_RESPONSE',
    response: GenericApiResponse
}

interface AddTicketItemAction{
    type:'ADD_TICKET_ITEM',
    item: RetailTicketItem
}

interface RemoveTicketItemAction{
    type:'REMOVE_TICKET_ITEM',
    item: RetailTicketItem
}

interface CategorySelectedAction{
    type:'SELECT_CATEGORY',
    categoryId: number
}

interface GroupSelectedAction{
    type:'SELECT_GROUP',
    groupId: number
}

interface ItemSelectedAction{
    type: 'SELECT_ITEM',
    itemId: number
}

interface SelectModifierAction{
    type: 'SELECT_MODIFIER',
    modifierId: number
}

interface SelectModifierGroupAction {
    type: 'SELECT_MODIFIER_GROUP',
    modifierGroupId: number
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestRetailTicketItemsAction 
| ReceiveRetailTicketItemsAction | RequestRetailDataAction 
| ReceiveRetailDataAction | ReceiveTicketAction 
| CreateTicketAction | SaveTicketAction 
| SaveTicketResponseAction | AddTicketItemAction 
| RemoveTicketItemAction | CategorySelectedAction 
| GroupSelectedAction | ItemSelectedAction | SelectModifierAction | SelectModifierGroupAction;

export const actionCreators = {
    createTicket: (ticketType: string, tableId:number = 0) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
            let fetchTask = fetch(`api/Retail/Create/${ticketType}/${tableId}`)
                .then(response => response.json() as Promise<RetailTicket>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TICKET', ticketType: ticketType, ticketInfo: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'CREATE_TICKET', ticketType:ticketType});
    },
    requestRetailData: (ticketType:string) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
            let fetchTask = fetch(`api/Retail/GetRetailData`)
                .then(response => response.json() as Promise<GenericApiResponseWithResult<RetailCategoryListItem[]>>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_RETAIL_DATA', items: data.Result });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_RETAIL_DATA', ticketType:ticketType});
    },
    requestTicketItems: (ticketId: number) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
            let fetchTask = fetch(`api/Retail/GetTicketItems/${ticketId}`)
                .then(response => response.json() as Promise<RetailTicketItem[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_RETAIL_TICKET_ITEMS', ticketItems:data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_RETAIL_TICKET_ITEMS', ticketId:ticketId});
    },
    addTicketItem: (item: RetailTicketItem) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'ADD_TICKET_ITEM', item:item});
    },
    removeTicketItem:(item: RetailTicketItem) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'ADD_TICKET_ITEM', item:item});
    },
    save: (ticket: RetailTicket, items: RetailTicketItem[] ) : AppThunkAction<KnownAction> => (dispatch, getState) =>{
            let fetchTask = fetch('api/Retail/SaveRetail', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ticket: ticket,
                                items: items,
                            }),
                        })
                        .then(response => response.json() as Promise<GenericApiResponse>)
                        .then(data=> {
                            dispatch({type:'SAVE_TICKET_RESPONSE', response:data })
                        });
            addTask(fetchTask);
            dispatch({type: 'SAVE_TICKET', ticketInfo:ticket, ticketItems: items});
    },
    selectCategory: (categoryId: number) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'SELECT_CATEGORY', categoryId: categoryId});
    },
    selectGroup: (groupId: number) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'SELECT_GROUP', groupId: groupId});
    },
    selectItem: (itemId: number) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'SELECT_ITEM', itemId: itemId});
    },
    selectModifier: (modifierId: number) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'SELECT_MODIFIER', modifierId: modifierId});
    },
    selectModifierGroup: (modifierGroupId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_MODIFIER_GROUP', modifierGroupId: modifierGroupId });
    }
};

const unloadedState: RetailState = { ticket: undefined, items:[], modifierId:0, tableId:0, categories:[], ticketType: "",
                                     saveResult: undefined, isSaving:false, dirty:false, selectedCategory:undefined, selectedGroup:undefined, selectedItem:undefined  };
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<RetailState> = (state: RetailState, action: KnownAction) => {
    switch (action.type) {
        case 'CREATE_TICKET':
            return {
                ...state
            };
        case 'RECEIVE_TICKET':
            return {
                ...state,
                ticket: action.ticketInfo,
            };
        case 'REQUEST_RETAIL_TICKET_ITEMS':
            return {
                ...state
            };
        case 'RECEIVE_RETAIL_TICKET_ITEMS':
            return {
                ...state,
                items: action.ticketItems,
            };
        case 'REQUEST_RETAIL_DATA':
            return {
                ...state
            };
        case 'RECEIVE_RETAIL_DATA':
            return {
                ...state,
                categories: action.items,
            };
        case 'SAVE_TICKET':
            return {
                ...state,
                isSaving: true,
            };
        case 'SAVE_TICKET_RESPONSE':
            return {
                ...state,
                saveResult: action.response,
                dirty: action.response.Success,
                isSaving: false,
            };
        case 'ADD_TICKET_ITEM':
        var newItem = action.item;
        var newItemList = state.items != undefined ? state.items.concat(newItem) : state.items;
        var newAmount = state.ticket != undefined ? state.ticket.TotalPrice + newItem.Price : 0;
        var newTicket = state.ticket != undefined ? {...state.ticket, TotalPrice : newAmount} : state.ticket;
            return {
                ...state,
                items: newItemList,
                ticket: newTicket,
                dirty: true
            };
        case 'REMOVE_TICKET_ITEM':
        var ticketToRemove = action.item;
        var itemIndex = state.items != undefined ? state.items.indexOf(ticketToRemove) : -1;
        var newList = itemIndex != -1 && state.items != undefined ? state.items.splice(itemIndex,1) : state.items;
        var newAmount = state.ticket != undefined ? state.ticket.TotalPrice - ticketToRemove.Price : 0;
        var newTicket = state.ticket != undefined ? {...state.ticket, TotalPrice : newAmount} : state.ticket;
            return {
                ...state,
                items: newList,
                ticket: newTicket,
                dirty:true
            };
        case 'SELECT_CATEGORY':
            return {
                ...state,
                categoryId: action.categoryId
            };

        case 'SELECT_GROUP':
            return {
                ...state,
                groupId: action.groupId
            };

        case 'SELECT_ITEM':
            return {
                ...state,
                itemId: action.itemId
            };

        case 'SELECT_MODIFIER':
            return {
                ...state,
                modifierId: action.modifierId
            };

        case 'SELECT_MODIFIER_GROUP':
            return {
                ...state,
                modifierGroupId: action.modifierGroupId
            };

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};