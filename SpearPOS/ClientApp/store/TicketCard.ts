import { Action, Reducer } from 'redux';
import { OpenTicketListItem } from "ClientApp/store/OpenTickets";


export interface TicketCardState {
    ticketInfo : OpenTicketListItem;
    menuOpen: boolean;
}


interface OpenCollapseAction {
    type: 'OPEN_TICKET_CARD_COLLAPSE';
}

interface CloseCollapseAction {
    type: 'CLOSE_TICKET_CARD_COLLAPSE';
}

type KnownAction = OpenCollapseAction | CloseCollapseAction;

export const actionCreators = {
    openCollapse: () => <OpenCollapseAction>{ type: 'OPEN_TICKET_CARD_COLLAPSE' },
    closeCollapse: () => <CloseCollapseAction>{ type: 'CLOSE_TICKET_CARD_COLLAPSE' }
};

export const reducer: Reducer<TicketCardState> = (state: TicketCardState, action: KnownAction) => {
    switch (action.type) {
        case 'OPEN_TICKET_CARD_COLLAPSE':
            return { ticketInfo: state.ticketInfo, menuOpen: true };
        case 'CLOSE_TICKET_CARD_COLLAPSE':
            return { ticketInfo: state.ticketInfo, menuOpen: false };
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { count: 0 };
};