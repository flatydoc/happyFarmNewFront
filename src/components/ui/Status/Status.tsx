import { Box, Typography } from '@mui/material';
import { levelRanks } from '../../../core/configs/constants';
import WebApp from '@twa-dev/sdk';
import { formatBalance } from '../../../core/utils/formatNumber';
import { useTranslation } from 'react-i18next';

export const Status = ({
  balance,
  level,
  setIsShowCharPopup,
}: {
  balance: number;
  level: number;
  setIsShowCharPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    WebApp.HapticFeedback.impactOccurred('light');
    setIsShowCharPopup(true);
  };
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        zIndex: 50,
        display: 'flex',
        gap: '12px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Benzin',
          color: '#fff',
          fontSize: '36px',
          fontWeight: '600',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        {formatBalance(balance)}
      </Typography>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          gap: '2px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_98_31099)">
            <path
              d="M9.29007 0.0729069C9.42724 0.0221869 9.71447 -0.107328 9.84557 0.183308C10.0094 0.546603 10.2713 1.12637 10.3648 1.5988C10.4728 2.14506 10.4707 2.7855 10.3494 3.28869C10.2281 3.79187 9.77253 4.55872 9.05399 4.64742C8.47916 4.71839 8.10534 4.59617 7.8484 4.22748C7.66849 3.96939 7.48598 3.47507 7.46092 3.19952C7.43586 2.92397 7.56091 1.83103 7.91495 1.30785C8.4703 0.487199 9.06716 0.155326 9.29007 0.0729069Z"
              fill="white"
            />
            <path
              d="M5.61072 3.48298C5.63076 3.33735 5.65069 3.02149 5.99036 3.04106C6.41494 3.06553 7.09271 3.10423 7.58554 3.24236C8.1554 3.40208 8.75965 3.70379 9.17513 4.04713C9.59061 4.39047 10.0896 5.15427 9.81737 5.83427C9.59956 6.37826 9.29879 6.65321 8.82298 6.70892C8.48988 6.74796 7.93222 6.67871 7.65936 6.57198C7.3865 6.46525 6.41548 5.84249 6.09645 5.28298C5.59603 4.40534 5.57814 3.71963 5.61072 3.48298Z"
              fill="white"
            />
            <path
              d="M4.55569 6.86323C4.50906 6.70531 4.37926 6.37047 4.80267 6.28011C5.33193 6.16716 6.17662 5.98649 6.84449 5.96946C7.61675 5.94977 8.50019 6.06648 9.17393 6.28798C9.84767 6.50949 10.8283 7.14087 10.8283 7.9365C10.8284 8.573 10.596 8.95686 10.0435 9.16984C9.65666 9.31899 8.94341 9.42876 8.55887 9.40674C8.17434 9.38471 6.68738 9.0538 6.0257 8.57613C4.98779 7.82687 4.63146 7.11986 4.55569 6.86323Z"
              fill="white"
            />
            <path
              d="M6.0618 10.282C5.95586 10.1264 5.7023 9.80438 6.06278 9.59935C6.51338 9.34307 7.23236 8.93361 7.85048 8.74343C8.56521 8.52352 9.43778 8.41975 10.1555 8.48127C10.8732 8.54278 12.0398 8.9603 12.3538 9.80487C12.6049 10.4805 12.539 10.9479 12.1061 11.3163C11.803 11.5744 11.1791 11.8747 10.8106 11.9504C10.4422 12.0261 8.92044 12.058 8.11293 11.7215C6.84626 11.1936 6.23394 10.5349 6.0618 10.282Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_98_31099"
              x="0.5"
              y="0"
              width="16"
              height="20"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_98_31099"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_98_31099"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <Typography
          sx={{
            fontFamily: 'Benzin',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
          }}
        >
          {`${t(`levels.${levelRanks[level]}`)}. lvl ${level}/10`}
        </Typography>
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_98_31101)">
            <path
              d="M7.70993 0.0729069C7.57276 0.0221869 7.28553 -0.107328 7.15443 0.183308C6.99056 0.546603 6.72867 1.12637 6.63522 1.5988C6.52717 2.14506 6.5293 2.7855 6.65059 3.28869C6.77189 3.79187 7.22747 4.55872 7.94601 4.64742C8.52084 4.71839 8.89466 4.59617 9.1516 4.22748C9.33151 3.96939 9.51402 3.47507 9.53908 3.19952C9.56414 2.92397 9.43909 1.83103 9.08505 1.30785C8.5297 0.487199 7.93284 0.155326 7.70993 0.0729069Z"
              fill="white"
            />
            <path
              d="M11.3893 3.48298C11.3692 3.33735 11.3493 3.02149 11.0096 3.04106C10.5851 3.06553 9.90729 3.10423 9.41446 3.24236C8.8446 3.40208 8.24035 3.70379 7.82487 4.04713C7.40939 4.39047 6.91038 5.15427 7.18263 5.83427C7.40044 6.37826 7.70121 6.65321 8.17702 6.70892C8.51012 6.74796 9.06778 6.67871 9.34064 6.57198C9.6135 6.46525 10.5845 5.84249 10.9036 5.28298C11.404 4.40534 11.4219 3.71963 11.3893 3.48298Z"
              fill="white"
            />
            <path
              d="M12.4443 6.86323C12.4909 6.70531 12.6207 6.37047 12.1973 6.28011C11.6681 6.16716 10.8234 5.98649 10.1555 5.96946C9.38325 5.94977 8.49981 6.06648 7.82607 6.28798C7.15233 6.50949 6.17168 7.14087 6.17165 7.9365C6.17164 8.573 6.40397 8.95686 6.95653 9.16984C7.34334 9.31899 8.05659 9.42876 8.44113 9.40674C8.82566 9.38471 10.3126 9.0538 10.9743 8.57613C12.0122 7.82687 12.3685 7.11986 12.4443 6.86323Z"
              fill="white"
            />
            <path
              d="M10.9382 10.282C11.0441 10.1264 11.2977 9.80438 10.9372 9.59935C10.4866 9.34307 9.76764 8.93361 9.14952 8.74343C8.43479 8.52352 7.56222 8.41975 6.84449 8.48127C6.12677 8.54278 4.96018 8.9603 4.64624 9.80487C4.39509 10.4805 4.461 10.9479 4.89392 11.3163C5.19697 11.5744 5.82095 11.8747 6.18939 11.9504C6.55784 12.0261 8.07956 12.058 8.88707 11.7215C10.1537 11.1936 10.7661 10.5349 10.9382 10.282Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_98_31101"
              x="0.5"
              y="0"
              width="16"
              height="20"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_98_31101"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_98_31101"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};
