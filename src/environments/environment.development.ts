export const environment = {
    apiUrl: 'http://localhost:3000/prod',
    
    getProducts: () => {
        return environment.apiUrl + '/products';
    },

    getCart:  () => {
        return environment.apiUrl + '/carts';
    }

};
