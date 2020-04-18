const style = (theme) => ({
    form: {
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
            backgroundColor: "#eee",
            border: "none",
            padding: "12px 15px",
            margin: "5px 10px ",
            width: "80%",
            outline: "none",
            "&&&:before": {
                borderBottom: "none"
            },
            "&&:after": {
                borderBottom: "none"
            }
        },
        successBtn: {
            outline: "none",
            fontFamily: "inherit",
            borderRadius: 20,
            color: "black",
            fontSize: 13,
            padding: "10px 30px",
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "10px 0",
            backgroundColor: "rgb(99,151,68)",
            "&:focus": {
                outline: "none"
            }
        },
        progress: {
            marginTop: "5%"
        },
        icon: {
            color: "white"
        },
        registerBtn: {
            fontFamily: "inherit",
            outline: "none",
            borderRadius: 20,
            border: "1px solid #DDDDDD",
            backgroundColor: "white",
            padding: "10px 30px",
            letterSpacing: 1,
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
            fontFamily: "'Quicksand', sans-serif;",
        },
        customError: {
            color: "red",
        },
        tick: {
            marginTop: "5%"
        }
    


})
export default style;