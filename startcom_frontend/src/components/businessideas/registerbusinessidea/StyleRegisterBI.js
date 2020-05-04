const styles = (theme) => ({
    formContainer: {
        textAlign: 'center',
        padding: 50
    },
    title: {
        fontSize: "25px",
        color: theme.color.primary3,
        
    },
    button: {
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        '&:hover':{
            backgroundColor: theme.color.contrast
        },
        clear: 'left',
        // display: 'table'
        
    
    },
    input: {
        marginBottom: "15px",
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
        
        marginRight: '10px',
        marginBottom: '10px',
        
        color: theme.color.primary3
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
    
    buttonFile: {
        color: theme.color.primary3,
        
        '&:hover':{
            backgroundColor: theme.color.primary2,
            color: theme.color.primary1,
            
        }
    },
    chosenFile: {
        float: 'left',
        color: theme.color.contrast,
        fontSize: '14px',
        marginTop: '7px'
        
    },
    formcontrollabel: {
        color: theme.color.primary3,
        fontFamily: theme.font,
        
    },
    terms: {
        color: theme.color.contrast,
        fontSize: '14px',
        fontFamily: theme.font,
        
    },
    floatitem: {
        float: 'left',
        display: 'block',
        clear:'center'
    },
    leftcolumn: {
        
        
        paddingTop: 12
    },
    rightcolumn: {
       
    },
    radiogroup: {
        float: 'left'
    }

});
export default styles;
