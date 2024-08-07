import { RouteList } from '../../core/router/routes';
import { Box } from '@mui/material';
import { colors } from '../../core/theme/colors';
import { Link } from '../ui/Link/Link';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();
  return (
    <Box
      component={'nav'}
      sx={{
        height: `62px`,
        zIndex: 100,
        position: 'fixed',
        bottom: 0,
        right: 0,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        marginBottom: '8px',
        backgroundColor: colors.bottomNavigation,
      }}
    >
      <Link to={RouteList.Root} label={t('nav.main')} />
      <Link to={RouteList.Shop} label={t('nav.shop')} />
      <Link to={RouteList.Friends} label={t('nav.friends')} />
      <Link to={RouteList.Tasks} label={t('nav.tasks')} />
    </Box>
  );
};
