import { CollapsiblePlateProps } from '@/app/interfaces/collapsible-plate';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { PropsWithChildren, useState } from 'react';

export default function CollapsiblePlate(
  { Icon, title, children }: PropsWithChildren<CollapsiblePlateProps>,
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton onClick={() => setIsOpen((state: boolean) => !state)}>
        {!!Icon
          && <ListItemIcon>
            {Icon}
          </ListItemIcon>
        }
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto">
        {children}
      </Collapse>
    </>
  );
}
