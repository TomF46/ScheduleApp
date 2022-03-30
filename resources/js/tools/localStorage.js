import initialState from "../redux/reducers/initialState";
import { attatchBearerToken } from "./axiosClient";

export const loadState = () => {
    const tokens = localStorage.getItem("tokens");
    let tokensState = tokens == null ? null : JSON.parse(tokens);
    if (tokensState != null) attatchBearerToken(tokensState.access_token); // If we have access tokens add them as bearer token on axios client;
    const bag = localStorage.getItem("bag");
    let bagState = bag == null ? [] : JSON.parse(bag);
    let state = initialState;
    state.tokens = tokensState;
    state.bag = bagState;
    return state;
};

export const saveTokens = tokens => {
    try {
        const serializedState = JSON.stringify(tokens);
        localStorage.setItem("tokens", serializedState);
    } catch {
        // ignore write errors
    }
};

export const removeTokens = () => {
    try {
        localStorage.removeItem("tokens");
    } catch {
    }
};

export const saveBag = bag => {
    try {
        const serializedState = JSON.stringify(bag);
        localStorage.setItem("bag", serializedState);
    } catch {
        // ignore write errors
    }
}
