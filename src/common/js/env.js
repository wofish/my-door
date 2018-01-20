let baseUrl;

if (process.env.NODE_ENV === 'development') {
    baseUrl = '';
} else {
    baseUrl = '';
}

export {
    baseUrl
};

