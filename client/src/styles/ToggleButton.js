import { Height } from "@mui/icons-material";
import { ToggleButtonGroup, styled } from "@mui/material";

// get the base style form MUI
const MyToggleButtonGroup = styled(ToggleButtonGroup)(()=>({

}))

export const ToggleButtonGroupCustom = styled(MyToggleButtonGroup)(()=>({
    height: '1rem',
    borderRadius:'0',
    fontWeight:"bolder"
}))

export default MyToggleButtonGroup