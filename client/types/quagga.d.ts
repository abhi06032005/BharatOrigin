declare module 'quagga' {
  export interface QuaggaJSResultObject {
    codeResult: {
      code: string;
      format: string;
      angle: number;
      confidence: number;
    };
  }

  export interface QuaggaJSConfigObject {
    inputStream?: {
      name?: string;
      type: string;
      target: HTMLElement;
      constraints?: {
        facingMode?: string;
        [key: string]: any;
      };
    };
    decoder?: {
      readers: string[];
      [key: string]: any;
    };
    [key: string]: any;
  }

  const Quagga: {
    init(config: QuaggaJSConfigObject, callback: (err: Error | null) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (data: QuaggaJSResultObject) => void): void;
    offDetected(callback: (data: QuaggaJSResultObject) => void): void;
  };

  export default Quagga;
  export { QuaggaJSResultObject };
}
