import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBar({changePageNumber, navigationPage}) {

    const navigate = useNavigate();
  
    const pageNumber = (event, value) => {
      navigate("/"+navigationPage+"/p"+value);
      changePageNumber(value);
    }
  
    return (
      <Stack spacing={2}>
        <Pagination style={{marginTop: "1rem"}} count={10} shape="rounded" onChange={pageNumber}/>
      </Stack>
    );
  }