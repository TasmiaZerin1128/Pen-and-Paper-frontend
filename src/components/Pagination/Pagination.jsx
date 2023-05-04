import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBar({changePage, pageSize, pageNumber}) {

    const navigate = useNavigate();
  
    const onChangePage = (event, value) => {
      // navigate("/"+navigationPage+"/p"+value);
      navigate(`.?pagenumber=${value}&pagesize=${pageSize}`);
      changePage(value);
    }
  
    return (
      <Stack spacing={2}>
        <Pagination style={{marginTop: "1rem"}} count={10} page={parseInt(pageNumber) || 1} shape="rounded" onChange={onChangePage}/>
      </Stack>
    );
  }