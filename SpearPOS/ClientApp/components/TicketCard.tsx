
import { TicketCardState, actionCreators } from "ClientApp/store/TicketCard";
import * as React from "React";

type TicketCardProps = TicketCardState
    & typeof actionCreators;

class TicketCard extends React.Component<TicketCardProps, {}> {

    public render(){
        return <div>
        </div>;
    }
}