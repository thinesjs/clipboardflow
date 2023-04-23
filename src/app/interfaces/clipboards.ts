export interface Clipboards {
  id: number
  title: string
  created_by: string
  created_on: string
}

export interface AddClipboard {
  id: number;
  title: string;
  created_by: string;
  created_on: Date | string;
}

export interface MappedClipboard {
  attendances: Clipboards[];
}