import { Box, Typography } from '@mui/material';
import WebApp from '@twa-dev/sdk';
import { useCopyToClipboard } from '../../core/hooks/useCopyToClipboard';
import { colors } from '../../core/theme/colors';
import { useContext } from 'react';
import { AuthContext } from '../../core/context/AuthContext';
import { useTranslation } from 'react-i18next';

export const Invite = () => {
  const [copied, handleCopy] = useCopyToClipboard(2000);
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user } = authContext;
  const inviteLink = user?.inviteLink;

  const link = `https://t.me/happy_farm_clicker_bot?start=${inviteLink}`;

  const shareData = {
    title: 'Happy Farm',
    text: `${t('friends.link text')}`,
    url: link,
  };

  const sendInvite = async () => {
    WebApp.HapticFeedback.notificationOccurred('success');
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else {
      WebApp.openTelegramLink(`https://t.me/share/url?url=${shareData.url}`);
    }
  };

  const copyLink = () => {
    WebApp.HapticFeedback.impactOccurred('rigid');
    handleCopy(link);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '50',
        display: 'flex',
        gap: '4px',
      }}
    >
      <button
        onClick={sendInvite}
        style={{
          height: ' 60px',
          borderRadius: '16px',
          border: ' 2px solid #28180A',
          backgroundColor: '#FCA810',
          width: '100%',
          transition: 'all ease 0.2s',
        }}
      >
        <Typography
          sx={{
            color: '#28180A',
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'SuisseIntl',
          }}
        >
          {t('friends.invite a friend')}
        </Typography>
      </button>
      <button
        onClick={copyLink}
        style={{
          height: ' 60px',
          borderRadius: '16px',
          border: ' 2px solid #28180A',
          backgroundColor: copied ? colors.yellow : '#FCA810',
          width: '60px',
          minWidth: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all ease 0.2s',
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_98_31213)">
            <path
              d="M9.35917 15.0942C8.39213 16.0612 7.61265 16.8407 7.08204 17.5361C6.53114 18.2582 6.1783 18.9771 6.1783 19.8284C6.1783 20.6796 6.53114 21.3986 7.08204 22.1206C7.61265 22.8161 8.39212 23.5955 9.35916 24.5625L9.43677 24.6401C10.4038 25.6072 11.1832 26.3867 11.8787 26.9173C12.6007 27.4682 13.3197 27.821 14.1709 27.821C15.0222 27.821 15.7411 27.4682 16.4632 26.9173C17.1586 26.3867 17.9381 25.6072 18.9051 24.6401L18.9439 24.6013C19.2368 24.3084 19.2368 23.8336 18.9439 23.5407C18.651 23.2478 18.1761 23.2478 17.8833 23.5407C16.8683 24.5557 16.1592 25.2624 15.5533 25.7247C14.9647 26.1738 14.5623 26.321 14.1709 26.321C13.7795 26.321 13.3772 26.1738 12.7886 25.7247C12.1826 25.2624 11.4736 24.5557 10.4586 23.5407C9.44364 22.5257 8.73687 21.8167 8.27457 21.2107C7.82547 20.6221 7.6783 20.2198 7.6783 19.8284C7.6783 19.437 7.82547 19.0346 8.27457 18.446C8.73687 17.8401 9.44364 17.1311 10.4586 16.1161C11.4736 15.1011 12.1826 14.3943 12.7886 13.932C13.3772 13.4829 13.7795 13.3357 14.1709 13.3357C14.5623 13.3357 14.9647 13.4829 15.5533 13.932C16.1592 14.3943 16.8683 15.1011 17.8833 16.1161C18.1761 16.409 18.651 16.409 18.9439 16.1161C19.2368 15.8232 19.2368 15.3483 18.9439 15.0554L18.9051 15.0166C17.9381 14.0496 17.1586 13.2701 16.4632 12.7395C15.7411 12.1886 15.0222 11.8357 14.1709 11.8357C13.3197 11.8357 12.6007 12.1886 11.8787 12.7395C11.1832 13.2701 10.4038 14.0495 9.43679 15.0166L9.35917 15.0942Z"
              fill="#28180A"
            />
            <path
              d="M16.1155 10.4592C17.1305 9.44421 17.8395 8.73744 18.4454 8.27514C19.034 7.82604 19.4364 7.67888 19.8278 7.67887C20.2192 7.67888 20.6216 7.82604 21.2102 8.27514C21.8161 8.73744 22.5251 9.44421 23.5401 10.4592C24.5551 11.4742 25.2619 12.1832 25.7242 12.7891C26.1733 13.3778 26.3204 13.7801 26.3204 14.1715C26.3204 14.5629 26.1733 14.9653 25.7242 15.5539C25.2619 16.1598 24.5551 16.8688 23.5401 17.8838C22.5251 18.8988 21.8161 19.6056 21.2102 20.0679C20.6216 20.517 20.2192 20.6642 19.8278 20.6642C19.4364 20.6642 19.034 20.517 18.4454 20.0679C17.8395 19.6056 17.1305 18.8988 16.1155 17.8838C15.8226 17.5909 15.3477 17.5909 15.0548 17.8838C14.7619 18.1767 14.7619 18.6516 15.0548 18.9445L15.0936 18.9833C16.0606 19.9503 16.8401 20.7298 17.5356 21.2604C18.2576 21.8113 18.9766 22.1642 19.8278 22.1642C20.679 22.1642 21.398 21.8113 22.12 21.2604C22.8155 20.7298 23.5949 19.9503 24.562 18.9833L24.6396 18.9057C25.6066 17.9387 26.3861 17.1592 26.9167 16.4638C27.4676 15.7417 27.8204 15.0228 27.8204 14.1715C27.8204 13.3203 27.4676 12.6013 26.9167 11.8793C26.3861 11.1838 25.6066 10.4044 24.6396 9.43734L24.562 9.35975C23.595 8.3927 22.8155 7.61323 22.12 7.08261C21.398 6.53171 20.679 6.17887 19.8278 6.17887C18.9766 6.17887 18.2576 6.53171 17.5356 7.08261C16.8401 7.61322 16.0607 8.39268 15.0936 9.35972L15.0548 9.39854C14.7619 9.69144 14.7619 10.1663 15.0548 10.4592C15.3477 10.7521 15.8226 10.7521 16.1155 10.4592Z"
              fill="#28180A"
            />
          </g>
          <defs>
            <clipPath id="clip0_98_31213">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.0292969 17) rotate(-45)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </Box>
  );
};
