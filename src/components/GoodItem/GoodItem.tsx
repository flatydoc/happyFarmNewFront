import { Box, Typography } from '@mui/material';
import { colors } from '../../core/theme/colors';
import pattern from '../../assets/images/pattern.png';
import { IGood } from '../../core/types';
import coin from '../../assets/images/coin.png';
import WebApp from '@twa-dev/sdk';
import { useContext, useState } from 'react';
import { Popup } from '../Popup/Popup';
import { formatNumber } from '../../core/utils/formatNumber';
import { Modal } from '../Modal/Modal';
import { buyResource } from '../../core/services/shop.service';
import { AuthContext } from '../../core/context/AuthContext';
import { iconByGoodId } from '../../core/configs/constants';
import { checkCondition } from '../../core/utils/checkCondition';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';

type GoodItemProps = {
  item: IGood;
  setProfitPerHour: (profit: number) => void;
  displayBalance: number;
  setDisplayBalance: React.Dispatch<React.SetStateAction<number>>;
  goods?: IGood[];
};

export const GoodItem = ({
  item,
  setProfitPerHour,
  displayBalance,
  setDisplayBalance,
  goods,
}: GoodItemProps) => {
  const { t } = useTranslation();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;
  const [level, setLevel] = useState<number>(item.level);

  const result = checkCondition(item, goods);

  const profit =
    level === 0
      ? item.defaultProfit
      : item.profitCoef * level * item.defaultProfit;

  const price =
    level === 0
      ? item.defaultPrice
      : item.priceCoef * level * item.defaultPrice;

  const handleShowPopup = () => {
    if (displayBalance < price || item.level === 21) {
      WebApp.HapticFeedback.notificationOccurred('warning');
      return;
    }
    setIsShowPopup(true);
  };

  const upgrade = async (id: number) => {
    if (!telegramId) {
      return;
    }
    try {
      if (displayBalance < price || item.level === 21) {
        WebApp.HapticFeedback.notificationOccurred('warning');
        return;
      }
      const data = await buyResource(id, telegramId);
      setLevel(data.level);
      setProfitPerHour(data.totalProfit);
      setDisplayBalance(data.balance);
      mutate(['goods', telegramId]);
    } catch (error: any) {
      console.log('Failed to buy', error);
      return;
    }
  };

  const handleUpgrade = () => {
    if (displayBalance < price) {
      WebApp.HapticFeedback.notificationOccurred('warning');
      return;
    }
    if (displayBalance >= price || item.level === 21) {
      upgrade(item.id);
      WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <Box
      onClick={handleShowPopup}
      sx={{
        padding: '12px',
        minHeight: '114px',
        borderRadius: '12px',
        background: `url(${pattern}), linear-gradient(180deg, ${colors.brownLight} 0%, ${colors.brownLight} 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: ' 12px',
          marginBottom: '12px',
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.brown,
            minWidth: '54px',
            minHeight: '54px',
            maxWidth: '54px',
            maxHeight: '54px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {result.status === false && (
            <Typography
              sx={{
                fontSize: '30px',
                fontWeight: '500',
                fontFamily: 'SuisseIntl',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '1',
              }}
            >
              🔒
            </Typography>
          )}
          <img
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              filter: result.status === false ? 'grayscale(1)' : '',
            }}
            src={iconByGoodId[item.id]}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              fontSize: '8px',
              lineHeight: '13px',
              fontWeight: '500',
              fontFamily: 'SuisseIntl',
              color: '#fff',
            }}
          >
            {t(`shop.item names.${item.id}`)}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: ' 4px',
            }}
          >
            <img src={coin} width={16} height={16} />
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '13px',
                fontWeight: '400',
                fontFamily: 'SuisseIntl',
                color: colors.yellowLight,
              }}
            >
              {formatNumber(profit)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '8px',
              lineHeight: '13px',
              fontWeight: '400',
              fontFamily: 'SuisseIntl',
              color: colors.secondaryTextColor,
            }}
          >
            {t(`tabInfo.profit per hour`)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          marginBottom: '8px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            width: '52px',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '13px',
              color: '#fff',
              fontFamily: 'SuisseIntl',
            }}
          >
            <span
              style={{
                color: colors.secondaryTextColor,
              }}
            >
              lvl{' '}
            </span>
            {`${level}/21`}
          </Typography>
        </Box>
        {level < 21 && (
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                display: 'block',
                filter: displayBalance < price ? 'grayscale(1)' : '',
              }}
              src={coin}
              width={16}
              height={16}
            />
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '13px',
                fontWeight: '400',
                fontFamily: 'SuisseIntl',
                color:
                  displayBalance < price
                    ? colors.secondaryTextColor
                    : colors.yellowLight,
              }}
            >
              {formatNumber(price)}
            </Typography>
          </Box>
        )}
      </Box>
      {isShowPopup && (
        <Modal closeFunc={setIsShowPopup}>
          <Popup
            result={result}
            event={handleUpgrade}
            btnText={t(`modals.boost.get`)}
            title={t(`shop.item names.${item.id}`)}
            closeFunc={setIsShowPopup}
            profit={profit}
            price={price}
            text={t(`shop.item text.${item.id}`)}
          />
        </Modal>
      )}
    </Box>
  );
};
