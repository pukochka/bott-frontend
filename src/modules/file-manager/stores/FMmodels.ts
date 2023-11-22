export interface FMStore {
  usersFiles: Array<FMItem>;
  message: MessageFree | undefined;
  dialog: boolean;

  allow_size: number;
  _employed: number;

  selectedFiles: Array<FMItem>;
  selectedFile: FMItem | null;

  uploadFiles: Array<{
    result: string;
    size: number;
    id: number;
    name: string;
  }>;

  pagination: {
    page: number;
    count: number;
  };

  uploadStack: Array<number>;

  loadings: Record<keyof FMQueries | 'all', boolean>;

  search: string;

  imageViewer: boolean;

  tabs: 'all' | 'used' | 'not-used';

  drawerInfo: boolean;
  drawerFolders: boolean;
  uploadMenu: boolean;
  compress: boolean;

  imageFit: 'contain' | 'cover';

  sortable: Record<SortableNames, boolean | null>;

  file_support_extensions: Array<string>;
  file_max_size: number;
  paths: string;
}

type SortableNames = 'date' | 'size';

export const defaultFileCard: FMItem = {
  link: '',
  size: '0',
  date: '0',
  name: '',
  used: false,
};

export const defaultActionButton = {
  label: '',
  action: null,
  disable: false,
  close: false,
  sortable: null,
  icon: '',
  color: '',
};

export const extensions = {
  'accbd|adp|adn|laccdb|accdw|accdc|accda|mdb|mda|mdw|mad|accde|mdf|accdt|accdu|accdr':
    'accbd.png',
  csv: 'csv.png',
  'docx|doc|wbk|docm|dotx|dotm|docb|dot': 'docx.png',
  '7z|ace|arj|bin|bin|cab|cab|cbr|deb|exe|gz|gzip|jar|one|pak|pak|pak|pkg|pkg|pkg|pkg|ppt|rar|rpm|sh|sib|sis|sisx|sit|sitx|spl|spl|tar|tar-gz|tgz|xar|zip|zip|zipx':
    'archive.png',
  form: 'form.png',
  one: 'one.png',
  pdf: 'pdf.png',
  'pptx|ppt|ppsx|pps|pot|potx|ppsm|potm|ppam|pa': 'pptx.png',
  pub: 'pub.png',
  spo: 'spo.png',
  sway: 'sway.png',
  'txt|odt|rtf|html|htm|js|css': 'txt.png',
  'vssx|vsdx|vssm|vssx|vsdm': 'vssx.png',
  'vstx|vstm': 'vstx.png',
  'xlsx|xls|xlt|xlsm|xll|xll_|xla5|xla8|xla_|xlam|xlw': 'xlsx.png',
  'xltx|xltm': 'xltx.png',
  xsn: 'xsn.png',
  'aac|ac3|aif|aiff|amr|aob|ape|asf|aud|aud|aud|aud|awb|bin|bwg|cdr|flac|gpx|ics|iff|m|m3u|m3u8|m4a|m4b|m4p|m4r|mid|midi|mod|mp3|mp3|mp3|mpa|mpp|msc|msv|mts|nkc|ogg|ps|ra|ram|sdf|sib|sln|spl|srt|srt|temp|vb|wav|wav|wave|wm|wma|wpd|xsb|xwb':
    'audio.png',
  '3g2|3gp|3gp2|3gpp|3gpp2|asf|asx|avi|bin|dat|drv|f4v|flv|gtp|h264|m4v|mkv|mod|moov|mov|mp4|mpeg|mpg|mts|rm|rmvb|spl|srt|stl|swf|ts|vcd|vid|vid|vid|vob|webm|wm|wmv|yuv':
    'video.png',
};
