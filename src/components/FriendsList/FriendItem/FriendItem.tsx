import { Box, Typography } from '@mui/material';
import { IFriend } from '../../../core/types';
import { colors } from '../../../core/theme/colors';
import coin from '../../../assets/images/coin.png';
import { formatNumber } from '../../../core/utils/formatNumber';
import { levelRanks } from '../../../core/configs/constants';
import { useTranslation } from 'react-i18next';

interface IFriendProps {
  friend: IFriend;
}

export const FriendItem = ({ friend }: IFriendProps) => {
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
            👨‍🌾
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
              {friend.username}
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
                {t(`levels.${levelRanks[friend.level]}`)}
              </Typography>
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF1A',
                }}
              />
              <img src={coin} width={16} height={16} />
              <Typography
                sx={{
                  color: colors.primary,
                  fontSize: '12px',
                  fontFamily: 'SuisseIntl',
                }}
              >
                {formatNumber(friend.balance)}
              </Typography>
            </Box>
          </Box>
          {/* <Box
            sx={{
              display: " flex",
              gap: "4px",
              alignItems: "center",
            }}>
            <img src={coin} width={16} height={16} />
            <Typography
              sx={{
                paddingRight: "8px",
                color: colors.primary,
                fontSize: "12px",
                fontFamily: "SuisseIntl",
              }}>
              {formatNumber(friend.award)}
            </Typography>
          </Box> */}
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
        />
      </Box>
    </>
  );
};
