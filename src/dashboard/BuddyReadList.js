import { Grid, Typography, Button, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";


const BuddyReadList = ({buddyReadList, type}) => {
    const {currentUser} = useContext(UserContext)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const findBuddy = (br) => {
        if (br.createdBy.id === currentUser.id) return br.buddy
        else return br.createdBy
    }

    return (
        <Grid align='center' sx={{m: 2}}>
            <Typography variant="h5" component='div' sx={{mb: 1}}>{type} Buddy Reads</Typography>
            <Item sx={{ width: '75%' }}>
            <Stack spacing={1} >
                {buddyReadList.length === 0 ?
                        <Typography sx={{fontWeight: 'light', textTransform: 'uppercase'}} variant='body2'>
                            You have no {type} buddy reads.
                        </Typography> : 
                buddyReadList.map(br => (<Button key={br.id}>
                        <Link to={`/buddyreads/${br.id}`} style={{textDecoration: 'none', color: 'black' }}>                    
                            {br.bookTitle} with {findBuddy(br).firstName}
                        </Link>
                </Button>))}
            </Stack>
            </Item>
        </Grid>

    // <Grid align='center' sx={{m: 2}}>
    // <Typography variant="h5" component='div' sx={{mb: 1}}>{type} Buddy Reads</Typography>
    //     <Stack spacing={1} sx={{ width: '75%' }}>
    // {buddyReadList.map(br => (<Item component="button" key={br.id}>
    //         <Link to={`/buddyreads/${br.id}`} style={{textDecoration: 'none', color: 'black' }}>                    
    //             Buddy Read: {br.bookTitle} with {findBuddy(br).firstName}
    //         </Link>
    // </Item>))}
    // </Stack>
    // </Grid> 


        //     {currentBooks.map(br => (
        //         <Typography variant="h6" component='div' key={br.id}>
        //             <Link to={`/buddyreads/${br.id}`} >
        //                 Buddy Read: {br.bookData.title} with {br['buddy'].firstName}
        //             </Link>
        //         </Typography>
        //     ))}
        //     <Stack>
        //     {currentBooks.map(br => (
        //         <Item key={br.id}>
        //             <Link to={`/buddyreads/${br.id}`} >
        //                 Buddy Read: {br.bookData.title} with {br['buddy'].firstName}
        //             </Link>
        //         </Item>
        //     ))}
        //     </Stack>

        //     {currentBooks.map(br => (
        //         <Button key={br.id}>
        //             <Link to={`/buddyreads/${br.id}`} >
        //                 Buddy Read: {br.bookData.title} with {br['buddy'].firstName}
        //             </Link>
        //         </Button>
        //     ))}
        //     <Button>
        //         <Link to="/login">
        //             Login
        //         </Link>
        //     </Button>
        // </Grid>
    )
}

export default BuddyReadList;