
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, position: 'absolute', top: '44%', left: '56%', }}>
        <CircularProgress color="primary" />
    </Box>
);

export default Loader;
