import { Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import styles from './Topbar.module.css';

const Topbar = () => (
  <AppBar position="static" className={styles.container}>
    <Toolbar className={styles.toolbar}>
      <Typography variant="h6">
        Rick and Morty
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Topbar;
