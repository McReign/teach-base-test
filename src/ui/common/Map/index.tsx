import React from 'react';
import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps';
import { Language } from '@/domain/language/types/Language';
import { useLanguageStoreService } from '@/services/store/LanguageStoreService';

export interface MapProps {
  className?: string;
  point?: [number, number];
  zoom?: number;
}

type YMapLanguage = 'tr_TR' | 'en_US' | 'en_RU' | 'ru_RU' | 'ru_UA' | 'uk_UA';

const languageMapper: Record<Language, YMapLanguage> = {
  eng: 'en_US',
};

export function Map(props: MapProps) {
  const { className, point, zoom = 14 } = props;
  const languageStoreService = useLanguageStoreService();

  const language = languageStoreService.getLanguage();

  return (
    <YMaps query={{ lang: languageMapper[language] }}>
      <YMap className={className} defaultState={{ center: point, zoom }}>
        <Placemark defaultGeometry={point} />
      </YMap>
    </YMaps>
  );
}
