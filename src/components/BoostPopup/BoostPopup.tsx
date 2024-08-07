import { Box, IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { colors } from '../../core/theme/colors';
import bg from '../../assets/images/bg/pattern.png';
import { levelRanks } from '../../core/configs/constants';
import { BoostItem } from './BoostItem/BoostItem';
import { formatNumber } from '../../core/utils/formatNumber';
import { Spinner } from '../ui/Spinner/Spinner';
import { getBoosts } from '../../core/services/boost.service';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../core/context/AuthContext';
import { IBoost } from '../../core/types';
import { useTranslation } from 'react-i18next';
export const BoostPopup = ({
  closeFunc,
  level,
  balance,
  handleShowClaimTurboBoostPopup,
  handleShowClaimEnergyBoostPopup,
}: {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
  balance: number;
  handleShowClaimTurboBoostPopup: () => void;
  handleShowClaimEnergyBoostPopup: () => void;
}) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user } = authContext;
  const telegramId = user?.telegramId;
  const [boosts, setBoosts] = useState<IBoost[]>([]);
  const fetchBoosts = async () => {
    if (!telegramId) return;
    try {
      const { data } = await getBoosts(telegramId);
      setBoosts(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchBoosts();
  }, []);

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        position: 'relative',
        gap: '48px',
        flexDirection: 'column',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        padding: '62px 16px 44px 16px',
        background: `url(${bg}),linear-gradient(180deg, rgba(53, 36, 21, 1) 0%, rgba(53, 36, 21, 1) 100%)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <IconButton
        onClick={() => closeFunc(false)}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          color: colors.secondaryTextColor,
        }}
      >
        <CloseRoundedIcon
          sx={{
            color: colors.secondaryTextColor,
          }}
        />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <Box
          sx={{
            zIndex: 50,
            display: 'flex',
            gap: '12px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'SuisseIntl',
              color: colors.secondaryTextColor,
              fontSize: '16px',
              fontWeight: '400',
            }}
          >
            {t(`modals.boost.balance`)}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Benzin',
              color: '#fff',
              fontSize: '36px',
              fontWeight: '600',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            {formatNumber(balance)}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '2px',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Benzin',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
              }}
            >
              {`${t(`levels.${levelRanks[level]}`)}. lvl ${level}/10`}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            color: colors.primary,
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {t(`modals.boost.how does work`)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Typography
          sx={{
            fontSize: '22px',
            lineHeight: '22px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
            color: colors.primary,
          }}
        >
          {t(`modals.boost.free amplifiers`)}
        </Typography>
        {boosts ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: colors.brown,
              boxShadow: ' 0px 4px 20px 0px #00000040',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {boosts.map((boost: IBoost) => (
              <BoostItem
                key={boost.id}
                boost={boost}
                handleShowClaimTurboBoostPopup={handleShowClaimTurboBoostPopup}
                handleShowClaimEnergyBoostPopup={
                  handleShowClaimEnergyBoostPopup
                }
              />
            ))}
          </Box>
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};
