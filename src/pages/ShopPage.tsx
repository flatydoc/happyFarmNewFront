import { Box, Typography } from '@mui/material';
import { TabInfo } from '../components/TabInfo/TabInfo';
import { TabBar } from '../components/TabBar/TabBar';
import { useContext, useState } from 'react';
import { ShopList } from '../components/ShopList/ShopList';
import {
  REWARD_COEFFICIENT,
  bgImgByLevel,
  costToLevelUp,
} from '../core/configs/constants';
import { useOutletContext } from 'react-router-dom';
import { IStateContextType } from '../core/types';
import coin from '../assets/images/coin.png';
import { formatNumber } from '../core/utils/formatNumber';
import { AuthContext } from '../core/context/AuthContext';
import { getGoods } from '../core/services/shop.service';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

export const ShopPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<number>(1);
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user } = authContext;

  const telegramId = user?.telegramId;

  const handleChangeTab = (tab: number) => {
    setActiveSubTab(1);
    setActiveTab(tab);
  };
  const { t } = useTranslation();

  const {
    displayBalance,
    setDisplayBalance,
    level,
    profitPerHour,
    setProfitPerHour,
    turbo,
    turboTap,
  } = useOutletContext<IStateContextType>();

  const {
    data: goods,
    isLoading,
    error,
  } = useSWR(['goods', telegramId], () => getGoods(telegramId!));
  const goodsData = goods?.data;

  const rewardPerClick = level * REWARD_COEFFICIENT;

  const amountToUpgrade = costToLevelUp[level + 1] - displayBalance;
  const tabs = [
    { id: 1, name: `${t('shop.tabs.management')}` },
    { id: 2, name: `${t('shop.tabs.production')}` },
    { id: 3, name: `${t('shop.tabs.tourism')}` },
    { id: 4, name: `${t('shop.tabs.unique')}` },
  ];
  return (
    <Box
      sx={{
        height: '100%',
        background: `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.3) 20%, rgba(255,255,255,0) 50%, rgba(50,50,50,0.3) 80%, rgba(0,0,0,0.8) 100%), url(${bgImgByLevel[level]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        display: 'flex',
        position: 'relative',
        gap: '16px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '16px',
        }}
      >
        <TabInfo
          turbo={turbo}
          turboTap={turboTap}
          rewardPerClick={rewardPerClick}
          profitPerHour={profitPerHour}
          level={level}
          amountToUpgrade={amountToUpgrade}
        />
        <TabBar
          fontSize={10}
          top={16}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleChangeTab}
        />
        <ShopList
          displayBalance={displayBalance}
          setProfitPerHour={setProfitPerHour}
          activeTab={activeTab}
          setDisplayBalance={setDisplayBalance}
          goods={goodsData}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          isLoading={isLoading}
          error={error}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(101, 101, 101, 0.25)',
          backdropFilter: 'blur(10px)',
          position: 'fixed',
          zIndex: '10',
          bottom: '70px',
          left: '0',
          width: '100%',
          minHeight: '48px',
          height: '48px',
          padding: '0 16px',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '400',
              fontFamily: 'SuisseIntl',
            }}
          >
            {t('shop.my balance')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <img src={coin} width={16} height={16} />
            <Typography
              sx={{
                fontFamily: 'Benzin',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              {formatNumber(displayBalance)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
