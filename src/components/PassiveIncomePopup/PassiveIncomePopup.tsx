import { Box, IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { colors } from '../../core/theme/colors';
import big_coin from '../../assets/images/big_coin.png';
import sun from '../../assets/images/sun.png';
import particle from '../../assets/images/particle.png';
import coin from '../../assets/images/coin.png';

import WebApp from '@twa-dev/sdk';
import { useTranslation } from 'react-i18next';

export const PassiveIncomePopup = ({
  closeFunc,
  event,
  reward,
}: {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  event: () => void;
  reward?: number;
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    WebApp.HapticFeedback.notificationOccurred('success');
    event();
    closeFunc(false);
  };

  const handleClose = () => {
    event();
    closeFunc(false);
  };
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        width: '100%',
        display: 'flex',
        position: 'relative',
        gap: '24px',
        flexDirection: 'column',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        padding: '62px 16px 44px 16px',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          zIndex: '1',
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
          gap: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '210px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <img
              style={{
                position: 'relative',
                zIndex: '1',
              }}
              src={big_coin}
              width={140}
              height={140}
            />
            <img
              src={sun}
              alt="char"
              style={{
                display: 'block',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '0',
              }}
            />
            <img
              src={particle}
              style={{
                display: 'block',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '0',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  lineHeight: '22px',
                  color: colors.secondaryTextColor,
                  fontWeight: '600',
                  fontFamily: 'SuisseIntl',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {t(`modals.income`)}
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
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'SuisseIntl',
                    color: '#fff',
                  }}
                >
                  {`${reward?.toFixed(0)}`}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
              }}
            />
          </Box>
        </Box>
      </Box>
      <button
        onClick={handleClick}
        style={{
          position: 'relative',
          zIndex: '1',
          height: '60px',
          borderRadius: '16px',
          border: '2px solid #28180A',
          backgroundColor: '#FCA810',
          width: '100%',
          transition: 'all ease 0.2s',
        }}
      >
        <Typography
          sx={{
            color: '#28180A',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {t(`modals.harvest`)}
        </Typography>
      </button>
    </Box>
  );
};
