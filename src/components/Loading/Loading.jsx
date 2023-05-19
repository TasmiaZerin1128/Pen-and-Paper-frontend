import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';
import Box from "@mui/material/Box";

function Loading() {
    return (
        <Box
          sx={{
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
    )
}

function LoadingWithBackdrop() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#00000056' }}>
      <Backdrop data-testid="backdrop"
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress data-testid="circular-progress" color="inherit" />
      </Backdrop>
      
    </Box>
  );
}

export { Loading, LoadingWithBackdrop };