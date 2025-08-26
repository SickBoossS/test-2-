export const addOrUpdateProduct = (cart, product) => {
    const itemIndex = cart.findIndex((item) => item.id_producto === product.id_producto);
    if (itemIndex !== -1) {
        return cart.map((item) =>
            item.id_producto === product.id_producto
                ? { ...item, count: item.count + 1 }
                : item
        );
    }
    return [...cart, { ...product, count: 1 }];
};

export const updateProductQuantity = (cart, productId, amount) => {
    return cart.map((item) =>
        item.id_producto === productId
            ? { ...item, count: Math.max(item.count + amount, 0) }
            : item
    );
};

export const removeProduct = (cart, productId) => {
    return cart.filter((item) => item.id_producto !== productId);
};

export const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => {
        const price = Number(item.precio_venta);
        return sum + price * item.count;
    }, 0);
};
