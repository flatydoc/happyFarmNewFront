import { Box } from '@mui/material';
import { GoodItem } from '../GoodItem/GoodItem';
import { IGood } from '../../core/types';
import { TabBar } from '../TabBar/TabBar';
import { Spinner } from '../ui/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

interface Tab {
  id: number;
  name: string;
}

export const ShopList = ({
  activeTab,
  setProfitPerHour,
  displayBalance,
  setDisplayBalance,
  goods,
  setActiveSubTab,
  activeSubTab,
  isLoading,
  error,
}: {
  activeTab: number;
  setProfitPerHour: React.Dispatch<React.SetStateAction<number>>;
  displayBalance: number;
  setDisplayBalance: React.Dispatch<React.SetStateAction<number>>;
  goods?: IGood[];
  setActiveSubTab: React.Dispatch<React.SetStateAction<number>>;
  activeSubTab: number;
  isLoading: boolean;
  error: Error;
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box sx={{ height: '50vh' }}>
        <Spinner />
      </Box>
    );
  }

  if (error || !goods) {
    return null;
  }
  const filteredGoodsByCategory = goods?.filter(
    (goodsItem) => goodsItem.categoryId === activeTab
  );

  const filteredGoodsBySubCategory = filteredGoodsByCategory?.filter(
    (goodsItem) => goodsItem.subCategoryId === activeSubTab
  );

  const tabsforManagement = [
    { id: 1, name: `${t('shop.sub tabs for 1.1')}` },
    { id: 2, name: `${t('shop.sub tabs for 1.2')}` },
    { id: 3, name: `${t('shop.sub tabs for 1.3')}` },
  ];

  const tabsforProduction = [
    { id: 1, name: `${t('shop.sub tabs for 2.1')}` },
    { id: 2, name: `${t('shop.sub tabs for 2.2')}` },
    { id: 3, name: `${t('shop.sub tabs for 2.3')}` },
  ];

  const tabsforUnique = [
    { id: 1, name: `${t('shop.sub tabs for 4.1')}` },
    { id: 2, name: `${t('shop.sub tabs for 4.2')}` },
    { id: 3, name: `${t('shop.sub tabs for 4.3')}` },
  ];

  const tabMapping: Record<number, Tab[]> = {
    1: tabsforManagement,
    2: tabsforProduction,
    4: tabsforUnique,
  };

  return (
    <Box
      sx={{
        padding: '8px 0',
        width: '100%',
      }}
    >
      {activeTab !== 3 && (
        <TabBar
          fontSize={10}
          top={62}
          tabs={tabMapping[activeTab]}
          activeTab={activeSubTab}
          setActiveTab={setActiveSubTab}
        />
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          rowGap: '6px',
          columnGap: '4px',
          width: '100%',
          height: '100%',
          padding: '16px 0 64px 0',
        }}
      >
        {filteredGoodsBySubCategory?.map((item) => (
          <GoodItem
            displayBalance={displayBalance}
            setProfitPerHour={setProfitPerHour}
            item={item}
            key={item.id}
            goods={goods}
            setDisplayBalance={setDisplayBalance}
          />
        ))}
      </Box>
    </Box>
  );
};
