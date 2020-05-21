const style = (theme) => ({
    input: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    title: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 26
        },
    },
    textField: {
        margin: "5px 10px ",
        width: "80%",
        outline: "none",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.primary1
        }
    },
    form: {
        [theme.breakpoints.down('sm', 'md')]: {
            padding: 0
        },
    },

    buttonWrapper: {
        outline: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    label: {
        color: theme.color.primary3,
        fontFamily: theme.font
    },
    successBtn: {
        outline: "none",
        fontFamily: theme.font,

        color: theme.color.primary3,
        fontSize: 13,
        padding: "10px 30px",
        // letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",

        backgroundColor: 'transparent',
        "&:focus": {
            outline: "none"
        },
        "&:hover":{
          backgroundColor: 'transparent',
        }
    },
    progress: {
        marginTop: "5%"
    },
    icon: {
        color: "white"
    },
    joinButton: {
        fontSize: 16,
        padding: '10px 30px',
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        transition: "all 350ms ease-in-out",
        marginTop: '30px',
        '&:hover':{
            backgroundColor: theme.color.secondary,
            color: theme.color.primary2
        },
    },

    registerBtn: {
        fontSize: 16,
        padding: '10px 30px',
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        transition: "all 350ms ease-in-out",
        marginTop: '30px',
        '&:hover':{
            backgroundColor: theme.color.primary3,
            color: theme.color.primary2
        },

    },
    customError: {
        color: "red",
    },
    tick: {
        marginTop: "5%"
    },
    passwordBtn: {
        fontFamily: theme.font2,
        fontWeight: 400,
        color : "grey",
        "&:hover": {
            backgroundColor: 'transparent',

        },
    }

});
export default style;
