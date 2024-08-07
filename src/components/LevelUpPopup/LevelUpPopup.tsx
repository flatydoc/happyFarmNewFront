import { Box, Typography } from '@mui/material';
import { colors } from '../../core/theme/colors';
import bg from '../../assets/images/bg/pattern.png';
import {
  REWARD_COEFFICIENT,
  charImgByLevel,
  levelRewards,
} from '../../core/configs/constants';
import sun from '../../assets/images/sun.png';
import coin from '../../assets/images/coin.png';
import { useTranslation } from 'react-i18next';

export const LevelUpPopup = ({
  closeFunc,
  level,
}: {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
}) => {
  const { t } = useTranslation();
  const rewardPerClick = level * REWARD_COEFFICIENT;

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <img
            src={charImgByLevel[level]}
            alt="char"
            width={300}
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
            color: colors.primary,
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          {`${t(`modals.levelUp.You have reached level`)} ${level}`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'SuisseIntl',
              color: colors.secondaryTextColor,
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {`${t(`modals.levelUp.now reward for tap`)} +${rewardPerClick}`}
          </Typography>
          <img src={coin} width={16} height={16} />
        </Box>
        <button
          onClick={() => closeFunc(false)}
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
            {`${t(`modals.boost.get`)} +${levelRewards[level]}`}
          </Typography>
        </button>
      </Box>
    </Box>
  );
};
