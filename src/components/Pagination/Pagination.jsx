import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBar({changePageNumber, navigationPage}) {

    const navigate = useNavigate();
  
    const pageNumber = (e) => {
      navigate("/"+navigationPage+"/p"+e.target.textContent);
      changePageNumber(e.target.textContent);
    }
  
    return (
      <Stack spacing={2}>
        <Pagination style={{marginTop: "1rem"}} count={10} shape="rounded" onChange={(e) => pageNumber(e)}/>
      </Stack>
    );
  }