import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiTask, BiChevronLeft } from 'react-icons/bi';
import SpeedIcon from '@mui/icons-material/Speed';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
    useLocation,
} from 'react-router-dom';

import styles from './AppBar.module.css';

import ColorModeToggle from '../ColorModeToggle/ColorModeToggle';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function MiniDrawer(props) {
    const { theme, setTheme, loggedIn, setLoggedIn, open, setOpen, setTasks, setTasksStats, setGoals, children } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const [disableSidebar, setDisableSidebar] = React.useState(false);
    const disabledPaths = ['/login', '/register'];

    React.useEffect(()=>{
        if (disabledPaths.includes(location.pathname)) {
            setDisableSidebar(true);
        }
    }, [location]);

    const handleLogout = () => {
        if (disabledPaths.includes(location.pathname)) {
            return;
        }
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setLoggedIn({ loggedIn: false, user: '', token: "" })
        navigate('/login')
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (typeof loggedIn.user === 'object' && loggedIn.loggedIn === 'true') {
        return <>
            <div className="loading">
                Loading...
            </div>
        </>
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <AiOutlineMenu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className={styles.logo} sx={{ flexGrow: 1 }}>
                        <div className={styles.logoContainer}>
                            <BiTask className={styles.logoIcon} />
                            <span className={styles.logoText}>Retask</span>
                        </div>
                    </Typography>
                    <div className={styles.topbarRight}>
                        <div className={styles.searchBar}>
                            <Search className={`${styles.rightIcon}`}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </div>
                        <ColorModeToggle theme={theme} setTheme={setTheme} className={styles.rightIcon} />
                        <SettingsIcon className={styles.rightIcon} />
                        <NotificationsIcon className={styles.rightIcon} />
                        {!loggedIn.loggedIn ? <Link to="/login" style={{ textDecoration: "none", color: "inherit " }}>
                            <Button color="inherit" className={styles.rightIcon}>Login</Button>
                        </Link> :
                            <Button color="inherit" className={styles.rightIcon}>{loggedIn.user}</Button>}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <BiChevronLeft />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link to={disableSidebar ? "#" : "/home"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <SpeedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <Link to={disableSidebar ? "#" : "/upcoming"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Upcoming'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <Link to={disableSidebar ? "#" : "/calendar"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Calendar'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to={disableSidebar ? "#" : "/friends"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Friends'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <Link to={disableSidebar ? "#" : "/chat"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Chat'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <Link to={disableSidebar ? "#": "/collaborations"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <GroupWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Collaborations'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>

                </List>
                <Divider />
                <List>
                    <Link to={disableSidebar ? "#" : "/profile"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Account'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <Link to={disableSidebar ? "#" : "/settings"} style={{ textDecoration: 'none', color: 'inherit' }} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Settings'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                    <div onClick={handleLogout} className={disableSidebar ? styles.disabledLink : styles.link}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </div>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1,
                     p: 3, 
                     width: { sm: `calc(100% - ${drawerWidth}px)` },
                     marginTop: '40px'
                }}
            >
                {children}
            </Box>
        </Box >
    );
}