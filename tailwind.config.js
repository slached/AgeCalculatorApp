module.exports = {
    content: [
        './src/components/App.js',
        './src/components/AgeCalculator.js',
        './src/components/style/global.css'

    ],
    theme: {
        extend: {
            fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                base: '1rem',
                xl: '1.25rem',
                '2xl': '1.563rem',
                '3xl': '1.953rem',
                '4xl': '2.441rem',
                '5xl': '3.052rem',
            },
            colors: {
                'grey-background': 'hsl(0, 0%, 94%)',
                'purple-button' : 'hsl(259, 100%, 65%)'
            },

        },

        fontFamily: {
            'body': ["Poppins"],
        },

    },
    plugins: [],
}
