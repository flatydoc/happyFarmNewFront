import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { colors } from '../../core/theme/colors';
import bg from '../../assets/images/bg/pattern.png';
import sun from '../../assets/images/sun.png';
import { charImgByLevel, levelRanks } from '../../core/configs/constants';
import WebApp from '@twa-dev/sdk';
import { useTranslation } from 'react-i18next';

export const CharPopup = ({
  closeFunc,
  level,
}: {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
}) => {
  const [activeSlide, setActiveSlide] = useState(level);
  const { t } = useTranslation();

  const prevSlide = () => {
    if (activeSlide !== 1) {
      setActiveSlide((prev: number) => prev - 1);
      WebApp.HapticFeedback.impactOccurred('light');
    }
  };
  const nextSlide = () => {
    if (activeSlide !== 10) {
      setActiveSlide((prev: number) => prev + 1);
      WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        position: 'relative',
        gap: '24px',
        flexDirection: 'column',
        padding: '62px 16px 16px 16px',
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
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '34px',
              fontFamily: 'SuisseIntl',
              fontWeight: '600',
              color: colors.primary,
            }}
          >
            {t(`modals.char.levels`)}
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              fontFamily: 'SuisseIntl',
              fontWeight: '500',
              color: colors.secondaryTextColor,
            }}
          >
            {t(`modals.char.level up and get it`)}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: '70px',
            left: '16px',
            width: 'calc(100% - 32px)',
            zIndex: '50',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.brown,
            borderRadius: '12px',
            boxShadow: ' 0px 4px 20px 0px #00000040',
            padding: '16px 12px',
          }}
        >
          <IconButton
            disabled={activeSlide === 1}
            onClick={prevSlide}
            sx={{
              color: colors.primary,
            }}
          >
            <ArrowBackIosRoundedIcon
              sx={{
                color:
                  activeSlide !== 1
                    ? colors.primary
                    : colors.secondaryTextColor,
              }}
            />
          </IconButton>
          <Typography
            sx={{
              fontFamily: 'Benzin',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {`${t(`levels.${levelRanks[activeSlide]}`)}. lvl ${activeSlide}/10`}
          </Typography>
          <IconButton
            onClick={nextSlide}
            disabled={activeSlide === 10}
            sx={{
              color: colors.primary,
            }}
          >
            <ArrowForwardIosRoundedIcon
              sx={{
                color:
                  activeSlide !== 10
                    ? colors.primary
                    : colors.secondaryTextColor,
              }}
            />
          </IconButton>
        </Box>
        <img
          src={charImgByLevel[activeSlide]}
          alt="char"
          style={{
            position: 'absolute',
            left: '50%',
            transform: `translateX(-50%) scale(0.26)`,
            zIndex: '10',
            display: 'block',
            bottom: '-940px',
          }}
        />
        <img
          src={sun}
          alt="char"
          style={{
            display: 'block',
            position: 'absolute',
            left: '50%',
            top: '80%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
    </Box>
  );
};
