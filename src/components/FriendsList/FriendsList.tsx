import { Box, Typography } from '@mui/material';
import { colors } from '../../core/theme/colors';
import { FriendItem } from './FriendItem/FriendItem';
import { IFriend } from '../../core/types';
import { Spinner } from '../ui/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export const FriendsList = ({
  friends,
  isLoading,
  error,
}: {
  friends: IFriend[];
  isLoading: boolean;
  error: Error;
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !friends) {
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
          {t(`friends.friends`)}
        </Typography>
        <Typography
          sx={{
            fontSize: '22px',
            lineHeight: '22px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {friends.length}
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
          overflow: 'hidden',
        }}
      >
        {!friends.length && (
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
              {t(`friends.no friends`)}
            </Typography>
          </Box>
        )}
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </Box>
    </Box>
  );
};
