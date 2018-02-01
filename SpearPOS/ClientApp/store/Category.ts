import { AppThunkAction } from "ClientApp/store";
import { addTask, fetch } from "domain-task";
import { Reducer } from "redux";
import { GenericApiResponseWithResult } from "ClientApp/store/ApiResponse";

export interface CategoryState {
    selectedCategory?: CategoryListItem;
    categories: CategoryListItem[];
    saving: boolean;
    fetching: boolean;
    saveResult?: GenericApiResponseWithResult<CategoryListItem>;
}

export interface CategoryListItem{
    id?: number;
    name?: string;
    beverage?: boolean;
    buttonColor?: number;
    textColor?: number;
    isDeleted?: boolean;
    updateDate?: string;
    creationDate?: string;
    creationUserId?: string;
    sortOrder?: number;
    updateUserId?: string;
}

enum Action {
    RequestCategories = 'REQUEST_CATEGORIES',
    ReceiveCategories = 'RECEIVE_CATEGORIES',
    CreateCategory = 'CREATE_CATEGORY',
    EditCategory = 'EDIT_CATEGORY',
    DeleteCategory = 'DELETE_CATEGORY',
    SaveCategory = 'SAVE_CATEGORY',
    SaveCategoryResponse = 'SAVE_CATEGORY_RESPONSE',
}

interface RequestCategoriesAction {
    type: Action.RequestCategories
}

interface ReceiveCategoriesAction {
    type: Action.ReceiveCategories,
    categories: CategoryListItem[]
}

interface CreateCategoryAction {
    type: Action.CreateCategory
}

interface SaveCategoryAction {
    type: Action.SaveCategory,
    category?: CategoryListItem
}

interface SaveCategoryResponse {
    type: Action.SaveCategoryResponse,
    response: GenericApiResponseWithResult<CategoryListItem>
}

type KnownAction = SaveCategoryAction | CreateCategoryAction
    | ReceiveCategoriesAction | RequestCategoriesAction | SaveCategoryResponse;

export const actionCreators = {
    requestCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/Category/GetCategories')
            .then(response => response.json() as Promise<GenericApiResponseWithResult<CategoryListItem[]>>)
            .then(data => {
                dispatch({ type: Action.ReceiveCategories, categories: data.result });
            });
        addTask(fetchTask);
        dispatch({ type: Action.RequestCategories });
    },
    createCategory: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.CreateCategory });
    },
    saveCategory: (category: CategoryListItem): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('api/Category/SaveCategory', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
            .then(response => response.json() as Promise<GenericApiResponseWithResult<CategoryListItem>>)
            .then(data => {
                dispatch({ type: Action.SaveCategoryResponse, response: data })
            });
        addTask(fetchTask);
        if (category === undefined) { return;}
        dispatch({ type: Action.SaveCategory, category: category });
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
            var newCategories = state.categories.concat(action.response.result)
            return { ...state, categories: newCategories, saving:false, saveResult: action.response }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}