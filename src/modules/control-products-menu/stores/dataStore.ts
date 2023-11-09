import { defineStore } from 'pinia';
import { DataStore } from './models';
import { ref } from 'vue';

export const useDataStore = defineStore('control-products-menu', {
  state: () =>
    ({
      categories: categories.value,

      rows: rows,

      selected: [],

      selectedLayout: 1,
    } as DataStore),
  getters: {
    closestCategories: (state) => state.categories.filter((item) => item.close),
    notClosestCategories: (state) =>
      state.categories.filter((item) => !item.close),
  },
  actions: {},
});

const rows = [
  {
    name: 'sadas',
  },
];

const categories = ref([
  // {
  //   label: 'Germany',
  //   close: false,
  //   id: 'A5CD9981-3B25-F71F-ECC2-A2EBEEBAE032',
  // },
  // {
  //   label: 'Philippines',
  //   close: false,
  //   id: 'E861EC3E-C9AD-A2DC-C0D6-D5A18A267E26',
  // },
  // {
  //   label: 'Ireland',
  //   close: false,
  //   id: 'E5CEBF3A-F813-D815-49B9-AC53BF669667',
  // },
  // {
  //   label: 'Chile',
  //   close: false,
  //   id: '73B23C4B-9CCB-A090-235F-C81394ABA3ED',
  // },
  {
    label: 'Canada',
    close: false,
    id: '0099AA17-B27C-9598-EC46-17',
    products: [
      {
        id: '0C46-17AAE8B86D2A',
        amount: 12,
        price: 340,
        title: 'Пустая коробка 212312 312 123 123 124134 13 423 r32 423',
        type: 0,
      },
      {
        id: '00997-B27C-9598-EC46-17AAE8B86',
        amount: 12,
        price: 52000,
        title: 'Мокрая коробка',
        type: 1,
      },
    ],
  },
  {
    label: 'Ukraine',
    close: false,
    id: '8CD65B9D-E47D-1D12-7D89-FADC31E431CD',
    products: [
      {
        id: '-B27C-9598-EC46-17AAE8B86D2A',
        amount: 1122,
        price: 140,
        title: 'Желтая коробка',
        type: 0,
      },
    ],
  },
  {
    label: 'Ireland',
    close: false,
    id: 'F5E93F42-A3E2-3B62-773B-1BF5D8BD8545',
    products: [
      {
        id: '0099AA17-9598-EC46-17AAE8B86D2A',
        amount: 1222,
        price: 340,
        title: 'Пустая коробка',
        type: 0,
      },
      {
        id: '0099AA17-B27C-EC46-17AAE8B86',
        amount: 5,
        price: 520,
        title: 'Мокрая коробка',
        type: 2,
      },
      {
        id: '0099AA17-B27C-9598-17AAE8B86',
        amount: 6,
        price: 1020,
        title: 'Трудная коробка',
        type: 5,
      },
    ],
  },
  {
    label: 'Peru',
    close: false,
    id: '6C9BB8DE-AC8D-C9E7-1A44-',
    products: [],
  },
]);
