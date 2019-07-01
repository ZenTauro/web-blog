export interface IImage {
  childImageSharp: IChildImageSharp;
}

export interface IChildImageSharp {
  fixed: IBase64;
  fluid: IBase64;
}

export interface IBase64 {
  base64: string;
}
