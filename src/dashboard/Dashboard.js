import { useContext, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import UserContext from "../auth/UserContext";
import InviteList from "./InviteList";
import BuddyReadApi from "../api/api";
import BuddyReadList from "./BuddyReadList";
import LoadingSpinner from "../common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>  {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [pendingBuddyReads, setPendingBuddyReads] = useState([]);
    const [buddyReadInvites, setBuddyReadInvites] = useState([]);
    const [currentBuddyReads, setCurrentBuddyReads] = useState([]);
    const [completedBuddyReads, setCompletedBuddyReads] = useState([]);
    const [infoLoaded, setInfoLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {    
        async function getBuddyReadData() {
        try {
            const buddyReads = await BuddyReadApi.getBuddyReads(currentUser.id);
            const invites = await BuddyReadApi.getInvites(currentUser.id);
            setPendingBuddyReads(buddyReads.filter(br => br.status === 'pending'));
            setCurrentBuddyReads([  ...buddyReads.filter(br => br.status === 'in-progress'), 
                                    ...invites.filter(br => br.status === 'in-progress')]);
            setCompletedBuddyReads([...buddyReads.filter(br => br.status === 'completed'), 
                                    ...invites.filter(br => br.status === 'completed')]);
            setBuddyReadInvites(invites.filter(br => br.status === 'pending'));

            
        } catch (err) {
            console.error("Error loading books", err);
        }
            setInfoLoaded(true)
        }

        setInfoLoaded(false)
        getBuddyReadData();
    }, []);

    const updateStatus = async (id, status) => {
        await BuddyReadApi.changeStatus(id, {status});
        if (status === 'rejected') {
            setBuddyReadInvites(buddyReadInvites.filter(invite => invite.id !== id));
        } 
        if (status === 'in-progress') {
            setBuddyReadInvites(buddyReadInvites.filter(invite => invite.id !== id));
            setCurrentBuddyReads(books => ([...books, buddyReadInvites.filter(invite => invite.id === id)[0]]));
        } 
    }

    const handleClick = () => {
        navigate('/buddyreads/new')
    }

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box sx={{ width: '100%' }} align='center'>
            <h2>{currentUser.firstName}'s Dashboard</h2>
            <Button variant="contained" onClick={handleClick}>Start a new Buddy Read</Button>

            <InviteList pendingBuddyReads={pendingBuddyReads} 
                        buddyReadInvites={buddyReadInvites}
                        updateStatus={updateStatus}
            /> 

            <BuddyReadList 
                buddyReadList={currentBuddyReads} 
                setCompletedBuddyReads={setCompletedBuddyReads}
                setCurrentBuddyReads={setCurrentBuddyReads}
                type="Current"
            />
            <BuddyReadList buddyReadList={completedBuddyReads} type="Completed"/>
        </Box>
            
        
    )
}

export default Dashboard;