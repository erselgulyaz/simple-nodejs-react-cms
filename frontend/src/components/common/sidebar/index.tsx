import React, { FC } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ListItemButton } from '@mui/material';

import styles from './styles.module.css';

const Sidebar: FC = () => {
  return (
    <Drawer
      variant="permanent"
      className={styles.wrapper}
    >
      <div className={styles.logoWrap}>
        CMS
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/users/">
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/customers">
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
