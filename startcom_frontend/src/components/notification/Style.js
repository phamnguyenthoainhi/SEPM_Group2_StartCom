const style = (theme) => ({
    container: {
        height: '100vh',
        maxWidth: "30%",
        [theme.breakpoints.down('sm')]: {
            maxWidth: "50%",
        },
        // [theme.breakpoints.down('md')]: {
        //     maxWidth: "40%",
        // },
        [theme.breakpoints.between('md','lg')]: {
            maxWidth: "40%",
        }
        
    },
    label: {
        color: 'red'
    },
    root: {
        display: 'inline-block',
        margin: 20,
        
    },
    middleleft: {
        
        textAlign: 'center'
    },
    middleright: {
        
        textAlign: 'left',
        paddingLeft: 10
    },
    top: {
        textAlign: 'right'
    },
    content: {
        color: '#616161'
    }
})
 export default style;