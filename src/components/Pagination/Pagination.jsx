import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBar({changePage, pageSize, pageNumber, blogCount}) {

    const navigate = useNavigate();

    let totalPages = 10;

    if(blogCount) {
      totalPages = Math.ceil(blogCount/pageSize);
      console.log("Total pages: " + totalPages + " " + blogCount + " " + pageSize);
    }
  
    const onChangePage = (event, value) => {
      navigate(`.?pagenumber=${value}&pagesize=${pageSize}`);
      changePage(value);
    }
  
    return (
      <Stack spacing={2}>
        <Pagination style={{marginTop: "1rem"}} count={totalPages} page={parseInt(pageNumber) || 1} shape="rounded" onChange={onChangePage}/>
      </Stack>
    );
  }