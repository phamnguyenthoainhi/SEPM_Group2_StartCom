const style = (theme) => ({
    formContainer: {
        textAlign: 'center',
        margin: "70px",
        marginLeft: "100px",
        marginRight: "100px"
    },
    title: {
        fontSize: "25px",
        color: theme.color.primary3,
        
    },
    button: {
        marginTop: "40px",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: theme.color.primary3,
        color: "white",
        '&:hover':{
            backgroundColor: theme.color.contrast
        }
    

    },
    input: {
        marginBottom: "30px",
        fontSize: '20px',
        '& label.Mui-focused': {
            color: theme.color.primary1,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: theme.color.primary1,
          }
    
    },
    content: {
        marginTop: '30px'
    },

    checkbox: {
        margin: '10px'
    },
    image: {
        height: 450,
        margin: '20px'
    },
    text: {
        color: theme.color.contrast,
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '16px'   
    },
    card: {
        maxWidth: 600
    }

})
export default style;