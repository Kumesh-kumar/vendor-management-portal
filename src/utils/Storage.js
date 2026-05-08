// Save data
export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

// Get data
export const getItem = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Remove data
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};