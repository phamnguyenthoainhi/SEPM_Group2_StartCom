const style = (theme) => ({
    formContainer: {
        // textAlign: 'center',
        margin: "70px",
        marginLeft: "100px",
        marginRight: "100px"
    },
    form: {
        marginTop: '170px'
    },
    formControl: {
        // margin: theme.spacing(1),
        width: '100%',
    },
    title: {
        fontSize: "25px",
        color: theme.color.primary3,
        
    },
    button: {
        // marginTop: "200px",
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
            backgroundColor: 'transparent'
          },
          '& .MuiInput-underline:hover': {
            borderBottomColor: theme.color.primary3,
          },


    
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
    
    buttonfile: {
        color: theme.color.primary3,
        
        '&:hover':{
            backgroundColor: theme.color.primary2,
            color: theme.color.primary1,
            
        }
    },
    chosenfile: {
        float: 'left',
        color: theme.color.contrast,
        fontSize: '14px',
        marginTop: '7px'
        
    },
    formcontrollabel: {
        color: theme.color.primary3,
        fontFamily: theme.font,
        
    },
    floatitem: {
        float: 'left',
        display: 'block',
        clear:'center'
    },
    leftcolumn: {
        // backgroundColor: 'red',
        justifyContent: 'center',
        paddingTop: 12
    },
    rightcolumn: {
        // backgroundColor: 'blue'
    },
    radiogroup: {
        float: 'left'
    }


})
export default style;