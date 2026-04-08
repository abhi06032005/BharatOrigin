declare module '@zxing/library' {
  export class BrowserMultiFormatReader {
    constructor();
    decodeFromVideoDevice(deviceId: string | null, videoElement: HTMLVideoElement, callback: (result: any, error: any) => void): void;
    decodeFromImage(imageElement: HTMLImageElement): Promise<any>;
    getVideoInputDevices(): Promise<MediaDeviceInfo[]>;
    reset(): void;
  }

  export class NotFoundException extends Error {
    constructor(message?: string);
  }

  export class ChecksumException extends Error {
    constructor(message?: string);
  }

  export class FormatException extends Error {
    constructor(message?: string);
  }

  export class Result {
    constructor(text: string, rawBytes: Uint8Array, resultPoints: any[], format: any);
    getText(): string;
    getRawBytes(): Uint8Array;
    getResultPoints(): any[];
    getFormat(): any;
  }
}