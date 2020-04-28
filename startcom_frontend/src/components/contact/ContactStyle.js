const style = (theme) => ({
    root: {
        minWidth: 300,
        backgroundColor: 'white'
      },
    rootcontact: {
        minWidth: 290,
        minHeight: 625,
        height: '100vh',
        backgroundColor: 'whitesmoke',
    },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    grid: {
        [theme.breakpoints.down('md')]: {
            maxWidth: "50%",
          },
          [theme.breakpoints.down('sm')]: {
            
            maxWidth: "100%"
          },
    },
    messagearea: {
        textAlign: 'center',
        paddingTop: 10
    },
    right: {
       
        // padding: 30
    },
    closesection: {
        position: 'relative',
       
    },
    closebtn: {
        position: 'absolute',
        top: -10,
        right: -10,
        color: "black",
        "&:hover": {
            backgroudColor: 'white'
        }
    },
    sender: {
        paddingTop: 15
    },
    input: {
        '& .MuiInput-underline:after': {
            borderBottomColor: "#e0e0e0",
            
          },
          '& .MuiInput-underline:hover': {
            borderBottomColor: theme.color.primary3,
          },
          '& .MuiInput-underline': {
            borderBottomColor: theme.color.primary1,
          },
    },
    subject: {
        paddingTop: 20,
        fontSize: 14
    },
    action :{
        textAlign: 'center'
    },
    send: {
        
        fontFamily: theme.font,
        backgroundColor: theme.color.primary3,
        opacity: 0.8,
        color: theme.color.primary1,
        
        
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
            
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: theme.color.primary3,
            opacity: 1,
            color: theme.color.primary1,
        
            borderWidth:  "1.2px",
            borderColor: theme.color.primary3,
            },
            "&:focus": {
                outline: "none"
            }
    }
    

})
export default style;