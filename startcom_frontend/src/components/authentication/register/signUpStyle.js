const style = (theme) => ({
  root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      fontFamily: theme.font,
    },
  textField: {
      border: "none",
  },
  label: {
      color: theme.color.primary3,
      fontFamily: theme.font
  },
  buttonWrapper: {
      outline: "none",
      "&:hover": {
          backgroundColor: "transparent",
      },
      "&:focus": {
          outline: "none",
          border: "none"
      },
  },
  formInput: {
      width: "80%",
      
      border: "none",
      padding: "12px 15px",
      margin: "5px 0 ",
      outline: "none",
      '& label.Mui-focused': {
        color: theme.color.primary1,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.color.primary1,
      },
      '& .MuiInput-underline:hover:before': {
        borderBottomColor: theme.color.primary3,
      }
      
  },
  successBtn: {
      outline: "none",
      fontFamily: theme.font,
      borderRadius: 20,
      color: "black",
      fontSize: 13,
      padding: "10px 30px",
      // letterSpacing: 1,
      textTransform: "uppercase",
      margin: "10px 0",
      backgroundColor: "rgb(99,151,68)",
      "&:focus": {
          outline: "none"
      }
  },
  registerBtn: {
      
      fontFamily: theme.font,
      outline: "none",
  
    backgroundColor: theme.color.primary3,
          color: theme.color.primary1,
          border: "1px",
          borderColor: theme.color.primary3,
  
      padding: "10px 30px",
      letterSpacing: 1,
      textTransform: "uppercase",
      transition: "all 350mx ease-in-out",
      margin: "20px 0",
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
  },
  input: {
      fontFamily: theme.font,
  },
  formcontrollabel: {
    color: theme.color.primary3,
    fontFamily: theme.font,
  }


})
export default style;