import { Box } from '@mui/material';
import { TabInfo } from '../components/TabInfo/TabInfo';
import { Status } from '../components/ui/Status/Status';
import { ClickerCard } from '../components/ClickerCard/ClickerCard';
import { Energy } from '../components/Energy/Energy';
import {
  MAX_ENERGY,
  REWARD_COEFFICIENT,
  bgImgByLevel,
  costToLevelUp,
} from '../core/configs/constants';
import { useOutletContext } from 'react-router-dom';
import { IStateContextType } from '../core/types';
import { useEffect, useState } from 'react';
import { BoostPopup } from '../components/BoostPopup/BoostPopup';
import { CharPopup } from '../components/CharPopup/CharPopup';
import { Modal } from '../components/Modal/Modal';
import { useContext } from 'react';
import { AuthContext } from '../core/context/AuthContext';
import { LevelUpPopup } from '../components/LevelUpPopup/LevelUpPopup';
import { generateRandomNumber } from '../core/utils/generateRundomNumber';
import { ConfirmBoostPopup } from '../components/ConfirmBoostPopup/ConfirmBoostPopup';
import { ConfirmInvitePopup } from '../components/ConfirmInvitePopup/ConfirmInvitePopup';
import { PassiveIncomePopup } from '../components/PassiveIncomePopup/PassiveIncomePopup';
import { getPassiveIncome } from '../core/services/user.service';
import { useTranslation } from 'react-i18next';

export const MainPage = () => {
  const {
    displayBalance,
    setDisplayBalance,
    displayEnergy,
    setDisplayEnergy,
    level,
    setLevel,
    profitPerHour,
    turbo,
    turboTap,
    setTurboTap,
    handleTurboMode,
    passiveIncome,
    setPassiveIncome,
    isShowPassiveRewardPopup,
    setIsShowPassiveRewardPopup,
  } = useOutletContext<IStateContextType>();
  const { t } = useTranslation();

  const [isShowBoostPopup, setIsShowBoostPopup] = useState(false);
  const [isShowLevelUpPopup, setIsShowLevelUpPopup] = useState(false);
  const [isShowClaimTurboBoostPopup, setIsShowClaimTurboBoostPopup] =
    useState(false);
  const [isShowClaimEnergyBoostPopup, setIsShowClaimEnergyBoostPopup] =
    useState(false);
  const [isShowCharPopup, setIsShowCharPopup] = useState(false);
  const [isShowInviteCompletePopup, setIsShowInviteCompletePopup] =
    useState(false);

  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { socket, user } = authContext;
  const amountToUpgrade = costToLevelUp[level + 1] - displayBalance;
  const rewardPerTap = level * REWARD_COEFFICIENT;
  const turboRewardPerTap = rewardPerTap * turboTap;
  const telegramId = user?.telegramId;
  const [referral, setReferral] = useState<string>('');
  const [reward, setReward] = useState<number>(0);

  const handleShowClaimTurboBoostPopup = () => {
    setIsShowBoostPopup(!isShowBoostPopup);
    setIsShowClaimTurboBoostPopup(true);
  };

  const handleShowClaimEnergyBoostPopup = () => {
    setIsShowBoostPopup(!isShowBoostPopup);
    setIsShowClaimEnergyBoostPopup(true);
  };

  const handleFullEnergy = () => {
    setDisplayEnergy(MAX_ENERGY);
  };

  const getIncome = async () => {
    if (!telegramId) return;
    try {
      const { data } = await getPassiveIncome(telegramId);
      setDisplayBalance(data.balance);
      setPassiveIncome(0);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleGetPassiveIncome = () => {
    getIncome();
    setIsShowPassiveRewardPopup(false);
  };

  useEffect(() => {
    if (turbo) {
      const newTurboTap = generateRandomNumber(2, 100);
      setTurboTap(newTurboTap);
    } else setTurboTap(1);
  }, [turbo]);

  socket.on('connect', () => {
    socket.emit('getEnergyLevel', { telegramId });
    socket.emit('getProfit', { telegramId });
  });

  socket.on('balanceUpdated', (balance, energy) => {
    setDisplayEnergy(energy);
    setDisplayBalance(balance);
  });

  socket.on('levelUp', (level) => {
    setIsShowLevelUpPopup(true);
    setLevel(level);
  });

  socket.on('inviteComplete', (referralReward, referralName) => {
    setReward(referralReward);
    setReferral(referralName);
    setIsShowInviteCompletePopup(true);
  });

  socket.on('restoredEnergy', (energy) => {
    setDisplayEnergy(energy);
  });

  socket.on('passiveIncome', (balance) => {
    setDisplayBalance(balance);
  });

  const tap = () => {
    socket.emit('increaseBalance', { telegramId, turboTap });
  };

  return (
    <Box
      sx={{
        height: '100%',
        background: `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.3) 20%, rgba(255,255,255,0) 50%, rgba(50,50,50,0.3) 80%, rgba(0,0,0,0.8) 100%), url(${bgImgByLevel[level]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        padding: '16px',
        gap: '16px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TabInfo
          turbo={turbo}
          rewardPerClick={rewardPerTap}
          turboTap={turboTap}
          profitPerHour={profitPerHour}
          level={level}
          amountToUpgrade={amountToUpgrade}
        />
        <Status
          balance={displayBalance}
          level={level}
          setIsShowCharPopup={setIsShowCharPopup}
        />
      </Box>
      <ClickerCard
        tap={tap}
        energy={displayEnergy}
        rewardPerClick={turboRewardPerTap}
        energyPerClick={rewardPerTap}
        level={level}
        turbo={turbo}
      />
      <Energy
        energy={displayEnergy}
        setIsShowBoostPopup={setIsShowBoostPopup}
        turbo={turbo}
      />
      {isShowCharPopup && (
        <Modal closeFunc={setIsShowCharPopup}>
          <CharPopup closeFunc={setIsShowCharPopup} level={level} />
        </Modal>
      )}
      {isShowLevelUpPopup && (
        <Modal closeFunc={setIsShowLevelUpPopup}>
          <LevelUpPopup closeFunc={setIsShowLevelUpPopup} level={level} />
        </Modal>
      )}
      {isShowInviteCompletePopup && (
        <Modal closeFunc={setIsShowInviteCompletePopup}>
          <ConfirmInvitePopup
            closeFunc={setIsShowInviteCompletePopup}
            referral={referral}
            reward={reward}
            setDisplayBalance={setDisplayBalance}
          />
        </Modal>
      )}
      {isShowPassiveRewardPopup && (
        <Modal>
          <PassiveIncomePopup
            closeFunc={setIsShowPassiveRewardPopup}
            reward={passiveIncome}
            event={handleGetPassiveIncome}
          />
        </Modal>
      )}
      {isShowBoostPopup && (
        <Modal closeFunc={setIsShowBoostPopup}>
          <BoostPopup
            level={level}
            balance={displayBalance}
            closeFunc={setIsShowBoostPopup}
            handleShowClaimTurboBoostPopup={handleShowClaimTurboBoostPopup}
            handleShowClaimEnergyBoostPopup={handleShowClaimEnergyBoostPopup}
          />
        </Modal>
      )}
      {isShowClaimTurboBoostPopup && (
        <Modal closeFunc={setIsShowClaimTurboBoostPopup}>
          <ConfirmBoostPopup
            icon="💫"
            title="Turbo"
            text={t(`modals.boost.turbo`)}
            event={handleTurboMode}
            closeFunc={setIsShowClaimTurboBoostPopup}
          />
        </Modal>
      )}
      {isShowClaimEnergyBoostPopup && (
        <Modal closeFunc={setIsShowClaimEnergyBoostPopup}>
          <ConfirmBoostPopup
            icon="⚡"
            title="Full Energy"
            text={t(`modals.boost.energy`)}
            event={handleFullEnergy}
            closeFunc={setIsShowClaimEnergyBoostPopup}
          />
        </Modal>
      )}
    </Box>
  );
};
