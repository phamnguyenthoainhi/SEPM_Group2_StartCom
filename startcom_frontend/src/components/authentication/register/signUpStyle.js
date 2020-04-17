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
      backgroundColor: "#eee",
      border: "none",
      padding: "12px 15px",
      margin: "5px 0 ",
      outline: "none",
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
      borderRadius: 20,
      border: "1px solid #DDDDDD",
      backgroundColor: "white",
      padding: "10px 30px",
      // letterSpacing: 1,
      textTransform: "uppercase",
      transition: "all 350mx ease-in-out",
      margin: "10px 0",
      "&:hover": {
          transition: "all 350ms ease-in-out",
          backgroundColor: "black",
          color: "white",
          border: "1px solid black",
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