const style = (theme) => ({

    searchfield: {
        '& label.Mui-focused': {
            color: theme.color.primary1,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.color.primary1,
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: theme.color.primary3,
        },


    },
    searchcontainer: {
        paddingRight: 40,
        marginRight: 40,

    },
    filtercontainer: {
        // backgroundColor: 'whitesmoke',
        padding: 25,
        marginLeft: 10,
        font: theme.font
        // display: 'flex',
        // alignContent: 'center',
        // justifyContent: 'center'
    },
    category: {
        marginBottom: 20,
        marginTop: 20,

    },

    filterlabel: {
        fontWeight: 600,
        color: theme.color.primary3

    },

    filterbtn: {
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",

        color: theme.color.primary3,

        '&:hover':{

            color: 'black'
        },

    },
    setbtn: {

        color: 'black',

        textTransform: 'none',
        fontWeight: 600,

        '&:hover':{
            backgroundColor: 'transparent',
            fontWeight: 600
        },

    },
    radio: {
        marginLeft: 2
    }
})
export default style;
