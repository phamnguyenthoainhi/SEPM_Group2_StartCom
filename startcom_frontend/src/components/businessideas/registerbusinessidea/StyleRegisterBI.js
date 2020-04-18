const styles = (theme) => ({
    formContainer: {
        textAlign: 'center',
        margin: "70px",
        marginLeft: "100px",
        marginRight: "100px"
    },
    form: {
        marginTop: '170px'
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
        color: theme.color.primary1,
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
          },
          '& .MuiInput-underline:hover': {
            borderBottomColor: theme.color.primary3,
          }

    
    },
    content: {
        marginTop: '30px'
    },

    checkbox: {
        marginTop:'5px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px'
    },
    image: {
        height: 300,
        width: 300,
        marginLeft: 40,
        marginRight: 40,
        margin: 10

    },
    text: {
        color: theme.color.contrast,
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '16px'   
    },
    card: {
        maxWidth: 600
    },
    
    buttonfile: {
        color: theme.color.primary3,
        float: 'left',
        '&:hover':{
            backgroundColor: theme.color.primary2,
            color: theme.color.primary1,
            
        }
    },
    chosenfile: {
        float: 'left',
        color: theme.color.primary3,
        fontSize: '14px'
    }

});
export default styles;
