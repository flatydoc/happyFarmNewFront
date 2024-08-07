import { Outlet } from 'react-router';
import { Box } from '@mui/material';

import { Navigation } from '../components/Navigation/Navigation';
import { useContext, useEffect, useState } from 'react';
import { IStateContextType } from '../core/types';
import { AuthContext } from '../core/context/AuthContext';

export const Layout = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext!;

  const [displayBalance, setDisplayBalance] = useState(user?.balance || 0);
  const [displayEnergy, setDisplayEnergy] = useState(user?.energy || 0);
  const [level, setLevel] = useState(user?.level || 1);
  const [profitPerHour, setProfitPerHour] = useState(user?.profit || 0);
  const goods = user?.goods;
  const boosts = user?.boosts;
  const tasks = user?.tasks;
  const [turbo, setTurbo] = useState<boolean>(false);
  const [turboTap, setTurboTap] = useState(1);
  const [passiveIncome, setPassiveIncome] = useState(user?.passiveIncome || 0);
  const [isShowPassiveRewardPopup, setIsShowPassiveRewardPopup] =
    useState(false);

  useEffect(() => {
    if (passiveIncome && passiveIncome > 1) {
      setIsShowPassiveRewardPopup(true);
    }
  }, [passiveIncome]);

  const handleTurboMode = () => {
    setTurbo(true);
  };

  useEffect(() => {
    if (turbo) {
      const timer = setTimeout(() => {
        setTurbo(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [turbo]);

  return (
    <Box>
      <Box
        component={'main'}
        sx={{
          position: 'relative',
          height: `calc(100vh - 70px)`,
        }}
      >
        <Outlet
          context={
            {
              displayBalance,
              setDisplayBalance,
              displayEnergy,
              setDisplayEnergy,
              level,
              setLevel,
              profitPerHour,
              setProfitPerHour,
              goods,
              boosts,
              tasks,
              turbo,
              handleTurboMode,
              turboTap,
              setTurboTap,
              passiveIncome,
              setPassiveIncome,
              isShowPassiveRewardPopup,
              setIsShowPassiveRewardPopup,
            } satisfies IStateContextType
          }
        />
      </Box>
      <Box component={'footer'}>
        <Navigation />
      </Box>
    </Box>
  );
};
