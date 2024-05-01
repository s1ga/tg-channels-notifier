import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { Tab as ITab } from '@/app/interfaces/tab';
import { useState } from 'react';

export default function Tabs({ tabList }: { tabList: ITab[] }) {
  const [active, setActive] = useState<ITab['id']>(tabList[0].id);

  const handleActive = (_: unknown, newActive: ITab['id']) => {
    setActive(newActive);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={active} onChange={handleActive}>
          {tabList.map((t: ITab) => (
            <MuiTab key={`tab-${t.id}`} label={t.name} id={`tab-${t.id}`} />
          ))}
        </MuiTabs>
      </Box>

      {tabList.map((t: ITab) => (
        <div
          key={`tabpanel-${t.id}`}
          id={`tabpanel-${t.id}`}
          role="tabpanel"
          hidden={active !== t.id}
        >
          {t.content}
        </div>
      ))}
    </Box>
  );
}
