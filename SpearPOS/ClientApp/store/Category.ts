import { AppThunkAction } from "ClientApp/store";
import { addTask, fetch } from "domain-task";
import { Reducer } from "redux";
import { GenericApiResponseWithResult } from "ClientApp/store/ApiResponse";

export interface CategoryState {
    selectedCategory?: ItemCategory;
    categories: ItemCategory[];
    saving: boolean;
    fetching: boolean;
    saveResult?: GenericApiResponseWithResult<ItemCategory>;
}

export interface ItemCategory{
    Id?: number;
    Name?: string;
    Beverage?: boolean;
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
    RequestCategories = 'REQUEST_CATEGORIES',
    ReceiveCategories = 'RECEIVE_CATEGORIES',
    CreateCategory = 'CREATE_CATEGORY',
    SaveCategory = 'SAVE_CATEGORY',
    SaveCategoryResponse = 'SAVE_CATEGORY_RESPONSE',
    SetActiveCategory = 'SET_ACTIVE_CATEGORY',
}

interface RequestCategoriesAction {
    type: Action.RequestCategories
}

interface ReceiveCategoriesAction {
    type: Action.ReceiveCategories,
    categories: ItemCategory[]
}

interface CreateCategoryAction {
    type: Action.CreateCategory
}

interface SaveCategoryAction {
    type: Action.SaveCategory,
    category?: ItemCategory
}

interface SaveCategoryResponse {
    type: Action.SaveCategoryResponse,
    response: GenericApiResponseWithResult<ItemCategory>
}

export class API {
    static Get: string = '/api/Category/GetCategories';
    static Save: string = 'api/Category/SaveCategory';
    static GeneratePostRequest: any = (body : string) => {
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

interface SetActiveCategoryAction {
    type: Action.SetActiveCategory,
    id: number
}

type KnownAction = SaveCategoryAction | CreateCategoryAction
    | ReceiveCategoriesAction | RequestCategoriesAction | SaveCategoryResponse | SetActiveCategoryAction;

export const actionCreators = {
    requestCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(API.Get)
            .then(response => response.json() as Promise<GenericApiResponseWithResult<ItemCategory[]>>)
            .then(data => {
                dispatch({ type: Action.ReceiveCategories, categories: data.Result });
            });
        addTask(fetchTask);
        dispatch({ type: Action.RequestCategories });
    },
    createCategory: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.CreateCategory });
    },
    saveCategory: (category: ItemCategory): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(API.Save, API.GeneratePostRequest(JSON.stringify(category)))
            .then(response => response.json() as Promise<GenericApiResponseWithResult<ItemCategory>>)
            .then(data => {
                dispatch({ type: Action.SaveCategoryResponse, response: data })
                dispatch({type: Action.RequestCategories})
            });
        addTask(fetchTask);
        if (category === undefined) { return;}
        dispatch({ type: Action.SaveCategory, category: category });
    },
    setActiveCategory: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.SetActiveCategory, id: id });
    }
}

const unloadedState: CategoryState = {
    categories: [],
    saving: false,
    fetching: false
}

export const reducer: Reducer<CategoryState> = (state: CategoryState, action: KnownAction) => {
    switch (action.type) {
        case Action.RequestCategories:
            return { ...state, fetching:true };
        case Action.ReceiveCategories:
            return { ...state, categories : action.categories, fetching:false };
        case Action.CreateCategory:
            return {
                ...state, newCategory: Object()
            };
        case Action.SaveCategory:
            return { ...state, selectedCategory: action.category, saving:true };
        case Action.SaveCategoryResponse:
            var newCategories = state.categories.filter(x => x.Id != action.response.Result.Id).concat(action.response.Result);
            return { ...state, categories: newCategories, saving: false, saveResult: action.response };
        case Action.SetActiveCategory:
            var activeCat = state.categories.find(x => x.Id == action.id);
            return { ...state, selectedCategory: activeCat };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}