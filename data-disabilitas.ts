export type Position = {
  lat: number;
  lng: number;
}

export type MarkerType = {
  id: number;
  name: string;
  nik: number;
  gender: string;
  birthdate: string;
  address: string;
  position: Position;
  disabilities: string;
}

export const markers: MarkerType[] = [
  {
    id: 1,
    name: 'Evan Luan',
    nik: 5321010611090002,
    gender: 'Pria',
    birthdate: '06/11/2009',
    address: 'RT 002 / RW 001, FATISIN A, KAMANASA, MALAKA',
    position: { lat: -9.54539, lng: 124.918948},
    disabilities: 'Intelektual'
  },
  {
    id: 2,
    name: 'Even Luan',
    nik: 5304084907040001,
    gender: 'Pria',
    birthdate: '06/11/2009',
    address: 'RT 002 / RW 001, FATISIN A, KAMANASA, MALAKA',
    position: { lat: -9.54539, lng: 124.918948},
    disabilities: 'Intelektual'
  },
  {
    id: 3,
    name: 'OLIVA DAHU',
    nik: 5304084107710031,
    gender: 'Wanita',
    birthdate: '1/7/1971',
    address: 'RT 004 / RW 001, FATISIN A, KAMANASA, MALAKA',
    position: { lat: -9.543808, lng: 124.916034},
    disabilities: 'Rungu Wicara /Tuli'
  },
  {
    id: 4,
    name: 'DOMINIKA BUI',
    nik: 5304084609400001,
    gender: 'Wanita',
    birthdate: '6/9/1940',
    address: 'RT 004 / RW 002, KAMANASA B, KAMANASA, MALAKA',
    position: { lat: -9.54467, lng: 124.914694},
    disabilities: 'Tuna Netra'
  },
  
];