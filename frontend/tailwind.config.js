const colors = {
    blue: {
        100: "var(--colorPrimaryLighten4)",
        200: "var(--colorPrimaryLighten3)",
        300: "var(--colorPrimaryLighten2)",
        400: "var(--colorPrimaryLighten1)",
        500: "var(--colorPrimary)",
        600: "var(--colorPrimaryDarken1)",
        700: "var(--colorPrimaryDarken2)",
        800: "var(--colorPrimaryDarken3)",
        900: "var(--colorPrimaryDarken4)"
    },
    lightBlue: {
        100: "var(--colorSecondaryLighten4)",
        200: "var(--colorSecondaryLighten3)",
        300: "var(--colorSecondaryLighten2)",
        400: "var(--colorSecondaryLighten1)",
        500: "var(--colorSecondary)",
        600: "var(--colorSecondaryDarken1)",
        700: "var(--colorSecondaryDarken2)",
        800: "var(--colorSecondaryDarken3)",
        900: "var(--colorSecondaryDarken4)"
    },
    gray: {
        100: "var(--colorTertiaryLighten4)",
        200: "var(--colorTertiaryLighten3)",
        300: "var(--colorTertiaryLighten2)",
        400: "var(--colorTertiaryLighten1)",
        500: "var(--colorTertiary)",
        600: "var(--colorTertiaryDarken1)",
        700: "var(--colorTertiaryDarken2)",
        800: "var(--colorTertiaryDarken3)",
        900: "var(--colorTertiaryDarken4)"
    },
    lightGray: {
        100: "var(--colorQuaternaryLighten4)",
        200: "var(--colorQuaternaryLighten3)",
        300: "var(--colorQuaternaryLighten2)",
        400: "var(--colorQuaternaryLighten1)",
        500: "var(--colorQuaternary)",
        600: "var(--colorQuaternaryDarken1)",
        700: "var(--colorQuaternaryDarken2)",
        800: "var(--colorQuaternaryDarken3)",
        900: "var(--colorQuaternaryDarken4)"
    },
    green: {
        100: "var(--colorTag1Lighten4)",
        200: "var(--colorTag1Lighten3)",
        300: "var(--colorTag1Lighten2)",
        400: "var(--colorTag1Lighten1)",
        500: "var(--colorTag1)",
        600: "var(--colorTag1Darken1)",
        700: "var(--colorTag1Darken2)",
        800: "var(--colorTag1Darken3)",
        900: "var(--colorTag1Darken4)"
    },
    purple: {
        100: "var(--colorTag2Lighten4)",
        200: "var(--colorTag2Lighten3)",
        300: "var(--colorTag2Lighten2)",
        400: "var(--colorTag2Lighten1)",
        500: "var(--colorTag2)",
        600: "var(--colorTag2Darken1)",
        700: "var(--colorTag2Darken2)",
        800: "var(--colorTag2Darken3)",
        900: "var(--colorTag2Darken4)"
    },
    pink: {
        100: "var(--colorTag3Lighten4)",
        200: "var(--colorTag3Lighten3)",
        300: "var(--colorTag3Lighten2)",
        400: "var(--colorTag3Lighten1)",
        500: "var(--colorTag3)",
        600: "var(--colorTag3Darken1)",
        700: "var(--colorTag3Darken2)",
        800: "var(--colorTag3Darken3)",
        900: "var(--colorTag3Darken4)"
    },
    orange: {
        100: "var(--colorTag4Lighten4)",
        200: "var(--colorTag4Lighten3)",
        300: "var(--colorTag4Lighten2)",
        400: "var(--colorTag4Lighten1)",
        500: "var(--colorTag4)",
        600: "var(--colorTag4Darken1)",
        700: "var(--colorTag4Darken2)",
        800: "var(--colorTag4Darken3)",
        900: "var(--colorTag4Darken4)"
    }
}
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            primary: colors.blue,
            secondary: colors.lightBlue,
            tertiary: colors.gray,
            quaternary: colors.quaternary,
            blue: colors.blue,
            lightBlue: colors.lightBlue,
            gray: colors.gray,
            lightGray: colors.lightGray,
            green: colors.green,
            purple: colors.purple,
            pink: colors.pink,
            orange: colors.orange
        },
        fontSize: {
            'xs': '.60rem',
            'sm': '.75rem',
            'md': '0.875rem',
            'lg': '1',
            'base': '1',
            'xl': '1.125rem',
        },
        fontFamily: {
            sans: ["Roboto"],
            mono: ["Roboto Mono"]
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
