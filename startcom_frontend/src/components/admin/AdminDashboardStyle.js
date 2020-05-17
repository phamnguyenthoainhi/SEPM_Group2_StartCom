const style = (theme) => ({
    skeletoncontainer: {
        paddingLeft: 30,
        paddingRight: 30
    },
    skeleton: {
        height: 90,
        paddingBottom: 10,
        
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'black',
    },
    verifyBtn: {
        backgroundColor: theme.color.secondary,
        color: 'black',
        "&:hover" : {
            backgroundColor:  theme.color.secondary,
            color: theme.color.primary2
        },
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 13,
        fontFamily: theme.font,
        [theme.breakpoints.down('md','sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 12,
        },
        
    },
    deleteBtn: {
        backgroundColor: theme.color.contrast,
        color: theme.color.primary2,
        "&:hover" : {
            backgroundColor:  theme.color.contrast,
            color: theme.color.primary3
        },
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 13,
        fontFamily: theme.font,
        marginLeft: 50,
        [theme.breakpoints.down('md','sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
            fontSize: 12,
            marginLeft: 0,
        },
    },
    container: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 30,
        [theme.breakpoints.down('md','sm')]: {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
        },
    },
    title: {
        textAlign: "center",
        marginBottom: 50,
        marginTop: 50,
        fontFamily: theme.font,
        fontSize: 25,
        [theme.breakpoints.down('md','sm')]: {
            fontSize: 20,
        },
    },
    cell: {
        fontFamily: theme.font
    }
})
export default style;
