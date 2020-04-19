const style = (theme) => ({
    root: {
        flexGrow: 1,
        fontFamily: theme.font
        
    },
    rightColumn: {
      objectFit: 'cover'
    },
    leftColumn: {
        backgroundColor: theme.color.primary2,
        textAlign: 'center',   
        padding: 100,
        [theme.breakpoints.down('md','sm')]: {
            padding: 50
        },
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
    welcomeTitle: {
        color: theme.color.primary3,
        fontSize: 50,
        paddingBottom: 20,
    },
    media: {
        height: 400,
        margin: 50,
        marginLeft: 100,
        [theme.breakpoints.down('md')]: {
            margin: 30
        },
    },
    row: {
        backgroundColor: theme.color.primary3,
        padding: '40px',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },

    },
    rowTitle: {
        color: theme.color.primary1,
        fontSize: '40px',
        marginBottom: '20px',
        [theme.breakpoints.down('sm','xs')]: {
            fontSize: 30
        },
    },
    rowSubTitle: {
        fontSize: 17,
        [theme.breakpoints.down('sm','xs')]: {
            fontSize: 16
        },
    },

    below: {
        backgroundColor: theme.color.primary2,
        textAlign: 'center',
        alignItems: 'center',
        padding: 100,
        [theme.breakpoints.down('sm','xs')]: {
            padding: 50
        },
    },
    belowTitle: {
        [theme.breakpoints.down('sm','xs')]: {
            paddingBottom: 10
        },
    },

    avatar: {
        height: 170,
        width: 170,
        [theme.breakpoints.down('sm','xs')]: {
            height: 150,
            width: 150,
        },
    },
    avatarBox: {
        paddingLeft: '45%'
    }
});
export default style;
