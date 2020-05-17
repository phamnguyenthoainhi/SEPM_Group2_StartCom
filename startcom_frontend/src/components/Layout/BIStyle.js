const style = (theme) => ({

    searchField: {
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
    input: {
        fontFamily: theme.font2,
        weight: 400
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

    filterBtn: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.primary2,
        backgroundColor: theme.color.secondary,
        textTransform: 'none',
        margin: 5,
        '&:hover':{
            backgroundColor: theme.color.secondary,
        },

    },
    setBtn: {
        fontFamily: theme.font2,
        fontWeight: 700,
        backgroundColor: '#C75D5D',
        textTransform: 'none',
        margin: 5,
        '&:hover':{
            backgroundColor: '#C75D5D',
        },

    },
    radio: {
        marginLeft: 2
    }
})
export default style;
