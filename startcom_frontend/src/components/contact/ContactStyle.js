const style = (theme) => ({
    root: {
        minWidth: 275,
        width: 300,
        minHeight: 625,
        height: 650,
        backgroundColor: 'whitesmoke'
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
            backgroundColor: 'red',
          },
          [theme.breakpoints.down('sm')]: {
            backgroundColor: 'yellow',
            maxWidth: "50%"
          },
    },
    messagearea: {
        textAlign: 'center',
        paddingTop: 10
    },
    right: {
        padding: 30
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
        paddingTop: 30
    },
    action :{
        textAlign: 'center'
    },
    send: {
        color: theme.color.primary1,
            fontFamily: theme.font,
            outline: "none",
        
          backgroundColor: theme.color.primary3,
                
                border: "1px",
                borderColor: theme.color.primary3,
        
            padding: "10px 30px",
            letterSpacing: 1,
            textTransform: "uppercase",
            transition: "all 350mx ease-in-out",
            
            "&:hover": {
                transition: "all 350ms ease-in-out",
                backgroundColor: theme.color.primary3,
                color: 'white',
                border: "1px",
                borderColor: theme.color.primary3,
                outline: "none"
            },
            "&:focus": {
                outline: "none"
            }
    }
    

})
export default style;