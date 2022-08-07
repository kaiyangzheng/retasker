import React from 'react'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import styles from './ColorModeToggle.module.css';

export default function ColorModeToggle(props) {
    const { theme, setTheme } = props;
    return (
        <IconButton onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
            localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
        }} className={styles.icon}>
            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
    )
}
