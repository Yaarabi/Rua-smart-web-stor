"use client";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

const Loader = () => (
    <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(4px)', 
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
        }}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
                <CircularProgress color="primary" size={50} thickness={4} />
            </motion.div>
        </motion.div>
    </Box>
);

export default Loader;
