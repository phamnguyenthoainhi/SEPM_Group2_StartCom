const style = (theme) => ({

    title: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 26
        },
    },
    form: {
        [theme.breakpoints.down('sm', 'md')]: {
            padding: 0
        },
    },

    input: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
  root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      fontFamily: theme.font,
    },
    textField: {
        margin: "5px 10px ",
        width: "80%",
        outline: "none",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.primary1
        }
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
  successBtn: {
      outline: "none",
      fontFamily: theme.font,
      
      color: theme.color.primary2,
      fontSize: 13,
      padding: "10px 30px",

      textTransform: "uppercase",
      margin: "10px 0",
      backgroundColor: theme.color.contrast,
      "&:focus": {
          outline: "none"
      },
      "&:hover":{
        backgroundColor: theme.color.contrast,
      }
  },
  registerBtn: {
      fontSize: 16,
      padding: '10px 30px',
      backgroundColor: theme.color.primary3,
      color: theme.color.primary1,
      fontFamily: "'Raleway', sans-serif;",
      transition: "all 350ms ease-in-out",
      marginTop: '30px',
      '&:hover':{
          backgroundColor: theme.color.primary3,
          color: theme.color.primary2
      },
  },

  formControlLabel: {
    color: theme.color.primary3,
    fontFamily: theme.font2,
    fontWeight: 400,
      [theme.breakpoints.down('md')]: {
          fontSize: 14
      },
      [theme.breakpoints.down('sm')]: {
          fontSize: 12
      },
  }


})
export default style;
