const pokemonPlugin = (store) => {
    // Called when the store is initialized
    store.subscribe((mutation, state) => {
        // Custom logic to be executed on each mutation
        console.log('Plugin get Mutation:', mutation.type);
        console.log('Plugin get State:', state);
    });
};

export default pokemonPlugin;

