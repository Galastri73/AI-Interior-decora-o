
export interface ImageFile {
  file: File;
  base64: string;
}

export enum Tab {
  RoomRedesign = 'RoomRedesign',
  ImageEditor = 'ImageEditor',
}

export interface RedesignResult {
    text: string;
    image: string | null;
}
