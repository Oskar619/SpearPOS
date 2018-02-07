import { AppThunkAction } from "ClientApp/store";
import { addTask, fetch } from "domain-task";
import { Reducer } from "redux";
import { GenericApiResponseWithResult } from "ClientApp/store/ApiResponse";

export interface GroupState {
    selectedGroup?: ItemGroup;
    groups: ItemGroup[];
    saving: boolean;
    fetching: boolean;
    saveResult?: GenericApiResponseWithResult<ItemGroup>;
}

export interface ItemGroup{
    Id?: number;
    Name?: string;
    CategoryId?: number;
    ButtonColor?: number;
    TextColor?: number;
    IsDeleted?: boolean;
    UpdateDate?: Date;
    CreationDate?: Date;
    CreationUserId?: string;
    SortOrder?: number;
    UpdateUserId?: string;
    TranslatedName?: string;
}

enum Action {
    RequestGroups = 'REQUEST_GROUPS',
    ReceiveGroups = 'RECEIVE_GROUPS',
    CreateGroup = 'CREATE_GROUP',
    SaveGroup = 'SAVE_GROUP',
    SaveGroupResponse = 'SAVE_GROUP_RESPONSE',
    SetActiveGroup = 'SET_ACTIVE_GROUP',
}

class API {
    static Get: string = '/api/ItemGroup/GetGroups';
    static Save: string = 'api/ItemGroup/SaveGroup';
    static GeneratePostRequest: any = (body: string) => {
        return {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }
    }
}

interface RequestGroupsAction {
    type: Action.RequestGroups
}

interface ReceiveGroupsAction {
    type: Action.ReceiveGroups,
    groups: ItemGroup[]
}

interface CreateGroupsAction {
    type: Action.CreateGroup
}

interface SaveGroupAction {
    type: Action.SaveGroup,
    group?: ItemGroup
}

interface SaveGroupResponse {
    type: Action.SaveGroupResponse,
    response: GenericApiResponseWithResult<ItemGroup>
}


interface SetActiveGroupAction {
    type: Action.SetActiveGroup,
    id: number
}

type KnownAction = RequestGroupsAction | ReceiveGroupsAction
    | CreateGroupsAction | SaveGroupAction | SaveGroupResponse | SetActiveGroupAction;

export const actionCreators = {
    request: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(API.Get)
            .then(response => response.json() as Promise<GenericApiResponseWithResult<ItemGroup[]>>)
            .then(data => {
                dispatch({ type: Action.ReceiveGroups, groups: data.Result });
            });
        addTask(fetchTask);
        dispatch({ type: Action.RequestGroups });
    },
    create: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.CreateGroup });
    },
    save: (group: ItemGroup): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(API.Save, API.GeneratePostRequest(JSON.stringify(group)))
            .then(response => response.json() as Promise<GenericApiResponseWithResult<ItemGroup>>)
            .then(data => {
                dispatch({ type: Action.SaveGroupResponse, response: data })
                dispatch({type: Action.RequestGroups})
            });
        addTask(fetchTask);
        if (group === undefined) { return;}
        dispatch({ type: Action.SaveGroup, group: group });
    },
    setActive: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.SetActiveGroup, id: id });
    }
}

const unloadedState: GroupState = {
    groups: [],
    saving: false,
    fetching: false
}

export const reducer: Reducer<GroupState> = (state: GroupState, action: KnownAction) => {
    switch (action.type) {
        case Action.RequestGroups:
            return { ...state, fetching:true };
        case Action.ReceiveGroups:
            return { ...state, groups : action.groups, fetching:false };
        case Action.CreateGroup:
            return {
                ...state, newGroup: Object()
            };
        case Action.SaveGroup:
            return { ...state, selectedCategory: action.group, saving:true };
        case Action.SaveGroupResponse:
            var newCategories = state.groups.filter(x => x.Id != action.response.Result.Id).concat(action.response.Result);
            return { ...state, categories: newCategories, saving: false, saveResult: action.response };
        case Action.SetActiveGroup:
            var activeCat = state.groups.find(x => x.Id == action.id);
            return { ...state, selectedCategory: activeCat };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}