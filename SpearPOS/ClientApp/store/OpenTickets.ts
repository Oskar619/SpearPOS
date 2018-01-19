import { Action, Reducer } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OpenTicketsState {
    tickets: OpenTicketListItem[];
    tableSelection: boolean;
    tableSelected?: TableListItem;
    fetching: boolean;
}

enum Actions {
    RequestOpenTickets = 'REQUEST_OPEN_TICKETS',
    ReceiveOpenTickets = 'RECEIVE_OPEN_TICKETS',
    TableSelection = 'TABLE_SELECTION',
    TablesReceived = 'TABLES_RECEIVED',
    TableSelected = 'TABLE_SELECTED'
}

export interface OpenTicketListItem {
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

export interface TableListItem {
    Id: number;
    Name: string;
    Busy: boolean;
    GuestNumber: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestOpenTicketsAction {
    type: Actions.RequestOpenTickets
}

interface ReceiveOpenTicketsAction {
    type: Actions.ReceiveOpenTickets,
    tickets: OpenTicketListItem[]
}

interface TableSelectionAction {
    type: Actions.TableSelection
}

interface TablesReceivedAction {
    type: Actions.TablesReceived
    tables : TableListItem[]
}

interface TableSelectedAction {
    type: Actions.TableSelected,
    tableSelected: TableListItem
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestOpenTicketsAction | ReceiveOpenTicketsAction | TableSelectionAction | TableSelectedAction | TablesReceivedAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOpenTickets: () : AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
            let fetchTask = fetch(`api/Tickets/OpenTickets`)
                .then(response => response.json() as Promise<OpenTicketListItem[]>)
                .then(data => {
                    dispatch({ type: Actions.ReceiveOpenTickets, tickets: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: Actions.RequestOpenTickets});
    },
    tableSelection: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('api/Tables')
            .then(response => response.json() as Promise<TableListItem[]>)
            .then(data => {
                dispatch({ type: Actions.TablesReceived, tables: data })
            });
        addTask(fetchTask);
        dispatch({ type: Actions.TableSelection });
    }
};


const unloadedState: OpenTicketsState = { tickets: [], tableSelection:false, fetching:false };
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<OpenTicketsState> = (state: OpenTicketsState, action: KnownAction) => {
    switch (action.type) {
        case Actions.RequestOpenTickets:
            return {
                ...state, fetching:true
            };
        case Actions.ReceiveOpenTickets:
            return {
                ...state,
                tickets: action.tickets,
                fetching: false
            };
        case Actions.TableSelected:
            return { ...state, tableSelected: action.tableSelected};
        case Actions.TableSelection:
            return { ...state, fetching:true };
        case Actions.TablesReceived:
            return { ...state, tableSelection: true, fetching:false};
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};
