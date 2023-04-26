import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/user";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, ListItem } from "@mui/material";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import '../Users/users.css';

function formatTimestamp(timestamp, createOrUpdate) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const formatted = new Date(timestamp).toLocaleString("en-US", options);

   if (createOrUpdate === 'create') {
  return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      <b>Created:</b> {formatted}
    </Typography>
  );
   }
   return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      <b>Last Updated:</b> {formatted}
    </Typography>
  );
}

export default function SearchedUser ({searchedUser}) {

    const [user, setUser] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        console.log("Search message in searchedUser: ", searchedUser);
        setUser(searchedUser);
        async function fetchUser() {
            const response = await getUserByUsername(searchedUser);
            setUserDetails(response.data);
            console.log(response);
        }
        fetchUser();
      }, [searchedUser]);


    return (
        <>
        <h1>{user.toString()}</h1>
        {/* {userDetails.map((item) => (
        <Card className="userCards" key={item.id}>
          <CardContent>
          <Grid container rowSpacing={0}>
          <Grid item xs={8}>
                <ListItem style={{ height: '40px' }}>
                <Typography
              variant="h6"
              component="div"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#863812",
              }}
            >
                {item.fullName}
            </Typography>
            </ListItem>
            <ListItem style={{ height: '40px' }}>
            <Typography
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
              color="text.secondary"
              gutterBottom
            >
              {item.username}
            </Typography>
            </ListItem>
            <ListItem>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EmailRoundedIcon sx={{ color: "#863812", width: 30, marginRight: '10px' }} /> <span>{item.email}</span>
            </div>
            </ListItem>
            </Grid>
            <Grid item xs={4}>
                <ListItem style={{ height: '50px' }}>{formatTimestamp(item.updatedAt, 'update')}</ListItem>
                <ListItem style={{ height: '50px' }}>{formatTimestamp(item.createdAt, 'create')}</ListItem>
            </Grid>
          </Grid>
          </CardContent>
        </Card>
        ))} */}
        </>
    )
}