const style = (theme) => ({
    skeletoncontainer: {
        paddingLeft: 30,
        paddingRight: 30
    },
    skeleton: {
        height: 90,
        paddingBottom: 10,
        
    },
    verifyBtn: {
        backgroundColor: theme.color.secondary,
        color: theme.color.primary3,
        "&:hover" : {
            backgroundColor:  theme.color.secondary,
            color: theme.color.primary2
        },
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 13,
        fontFamily: theme.font
        
    },
    container: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 30,
    },
    title: {
        textAlign: "center",
        marginBottom: 50,
        marginTop: 50,
        fontFamily: theme.font,
        fontSize: 25
    },
    cell: {
        fontFamily: theme.font
    }
})
export default style;
