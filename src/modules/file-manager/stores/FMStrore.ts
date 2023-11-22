import { defineStore } from 'pinia';

import { FMStore } from './FMmodels';

import 'src/utils/polifils/dimension';
import { useDialog } from './useDialog';
import { fetchFile } from '../api/queries';
import {
  compareDown,
  compareDownDate,
  compareNone,
  compareUp,
  compareUpDate,
} from './helpers';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Compress from 'compress.js';

const paths: Record<any, string> = {
  1: 'photos',
  3: 'files',
  4: 'videos',
  5: 'animations',
};

export const useFMStore = defineStore('file-manager-data', {
  state: () =>
    ({
      usersFiles: [],
      uploadFiles: [],
      message: undefined,
      dialog: false,

      selectedFiles: [],
      selectedFile: null,

      allow_size: 157286400,
      _employed: 0,

      loadings: {
        assign: false,
        index: false,
        'main/delete': false,
        'main/upload': false,
        all: false,
        'delete-unused': false,
      },

      uploadStack: [],

      search: '',

      imageViewer: false,

      sortable: {
        date: null,
        size: null,
      },

      tabs: 'all',

      drawerFolders: true,
      drawerInfo: true,
      uploadMenu: false,
      imageFit: 'cover',
      compress: true,

      pagination: {
        page: 1,
        count: 15,
      },

      file_support_extensions: [],
      file_max_size: 0,
      paths: 'photos',
    } as FMStore),

  getters: {
    uploadCount: (state) => state.uploadFiles?.length ?? 0,
    loadCount: (state) => state.usersFiles?.length ?? 0,

    filesCount: (state) => state.usersFiles?.length ?? 0,

    query: (state) => paths[state.message?.type?.id ?? 1],

    files: (state) =>
      state.usersFiles
        .reverse()
        .filter((file) =>
          state.tabs === 'all'
            ? file
            : state.tabs === 'used'
            ? file.used
            : !file.used
        )
        .filter((file) =>
          file.name
            .toLowerCase()
            .trim()
            .includes(state.search.toLowerCase().trim())
        )
        .sort(
          state.sortable.size === null
            ? compareNone
            : state.sortable.size
            ? compareUp.apply('size')
            : compareDown.apply('size')
        )
        .sort(
          state.sortable.date === null
            ? compareNone
            : state.sortable.date
            ? compareUpDate.apply('date')
            : compareDownDate.apply('date')
        ),

    uploadSize: (state) =>
      state.uploadFiles
        .map((item) => Number(item.size))
        .reduce((acc: any, cur: any) => acc + cur, 0)
        .dimension(),

    loadSize: (state) =>
      state.usersFiles
        .map((item) => Number(item.size))
        .reduce((acc: any, cur: any) => acc + cur, 0),

    allow: (state) => state.allow_size.dimension(),
    employed: (state) => state._employed.dimension(),
    extensions: (state) =>
      state.file_support_extensions.map((item) => '.' + item).join(', '),
  },

  actions: {
    selectFile(file: FMItem) {
      const condition =
        this.selectedFiles.map((item) => item.link).indexOf(file.link) !== -1;

      if (condition) {
        this.selectedFiles = this.selectedFiles.filter(
          (item) => item.link !== file.link
        );

        return;
      }

      this.selectedFiles.push(file);
    },

    async loadFiles(ev: any) {
      if (!ev?.target?.files && !ev?.dataTransfer?.files) return;

      const files: any = Array.from(
        ev?.target?.files ?? ev?.dataTransfer?.files
      );

      const sizeFiles = files
        .map((item: any) => item.size)
        .reduce((acc: number, rec: number) => acc + rec, 0);

      if (this.checkSize(sizeFiles)) return;

      this.uploadMenu = true;

      for (const file of files) {
        if (
          this.paths !== 'photos' ||
          file?.type === 'image/gif' ||
          !this.compress
        ) {
          this.notCompressFile(file);

          continue;
        }

        const alpha = await hasAlpha(file);

        if (alpha) {
          this.notCompressFile(file);

          continue;
        }

        this.compressFile(file);
      }
    },

    compressFile(file: any) {
      const compress = new Compress();
      compress.compress([file], { quality: 0.7 }).then((data: any) => {
        const [compr] = data;

        const size = compr.endSizeInMb * 10e5;

        const uploadFiles = this.uploadFiles
          .map((item) => item.size)
          .reduce((acc, rec) => acc + rec, 0);

        if (this.checkSize(uploadFiles + size)) return;

        this.addUpload(compr.prefix + compr.data, size, compr.alt);
      });
    },
    notCompressFile(file: any) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        if (!e.target) return;

        const uploadFiles = this.uploadFiles
          .map((item) => item.size)
          .reduce((acc, rec) => acc + rec, 0);

        if (this.checkSize(uploadFiles + e.loaded)) return;

        this.addUpload(<string>e.target.result, e.loaded, file.name);
      };
    },
    addUpload(result: string, size: number, name: string) {
      const uploaded = {
        result: result,
        size: size,
        name: name,
        id: Date.now(),
      };

      this.uploadFiles.push(uploaded);
    },
    deleteUpload(id: number) {
      this.uploadFiles = this.uploadFiles.filter((item) => item.id !== id);

      if (!this.uploadFiles.length) {
        this.uploadMenu = false;
      }
    },
    selectAll() {
      this.drawerInfo = true;

      if (this.selectedFiles.length === this.usersFiles.length) {
        this.selectedFiles = [];
      } else {
        this.selectedFiles = this.usersFiles;
      }
    },

    sort(section: 'date' | 'size') {
      if (section === 'date') this.sortable.size = null;
      if (section === 'size') this.sortable.date = null;

      this.sortable[section] =
        this.sortable[section] === false ? null : !this.sortable[section];
    },

    checkSize(size: number) {
      if (size > this.file_max_size) {
        useDialog('Превышен лимит размера загружаемых файлов!');
        return true;
      }

      return false;
    },

    deleteSelected() {
      useDialog('Вы уверены, что хотите удалить выбранные файлы?', true).onOk(
        () => {
          this.drawerInfo = true;

          this.loadings.all = true;
          this.selectedFiles.forEach((file) => {
            fetchFile(
              'main/delete',
              { file_name: file.name, path: this.paths },
              () => {
                this.usersFiles = this.usersFiles.filter(
                  (item) => item.link !== file.link
                );

                this.selectedFiles = [];
              }
            ).then(() => (this.loadings.all = false));
          });
        }
      );
    },
  },
});

async function hasAlpha(file: any) {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');

  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hasAlphaPixels = false;

  for (let i = 3, n = data.length; i < n; i += 4) {
    if (data[i] < 255) {
      hasAlphaPixels = true;
      break;
    }
  }

  return hasAlphaPixels;
}
