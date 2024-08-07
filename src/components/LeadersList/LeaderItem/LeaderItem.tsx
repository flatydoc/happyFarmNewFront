import { Box, Typography } from '@mui/material';
import { colors } from '../../../core/theme/colors';
import coin from '../../../assets/images/coin.png';
import { ILeader } from '../../../core/types';
import { levelRanks } from '../../../core/configs/constants';
import { formatNumber } from '../../../core/utils/formatNumber';
import { useTranslation } from 'react-i18next';

interface ILeaderProps {
  leader: ILeader;
  index: number;
}

const bgStyles: Record<number, string> = {
  1: 'linear-gradient(314.28deg, #C76E05 2.81%, #FCA810 93.73%)',
  2: 'linear-gradient(135deg, #E7E7E7 0%, #797979 100%)',
  3: 'linear-gradient(133.33deg, #A05815 2.76%, #C03F08 100%)',
};
export const LeaderItem = ({ leader, index }: ILeaderProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '8px',
        }}
      >
        <Typography
          sx={{
            width: '25px',
            textAlign: 'center',
            fontSize: ' 12px',
            fontFamily: 'SuisseIntl',
            color: colors.secondaryTextColor,
          }}
        >
          {index + 1}
        </Typography>
        <Box
          sx={{
            background: bgStyles[index + 1] || colors.brownDark,
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
            {index > 2 ? `👨‍🌾` : `🏆`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
                color: '#fff',
              }}
            >
              {leader.username}
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
                  fontSize: '12px',
                  fontFamily: 'SuisseIntl',
                  color: colors.secondaryTextColor,
                }}
              >
                {t(`levels.${levelRanks[leader.level]}`)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: ' flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <img src={coin} width={16} height={16} />
            <Typography
              sx={{
                paddingRight: '8px',
                color: colors.primary,
                fontSize: '12px',
                fontFamily: 'SuisseIntl',
              }}
            >
              {formatNumber(leader.balance)}
            </Typography>
          </Box>
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
        ></Box>
      </Box>
    </>
  );
};
