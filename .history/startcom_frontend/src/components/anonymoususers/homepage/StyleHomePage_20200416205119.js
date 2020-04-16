const style = (theme) => ({
    root: {
        flexGrow: 1,
        fontFamily: theme.font
        
    },
    grid: {
        paddingTop: 100
    },
    leftcolumn: {
        backgroundColor: theme.color.primary2,
        textAlign: 'center',   
        padding: '100px'    
     
    },
    joinButton: {
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        marginTop: '30px',
        '&:hover':{
            backgroundColor: theme.color.contrast
        },
        
    },
    welcomtittle: {
        color: theme.color.primary3,
        fontSize: '25px',
        paddingBottom: '20px',
        
    },
    media: {
        height: 400,
        margin: 50,
        marginLeft: 100
    },
    row: {
        backgroundColor: theme.color.primary3,
        padding: '100px',
        paddingLeft: '250px',
        
        
    },
    rowtittle: {
        color: theme.color.primary1,
        fontSize: '35px',
        marginBottom: '20px'
    },
    below: {
        backgroundColor: theme.color.primary2,
        textAlign: 'center',
     
        alignItems:"center",
        padding: 80
          
    }, 
    avatar: {
        height: 150,
        width: 150,
        marginBottom: 30,
        backgroundColor: theme.color.primary2
    },
    avatarbox: {
        paddingLeft: '45%'
    }


})
export default style;