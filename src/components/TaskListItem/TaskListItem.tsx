import { IconButton, Typography, Box } from '@mui/material';
import { colors } from '../../core/theme/colors';
import { formatNumber } from '../../core/utils/formatNumber';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import coin from '../../assets/images/coin.png';
import { ITask } from '../../core/types';
import { iconByTaskId } from '../../core/configs/constants';
import WebApp from '@twa-dev/sdk';
import { useContext, useState } from 'react';
import { AuthContext } from '../../core/context/AuthContext';
import { complete } from '../../core/services/tasks.service';
import { useTranslation } from 'react-i18next';

export const TaskListItem = ({
  task,
  setDisplayBalance,
}: {
  task: ITask;
  setDisplayBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;
  const [isComplete, setIsComplete] = useState<boolean>(task.isComplete);

  const completeTask = async (id: number) => {
    if (!telegramId) {
      return;
    }
    try {
      const data = await complete(id, telegramId);
      setIsComplete(true);
      setDisplayBalance(data.balance);
    } catch (error: any) {
      console.log('Failed to complete', error);
      return;
    }
  };

  const handleClick = () => {
    WebApp.HapticFeedback.impactOccurred('light');
    completeTask(task.id);
    WebApp.openLink(task.url);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '8px',
        }}
      >
        <img src={iconByTaskId[task.id]} width={44} height={44} />
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
                fontSize: ' 12px',
                fontWeight: '500',
                lineHeight: '20px',
                fontFamily: 'SuisseIntl',
                color: '#fff',
              }}
            >
              {t(`tasks.${task.id}`)}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <img src={coin} width={16} height={16} />
              <Typography
                sx={{
                  color: colors.primary,
                  fontSize: '12px',
                  fontFamily: 'SuisseIntl',
                }}
              >
                {formatNumber(task.reward)}
              </Typography>
            </Box>
          </Box>
          {!isComplete ? (
            <IconButton
              onClick={handleClick}
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
          ) : (
            <Box
              sx={{
                padding: '8px',
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  color: colors.primary,
                }}
              />
            </Box>
          )}
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
    </Box>
  );
};
