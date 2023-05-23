import { ToggleButtonGroup, createTheme } from "@mui/material";

const Colors = {
    primary : "#4AADFF",
    secondary : "#3176af"
}

const theme = createTheme({
    palette:{
        primary:{
            main : Colors.primary
        },
        secondary:{
            main : Colors.secondary
        }
    },
    // example how to manage global componant styling props in all the app
    components:{
        // example for button : check the doc "component API : https://mui.com/material-ui/api/button/"
        MuiButton:{
            defaultProps:{
                // disableRipple : true
            }
        },
        ToggleButtonGroup:{
            defaultProps:{
                
            }
        }
    },
    typography:{
        fontFamily:[
            'Quantico'
        ]
    }
})

export default theme