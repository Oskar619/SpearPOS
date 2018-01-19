import { AppThunkAction } from "ClientApp/store";
import { addTask, fetch } from "domain-task";
import { Reducer } from "redux";

export interface CategoryState {
    selectedCategory?: CategoryListItem;
    categories: CategoryListItem[];
    newCategory?: CategoryListItem;
    
}

export interface CategoryListItem{
    Id: number;
    Name: number;
    Beverage: boolean;
    ButtonColor: number;
    TextColor: number;
}
enum Action {
    RequestCategories = 'REQUEST_CATEGORIES',
    ReceiveCategories = 'RECEIVE_CATEGORIES',
    CreateCategory = 'CREATE_CATEGORY',
    EditCategory = 'EDIT_CATEGORY',
    DeleteCategory = 'DELETE_CATEGORY',
    SaveCategory = 'SAVE_CATEGORY',
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

interface EditCategoryAction {
    type: Action.EditCategory,
    category: CategoryListItem
}

interface DeleteCategoryAction {
    type: Action.DeleteCategory,
    category: CategoryListItem
}

interface SaveCategoryAction {
    type: Action.SaveCategory,
    category: CategoryListItem
}

type KnownAction = SaveCategoryAction | DeleteCategoryAction | EditCategoryAction | CreateCategoryAction
    | ReceiveCategoriesAction | RequestCategoriesAction;

export const actionCreators = {
    requestCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/Category/GetCategories')
            .then(response => response.json() as Promise<CategoryListItem[]>)
            .then(data => {
                dispatch({ type: Action.ReceiveCategories, categories: data });
            });
        addTask(fetchTask);
        dispatch({ type: Action.RequestCategories });
    },
    createCategory: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: Action.CreateCategory });
    },
    editCategory: (category: CategoryListItem): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: Action.EditCategory, category:category });
    },
    deleteCategory: (category: CategoryListItem): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: Action.DeleteCategory, category: category });
    },
    saveCategory: (category: CategoryListItem): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: Action.SaveCategory, category: category });
    }
}

const unloadedState: CategoryState = {
    categories : []
}

export const reducer: Reducer<CategoryState> = (state: CategoryState, action: KnownAction) => {
    switch (action.type) {
        case Action.RequestCategories:
            return { ...state };
        case Action.ReceiveCategories:
            return { ...state, categories : action.categories };
        case Action.CreateCategory:
            return {
                ...state, newCategory: Object()
            };
        case Action.EditCategory:
            return { ...state, selectedCategory:action.category };
        case Action.DeleteCategory:
            return { ...state, selectedCategory:action.category };
        case Action.SaveCategory:
            return { ...state, selectedCategory:action.category };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}