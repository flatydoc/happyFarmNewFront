import { Box, IconButton, Typography } from '@mui/material';
import { colors } from '../core/theme/colors';
import coin from '../assets/images/coin.png';
import { RouteList } from '../core/router/routes';
import { Link } from 'react-router-dom';
import { FriendsList } from '../components/FriendsList/FriendsList';
import { Invite } from '../components/Invite/Invite';
import bg from '../assets/images/bg/pattern.png';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import useSWR from 'swr';
import { getFriends } from '../core/services/friends.service';
import { useContext } from 'react';
import { AuthContext } from '../core/context/AuthContext';
import { useTranslation } from 'react-i18next';

export const FriendsPage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;
  const { t } = useTranslation();

  const {
    data: friends,
    isLoading,
    error,
  } = useSWR(['friends', telegramId], () => getFriends(telegramId!));
  const friendsData = friends?.data;

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        background: `url(${bg}),linear-gradient(180deg, rgba(53, 36, 21, 1) 0%, rgba(53, 36, 21, 1) 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        display: 'flex',
        position: 'relative',
        padding: ' 48px 16px 16px 16px',
        gap: '24px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'center',
          marginBottom: '14px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'SuisseIntl',
            fontSize: '34px',
            lineHeight: '41px',
            fontWeight: '600',
            letterSpacing: '-0.4px',
            color: colors.primary,
            textAlign: 'center',
            textShadow: '0px 4px 15px #00000040',
          }}
        >
          {t(`friends.invite friends`)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '0 40px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'SuisseIntl',
              fontSize: '15px',
              fontWeight: '500',
              lineHeight: '22px',
              color: colors.secondaryTextColor,
              textAlign: 'center',
            }}
          >
            <img src={coin} width={16} height={16} />
            <Typography
              sx={{
                display: 'inline',
                color: colors.primary,
                fontSize: '15px',
                fontWeight: '500',
                lineHeight: '22px',

                fontFamily: 'SuisseIntl',
              }}
            >
              {' '}
              5,000{' '}
            </Typography>
            {t(`friends.reward`)}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: '500',
                lineHeight: '22px !important',
                color: colors.secondaryTextColor,
                textAlign: 'center',
                fontFamily: 'SuisseIntl',
              }}
            >
              <img src={coin} width={16} height={16} />
              <Typography
                sx={{
                  display: 'inline',
                  color: colors.primary,
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '22px',

                  fontFamily: 'SuisseIntl',
                }}
              >
                {' '}
                50,000{' '}
              </Typography>
              {t(`friends.premium_reward`)}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            display: 'inline',
            color: colors.primary,
            fontSize: '15px',
            lineHeight: '22px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {t(`friends.more`)}
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
          {t(`friends.leaderboard`)}
        </Typography>
        <Link
          to={`/${RouteList.Leaders}`}
          style={{
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            backgroundColor: colors.brown,
            borderRadius: '12px',
            boxShadow: '0px 4px 20px 0px #00000040',
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
              🏆
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
            <Typography
              sx={{
                fontSize: '15px',
                lineHeight: '20px',
                fontWeight: '500',
                fontFamily: 'SuisseIntl',
                color: '#fff',
              }}
            >
              {t(`friends.leaders list`)}
            </Typography>
            <IconButton
              sx={{
                color: colors.primary,
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  color: colors.primary,
                }}
              />
            </IconButton>
          </Box>
        </Link>
      </Box>
      <FriendsList friends={friendsData} isLoading={isLoading} error={error} />
      <Invite />
    </Box>
  );
};
