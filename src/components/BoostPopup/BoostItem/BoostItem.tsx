import { Box, Typography } from '@mui/material';
import { colors } from '../../../core/theme/colors';
import { useContext, useEffect, useState } from 'react';
import { IBoost } from '../../../core/types';
import {
  iconByBoostId,
  intervalByBoostId,
} from '../../../core/configs/constants';
import { AuthContext } from '../../../core/context/AuthContext';
import { activeBoost } from '../../../core/services/boost.service';
import WebApp from '@twa-dev/sdk';
import { transformTime } from '../../../core/utils/transformTime';
import { useTranslation } from 'react-i18next';

export const BoostItem = ({
  boost,
  handleShowClaimTurboBoostPopup,
  handleShowClaimEnergyBoostPopup,
}: {
  boost: IBoost;
  handleShowClaimTurboBoostPopup: () => void;
  handleShowClaimEnergyBoostPopup: () => void;
}) => {
  const [available, setAvailable] = useState<number>(boost?.available);
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;
  const interval = intervalByBoostId[boost.id];
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState(
    boost.lastUsed ? transformTime(boost.lastUsed, interval) : 0
  );

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [timeLeft]);

  const avtivate = async (id: number) => {
    if (!telegramId) {
      return;
    }
    setAvailable((prev) => prev - 1);
    try {
      await activeBoost(id, telegramId);

      if (boost.boostType === 'turbo') {
        handleShowClaimTurboBoostPopup();
      }
      if (boost.boostType === 'energy') {
        handleShowClaimEnergyBoostPopup();
      }
    } catch (error: any) {
      console.log('Failed to complete', error);
      return;
    }
  };

  const handleActiveBoost = () => {
    if (available > 0 && !isDisabled) {
      avtivate(boost.id);
      WebApp.HapticFeedback.impactOccurred('light');
    } else {
      WebApp.HapticFeedback.notificationOccurred('warning');
      console.log('Boost is not available anymore.');
      return;
    }
  };

  return (
    <>
      <Box
        onClick={handleActiveBoost}
        sx={{
          padding: '8px 16px 8px 8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '8px',
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.brownDark,
            minWidth: '44px',
            minHeight: '44px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              textShadow: '0px 4px 10px #FCA81026',
            }}
          >
            {iconByBoostId[boost.id]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <Typography
              sx={{
                fontSize: ' 15px',
                fontWeight: '500',
                lineHeight: '20px',
                fontFamily: 'SuisseIntl',
                color: isDisabled ? colors.secondaryTextColor : '#fff',
              }}
            >
              {boost.name}
            </Typography>

            <Typography
              sx={{
                color: isDisabled ? colors.disabled : colors.secondaryTextColor,
                fontSize: '12px',
                fontFamily: 'SuisseIntl',
              }}
            >
              {`${available}/${boost.limit} ${t(`modals.boost.available`)}`}
            </Typography>
          </Box>
          {boost.lastUsed && timeLeft > 0 && (
            <Typography
              sx={{
                color: colors.secondaryTextColor,
                fontSize: '12px',
                fontFamily: 'SuisseIntl',
              }}
            >
              {`${t(`modals.boost.left`)} ${timeLeft}м`}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          padding: '0 8px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF0F',
            height: '1px',
            width: '100%',
          }}
        />
      </Box>
    </>
  );
};
