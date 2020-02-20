const cars = [
    `Toyota Avensis`,
    `Fiat Tipo`,
    `BMW E46`,
    `Ford Focus`,
    `Toyota Hilux`,
    `Toyota Corolla`,
    `Honda CRV`,
    `Ford Mondeo`,
    `Ford Fusion`,
    `Audi A3`,
    `Toyota Yaris`,
    `Bugatti Veyron`,
    `Pagani Zonda`,
    `Honda Civic`,
    `Volkswagen Polo`,
];

export const getBids = () => {
    return new Array((+(Math.random() * 1e+5).toFixed(0) % 8)).fill().map(() => ({
        id: (Math.random() * 1e+5).toFixed(0),
        carTitle: cars[(+(Math.random() * 1e+5).toFixed(0) % cars.length)],
        created: new Date().toGMTString(),
    }));
};
