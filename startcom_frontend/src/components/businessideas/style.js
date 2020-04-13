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
        color: theme.color.primary3,
        '&$checked': {
            color: theme.color.contrast
        },
        root: {
            color: "white",
            '&$checked': {
              color: 'white',
            },
        },
        checkedColor: "black"
    }
    

})
export default style;