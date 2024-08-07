import { Box, IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { colors } from '../../core/theme/colors';
import big_coin from '../../assets/images/big_coin.png';
import coin from '../../assets/images/coin.png';
import sun from '../../assets/images/sun.png';
import particle from '../../assets/images/particle.png';

import WebApp from '@twa-dev/sdk';
import { useTranslation } from 'react-i18next';

export const Popup = ({
  closeFunc,
  event,
  title,
  btnText,
  profit,
  price,
  text,
  result,
}: {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  event: () => void;
  text: string;
  btnText: string;
  title: string;
  icon?: string;
  profit?: number;
  price?: number;
  result: {
    status: boolean;
    text: string;
  };
}) => {
  const handleClick = () => {
    WebApp.HapticFeedback.notificationOccurred('success');
    event();
    closeFunc(false);
  };

  const { t } = useTranslation();

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
        onClick={() => closeFunc(false)}
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
            <Typography
              sx={{
                fontSize: '24px',

                color: '#fff',
                fontWeight: '600',
                fontFamily: 'SuisseIntl',
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.secondaryTextColor,
                fontWeight: '600',
                fontFamily: 'SuisseIntl',
                textAlign: 'center',
              }}
            >
              {text}
            </Typography>
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
                {t(`tabInfo.profit per hour`)}
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
                  {`+${profit?.toFixed(0)}`}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {result.status === true && (
                <img src={coin} width={24} height={24} />
              )}
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'SuisseIntl',
                  color:
                    result.status === false
                      ? colors.secondaryTextColor
                      : '#fff',
                }}
              >
                {result.status === true ? price?.toFixed(0) : result.text}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <button
        disabled={result.status === false}
        onClick={handleClick}
        style={{
          position: 'relative',
          zIndex: '1',
          height: '60px',
          borderRadius: '16px',
          border: '2px solid #28180A',
          backgroundColor: '#FCA810',
          filter: result.status === false ? 'grayscale(1)' : '',
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
          {btnText}
        </Typography>
      </button>
    </Box>
  );
};
