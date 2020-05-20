const style = (theme) => ({

    containerWrapper: {
        padding: "50px 300px",
        [theme.breakpoints.down('md')]: {
            padding: "50px 200px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "50px 150px",
        },
    },

    container: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.primary3,
        [theme.breakpoints.down('sm')]: {
            fontSize: 22
        },
    },

    dialogText: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.primary3,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
    },


    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },

    ideaContainer: {
        padding: "15px 0"
    },
    input: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.primary1
        }
    },
    buttonFile: {
        border: '1px dashed black',
        transition: "all 350ms ease-in-out",
        color: theme.color.primary3,
        textTransform: 'inherit',
        '&:hover':{
            backgroundColor: theme.color.primary2,
            color: theme.color.primary1,
        }
    },
    label: {
        margin: 0,
        fontSize: 16,
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    btnContainer: {
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    button: {
        fontSize: 15,
        padding: 10,
        margin: "0 15px",
        outline: "none",
        textDecoration: "none",
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        transition: "all 350ms ease-in-out",
        fontWeight: 600,
        "&:hover": {
            color: theme.color.primary2,
            backgroundColor: theme.color.contrast,
        },
    },
    completeBtn: {
        backgroundColor: theme.color.secondary,
        color: theme.color.primary1,
        textTransform: 'inherit',
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
    },

    content: {
        marginTop: '30px'
    },

    checkbox: {
        marginTop:'5px',
        
        marginRight: '10px',
        marginBottom: '10px',
        
        color: theme.color.primary3
    },
    image: {
        height: 300,
        width: 300,
        marginLeft: 40,
        marginRight: 40,
        margin: 10
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});
export default style;
