import { Box, IconButton, Typography } from '@mui/material';
import { colors } from '../../core/theme/colors';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { charImgByLevel, levelRanks } from '../../core/configs/constants';
import sun from '../../assets/images/sun.png';
import { useTranslation } from 'react-i18next';

export const LeadersListNavigation = ({
  activeSlide,
  prevSlide,
  nextSlide,
}: {
  activeSlide: number;
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={prevSlide}
        disabled={activeSlide === 1}
        sx={{
          color: colors.primary,
          position: 'relative',
          zIndex: '1',
        }}
      >
        <ArrowBackIosRoundedIcon
          sx={{
            color:
              activeSlide !== 1 ? colors.primary : colors.secondaryTextColor,
          }}
        />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <img
            src={charImgByLevel[activeSlide]}
            alt="char"
            width={240}
            style={{
              display: 'block',
            }}
          />
          <img
            src={sun}
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
        <Typography
          sx={{
            fontFamily: 'Benzin',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          {`${t(`levels.${levelRanks[activeSlide]}`)}. lvl ${activeSlide}/10`}
        </Typography>
      </Box>
      <IconButton
        onClick={nextSlide}
        disabled={activeSlide === 10}
        sx={{
          position: 'relative',
          zIndex: '1',
          color: colors.primary,
        }}
      >
        <ArrowForwardIosRoundedIcon
          sx={{
            color:
              activeSlide !== 10 ? colors.primary : colors.secondaryTextColor,
          }}
        />
      </IconButton>
    </Box>
  );
};
