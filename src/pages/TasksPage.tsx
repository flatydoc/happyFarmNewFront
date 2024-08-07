import { Box, Typography } from '@mui/material';
import bg from '../assets/images/bg/pattern.png';
import { colors } from '../core/theme/colors';
import big_coin from '../assets/images/big_coin.png';
import sun from '../assets/images/sun.png';
import particle from '../assets/images/particle.png';

import { useContext } from 'react';
import { AuthContext } from '../core/context/AuthContext';
import { getTasks } from '../core/services/tasks.service';
import useSWR from 'swr';
import { TaskList } from '../components/TasksList/TaskList';
import { useOutletContext } from 'react-router-dom';
import { IStateContextType } from '../core/types';
import { useTranslation } from 'react-i18next';

export const TasksPage = () => {
  const { setDisplayBalance } = useOutletContext<IStateContextType>();
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;
  const { t } = useTranslation();

  const {
    data: tasks,
    isLoading,
    error,
  } = useSWR(['tasks', telegramId], () => getTasks(telegramId!));
  const tasksData = tasks?.data;

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: `url(${bg}),linear-gradient(180deg, rgba(53, 36, 21, 1) 0%, rgba(53, 36, 21, 1) 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        display: 'flex',
        position: 'relative',
        padding: ' 48px 16px 16px 16px',
        gap: '48px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
        <Typography
          sx={{
            fontSize: '34px',
            fontWeight: '600',
            color: colors.primary,
            textAlign: 'center',
          }}
        >
          {t('tasks.Get more coins')}
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
          {t('tasks.Tasks list')}
        </Typography>
        <TaskList
          setDisplayBalance={setDisplayBalance}
          isLoading={isLoading}
          error={error}
          tasks={tasksData}
        />
      </Box>
    </Box>
  );
};
