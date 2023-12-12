import {createLogger} from "vite";

const logger = createLogger({
    collapsed: false, // auto-expand logged mutations
    filter (mutation, stateBefore, stateAfter) {
        // returns `true` if a mutation should be logged
        // `mutation` is a `{ type, payload }`
        console.log("logger filter", mutation);
        return mutation.type !== "aBlocklistedMutation"
    },
    actionFilter (action, state) {
        // same as `filter` but for actions
        // `action` is a `{ type, payload }`
        console.log("logger actionFilter", action, state);
        return action.type !== "aBlocklistedAction"
    },
    transformer (state) {
        // transform the state before logging it.
        // for example return only a specific sub-tree
        console.log("logger transformer", state);
        return state.subTree
    },
    mutationTransformer (mutation) {
        // mutations are logged in the format of `{ type, payload }`
        // we can format it any way we want.
        console.log("logger mutationTransformer", mutation);
        return mutation.type
    },
    actionTransformer (action) {
        // Same as mutationTransformer but for actions
        console.log("logger actionTransformer", action);
        return action.type
    },
    logActions: true, // Log Actions
    logMutations: true, // Log mutations
    logger: console, // implementation of the `console` API, default `console`
})