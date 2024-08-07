import { Box, Typography } from '@mui/material';
import { colors } from '../../core/theme/colors';
import { LeaderItem } from './LeaderItem/LeaderItem';
import { ILeader } from '../../core/types';
import { formatNumber } from '../../core/utils/formatNumber';
import { Spinner } from '../ui/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export const LeadersList = ({
  leaders,
  isLoading,
  error,
  totalUsers,
  level,
}: {
  leaders: ILeader[];
  isLoading: boolean;
  error: Error;
  totalUsers: number;
  level: number;
  position: number;
  displayBalance?: number;
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !leaders) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        zIndex: '10',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: colors.primary,
        }}
      >
        <Typography
          sx={{
            fontSize: '22px',
            lineHeight: '22px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {t(`friends.leaders list`)}
        </Typography>
        <Typography
          sx={{
            fontSize: '22px',
            lineHeight: '22px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {formatNumber(totalUsers)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.brown,
          boxShadow: ' 0px 4px 20px 0px #00000040',
          borderRadius: '12px',
          overflowY: 'hidden',
        }}
      >
        {!leaders.length && (
          <Box
            sx={{
              padding: '8px',
              minHeight: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: '500',
                fontFamily: 'SuisseIntl',
                color: colors.secondaryTextColor,
              }}
            >
              {`${t(`friends.no leaders`)} ${level}`}
            </Typography>
          </Box>
        )}

        {leaders.map((leader, index) => (
          <LeaderItem key={leader.telegramId} leader={leader} index={index} />
        ))}
      </Box>
    </Box>
  );
};
