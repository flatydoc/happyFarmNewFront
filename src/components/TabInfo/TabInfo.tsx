import { Box } from '@mui/material';
import { TabInfoCard } from '../ui/TabInfoCard/TabInfoCard';
import { formatNumber } from '../../core/utils/formatNumber';
import { useTranslation } from 'react-i18next';

export const TabInfo = ({
  rewardPerClick,
  profitPerHour,
  amountToUpgrade,
  level,
  turboTap,
  turbo,
}: {
  rewardPerClick: number;
  profitPerHour: number;
  amountToUpgrade: number;
  level: number;
  turboTap: number;
  turbo: boolean;
}) => {
  const { t } = useTranslation();

  const getFormattedAmountToUpgrade = () => {
    if (amountToUpgrade < 0) {
      return '0';
    }
    return formatNumber(amountToUpgrade);
  };

  const tabs = [
    {
      label: t('tabInfo.profit per tap'),
      value: !turbo ? `+${rewardPerClick}` : `+${rewardPerClick} x ${turboTap}`,
    },
    {
      label: t('tabInfo.coins for up'),
      value: getFormattedAmountToUpgrade(),
    },
    {
      label: t('tabInfo.profit per hour'),
      value: profitPerHour
        ? `+${formatNumber(profitPerHour)}`
        : formatNumber(profitPerHour),
    },
  ];

  const filteredTabs = tabs.filter(
    (tab) => tab.label !== t('tabInfo.coins for up') || level !== 10
  );

  return (
    <Box
      sx={{
        zIndex: 50,
        display: 'flex',
        gap: '4px',
        width: '100%',
        height: '58px',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      {filteredTabs.map(({ label, value }) => (
        <TabInfoCard label={label} key={label} value={value} />
      ))}
    </Box>
  );
};
