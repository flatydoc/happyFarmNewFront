import { useTranslation } from 'react-i18next';
import { IGood } from '../types';

export const checkCondition = (good: IGood, goodsArray?: IGood[]) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const condition = good.condition;

  if (!condition) return { status: true, text: '' };
  const foundGood = goodsArray?.find((item) => item.id === condition.id);
  if (foundGood && foundGood.level >= condition.level) {
    return { status: true, text: '' };
  } else
    return {
      status: false,
      text:
        currentLanguage === 'ru'
          ? `Необходим ${condition.level} уровень "${t(
              `shop.item names.${foundGood?.id}`
            )}"`
          : `Need level ${condition.level} of "${t(
              `shop.item names.${foundGood?.id}`
            )}"`,
    };
};
