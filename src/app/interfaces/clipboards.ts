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

// view clipboard
export interface ClipboardPastes {
  status:          string;
  clipboard_id:    null;
  clipboard_title: string;
  created_by:      string;
  created_on:      null;
  messages:        Message[];
}

export interface Message {
  id:           null;
  title:        string;
  created_by:   string;
  created_on:   null;
  clipboard_id: null;
  message:      null;
}
