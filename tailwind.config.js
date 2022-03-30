module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#E94F37',
            'secondary': '#393E41',
            'danger': '#b41e00'
        }),
        textColor: theme => ({
            ...theme('colors'),
            'primary': '#E94F37',
            'secondary': '#393E41',
        }),
        borderColor: theme => ({
            ...theme('colors'),
            'primary': '#E94F37',
            'secondary': '#393E41',
        })
    },
    variants: {},
    plugins: []
};
